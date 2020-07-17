import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   apiKey: "AIzaSyDY1ILsQ4Iew_-xEl9lJc7Zbxoa_36uJ2M",
    authDomain: "shopy-1fe53.firebaseapp.com",
    databaseURL: "https://shopy-1fe53.firebaseio.com",
    projectId: "shopy-1fe53",
    storageBucket: "shopy-1fe53.appspot.com",
    messagingSenderId: "454628980885",
    appId: "1:454628980885:web:fd5bddef55a744ae11039c",
    measurementId: "G-08ZNVP8XW1"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
