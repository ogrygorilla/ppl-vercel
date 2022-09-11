import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// import firebaseConfig  from "./firebaseConfig";

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSENGER_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`,
  measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`,
};

console.log("firebase config: ", firebaseConfig, process);
/**
 * Do not check into source control
 * Should be in a .env file?
 */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//why 2 auth variables?
export const auth = firebase.auth();
export const auth2 = getAuth();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function promiseToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
