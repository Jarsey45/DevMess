// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { MessageInterface, UserData } from '../types/interfaces';



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
            token: userToken,
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

export const getUserData = async () => {
  if (auth.currentUser !== null) {
    const { uid } = auth.currentUser;
    //getting user Username
    const userDoc = await firestore.collection('users').doc(uid).get();
    const userDbData = userDoc.data();

    //getting User token
    const userToken = await auth.currentUser?.getIdToken();

    //changing user LastLogin Date
    firestore.collection('users').doc(uid).set({
      last_logged: firebase.firestore.Timestamp.fromDate(new Date()),
      status: true
    }, { merge: true })

    return {
      username: userDbData?.username,
      id: uid,
      token: userToken,
      status: true
    }
  }
  return {
    username: "",
    id: "",
    token: "",
    status: false
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
      const docData = {
        last_logged: firebase.firestore.Timestamp.fromDate(new Date()),
        email: mail,
        status: true,
        username
      };

      firestore.collection('users').doc(user?.uid).set(docData)
        .then(() => {
          console.log('added user')

          const promises: Array<Promise<void>> = [];

          //adding friends collection with test user, bcs no one should be sad to have no friends 
          promises.push(
            firestore.collection('users').doc(user?.uid).collection('friends').doc('nv8fD0il4HbOfS39dgfPIpzI64E2').set({ name: 'Test', uid: 'nv8fD0il4HbOfS39dgfPIpzI64E2' })
          );

          promises.push(
            firestore.collection('users').doc(user?.uid).collection('teams').doc('TestGroupID').set(
              {
                name: 'TestGroup',
                tid: 'TestGroupID'
              }
            )
          );

          Promise.all(promises).then(() => console.log('added collections'));
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

export const getFriendsAndGroup = async () => {
  if (auth.currentUser !== null) { // checking if user is logged 
    const { uid } = auth.currentUser;

    try {

      //setting user Friends and Teams list to redux store
      const userFriends = await firestore.collection('users').doc(uid).collection('friends').get();
      const friends = userFriends.docs.map(doc => doc.data());

      const userTeams = await firestore.collection('users').doc(uid).collection('teams').get();
      const teams = userTeams.docs.map(doc => doc.data());


      return { teams: (teams ?? []), friends: (friends ?? []) };


    }
    catch (err) { console.log("Something went wrong", "=>", err) }
  }
  return { teams: [], friends: [] };
}

export const getLatestMessages = async (chatId: string, timestamp: Date, type: ('friend' | 'team')) => {
  if (auth.currentUser !== null) {
    const { uid } = auth.currentUser;

    try {

      //requests 10 messages before given timestamp
      const response = await firestore.collection('users').doc(uid).collection(type === 'friend' ? 'friends' : 'teams').doc(chatId).collection('messages').where("timestamp", "<", timestamp).orderBy("timestamp", "desc").limit(10).get();
      const messages = response.docs.map(doc => { let data = doc.data(); data._messageId = doc.id; return data });

      //console.log(messages);

      return messages.reverse();

    } catch (err: any) {
      console.error(err);
    }
  }
  return [];
}

export const unsubscribeToDb = (chatId: string, type: ('friend' | 'team'), callback: Function) => {
  if (auth.currentUser !== null) {
    const { uid } = auth.currentUser;

    const sub = firestore.collection('users').doc(uid).collection(type === 'friend' ? 'friends' : 'teams').doc(chatId).collection('messages').onSnapshot(async () => {
      //todo do it better
      const response = await firestore.collection('users').doc(uid).collection(type === 'friend' ? 'friends' : 'teams').doc(chatId).collection('messages').orderBy("timestamp", "desc").limit(1).get();

      const newMessage = response.docs.map(doc => { let data = doc.data(); data._messageId = doc.id; return data; });
      const mess = newMessage[0];

      if (mess !== null && mess.timestamp !== null)
        callback({
          _name: mess.username,
          content: mess.content,
          deleted: mess.deleted,
          timestamp: (new Date(mess.timestamp.seconds * 1000)).toJSON(),
          _uid: mess.uid,
          _messageId: mess._messageId
        } as MessageInterface)
    });

    return sub;
  }
  return () => {
    //cleanup
  };
}

export const sendNewMessageToDb = async (content: string, chatId: string, uid: string, type: ('friend' | 'team'), username: string) => {
  if (auth.currentUser !== null) {
    switch (type) {
      case "friend":
        const chatRef = firestore.collection('users').doc(uid).collection('friends').doc(chatId).collection('messages').doc();
        const chatRecRef = firestore.collection('users').doc(chatId).collection('friends').doc(uid).collection('messages').doc();

        const messageData = {
          content,
          deleted: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          username
        }

        //TODO send data to recipient also xd

        await chatRef.set(messageData);
        await chatRecRef.set(messageData);

        return { isSend: true, sentContent: content, timestamp: messageData.timestamp }

      case "team":
        return { isSend: false, sentContent: null };

      default:
        return { isSend: false, sentContent: null };
    }
  }
  return { isSend: false, sentContent: null };
}

