import firebase from 'firebase/compat/app'
import {getAuth} from 'firebase/auth'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { useDocumentData } from 'react-firebase-hooks/firestore';

const firebaseConfig ={
    apiKey: "AIzaSyDBScsxlr-BSh_6StoQ5mA7pomJglHyrOU",
    authDomain: "populend-backend.firebaseapp.com",
    projectId: "populend-backend",
    storageBucket: "populend-backend.appspot.com",
    messagingSenderId: "586260756742",
    appId: "1:586260756742:web:bc1052c72bf1a015d34687",
    measurementId: "G-V2D343TDGY"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const auth2 = getAuth();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();

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
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
  }
  
  /**`
   * Converts a firestore document to JSON
   * @param  {DocumentSnapshot} doc
   */
  export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data.createdAt.toMillis(),
      updatedAt: data.updatedAt.toMillis(),
    };
  }