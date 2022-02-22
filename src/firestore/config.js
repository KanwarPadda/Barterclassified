import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDZNIREaPQy7sYAMK2iFGtwC6pBUhuUb8Y",
    authDomain: "barterclassified.firebaseapp.com",
    projectId: "barterclassified",
    storageBucket: "barterclassified.appspot.com",
    messagingSenderId: "921263841839",
    appId: "1:921263841839:web:a9bbc512ae9ebe8b231cda"
};

firebase.initializeApp(firebaseConfig);

export const projectFireStore = firebase.firestore();
export const projectAuth = firebase.auth();
export const projectStorage = firebase.storage();
export const timeStamp = firebase.firestore.Timestamp;


