// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { UserData } from '../types/interfaces';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { FIREBASE_CONFIG } from './Env'

//TODO: Add rules to firestoreDB after goin public
firebase.initializeApp(FIREBASE_CONFIG);



export const auth = firebase.auth();
export const firestore = firebase.firestore();

/**
 * Async function that tries to authenticate user
 * @param user input with data from Form Object
 * @param additionalData with some options for auth
 * @returns Promise<{}> with status and user data from firebase
 * */
export const LoginUser = async (user: UserData, additionalData?: {}) => {
  if (!user) return Promise.resolve({ status: false, data: {} });
  const { mail, password } = user;

  try {
    const { user } = await auth.signInWithEmailAndPassword(mail, password);
    if (user) {
      //getting user Username
      const userDoc = await firestore.collection('users').doc(user.uid).get();
      const userDbData = userDoc.data();
      //TODO: SET DOCUMENT DATE AND STATUS AFTER LOGIN

      //getting User token
      const userToken = await auth.currentUser?.getIdToken();

      //changing user LastLogin Date
      firestore.collection('users').doc(user.uid).set({
        last_logged: firebase.firestore.Timestamp.fromDate(new Date()),
        status: true
      }, { merge: true })

      return Promise.resolve(
        {
          status: true,
          data: {
            username: userDbData?.username,
            id: user.uid,
            token: userToken
          }
        }
      );
    }
    return Promise.resolve({ status: false, data: {} });
  } catch (e) {
    //throw new Error(e); TODO: handle throwing error without react base error handling
    console.error(`Error: ${e.code}`, '=>', e.message)
    return Promise.resolve({ status: false, data: {} });
  }
}

/**
 * Async function that tries to Register user, also creates new document with user data 
 * @param user input with data from Form Object
 * @param additionalData with some options for auth
 * @returns Promise<{}> with status and user data from firebase
 * */
export const RegisterUser = async (user: UserData, additionalData: {}) => {
  if (!user) return false;

  const { mail, password, username } = user;


  auth.createUserWithEmailAndPassword(mail, password)
    .then((userCredential) => {
      const { user } = userCredential;

      //adding new doc to firebase db
      let docData = {
        last_logged: firebase.firestore.Timestamp.fromDate(new Date()),
        email: mail,
        status: true,
        username
      };

      firestore.collection('users').doc(user?.uid).set(docData)
        .then(() => {
          console.log('added user')
        })
        .catch(err => console.log("An error occured", '=>', err))

      //TODO: Forward to userUI with messages and shit

      return true;
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(code, message)
      return false;
    });

  return false;
}