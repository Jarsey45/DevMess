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
const firebaseConfig = {
  apiKey: "AIzaSyCuR7nDg8YbiFwRStwgjkvaxZdjjcS9dBU",
  authDomain: "react-native-messengerdev.firebaseapp.com",
  projectId: "react-native-messengerdev",
  storageBucket: "react-native-messengerdev.appspot.com",
  messagingSenderId: "935130835466",
  appId: "1:935130835466:web:f2e94b3186662bc8784df3",
  measurementId: "G-QQ0QW95KET"
};


firebase.initializeApp(firebaseConfig);



export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const LoginUser = async (user: UserData, additionalData: {}) => {
  if (!user) return false;

  const { mail, password } = user;

  auth.signInWithEmailAndPassword(mail, password)
    .then((userCredential) => {
      const user = userCredential;
      //TODO: Forward to userUI
      return true;
    })
    .catch((error) => {
      let { code, message } = error;
      console.log(code, '=>', message);
      return false;
    });

  return false;
}

export const RegisterUser = async (user: UserData, additionalData: {}) => {
  if (!user) return false;

  const { mail, password, username } = user;


  auth.createUserWithEmailAndPassword(mail, password)
    .then((userCredential) => {
      const { user } = userCredential;

      //adding new doc to firebase db
      let docData = {
        last_logged: firebase.firestore.Timestamp.fromDate(new Date()),
        mail,
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