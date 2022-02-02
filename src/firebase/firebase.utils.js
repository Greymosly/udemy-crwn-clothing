import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCCkHZN-oRHrDTTtJU1uw_hPG_MDEBNqQ8",
  authDomain: "udemy-crwn-db-5c810.firebaseapp.com",
  projectId: "udemy-crwn-db-5c810",
  storageBucket: "udemy-crwn-db-5c810.appspot.com",
  messagingSenderId: "634320200059",
  appId: "1:634320200059:web:27d1f7f5c8508cda4c1dde",
  measurementId: "G-X0LP5F49LB",
};

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
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
