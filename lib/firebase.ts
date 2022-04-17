import firebase from 'firebase/compat/app'
import {getAuth} from 'firebase/auth'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

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