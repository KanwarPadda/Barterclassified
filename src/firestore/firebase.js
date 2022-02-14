import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAVKMeCl1NN_rcYdWDK1fl8wmmD8IYscTc",
    authDomain: "thebarterclassifed.firebaseapp.com",
    projectId: "thebarterclassifed",
    storageBucket: "thebarterclassifed.appspot.com",
    messagingSenderId: "293894363186",
    appId: "1:293894363186:web:b41dcf71efadeadc0e842b",
    measurementId: "G-QHT1PGQ9WG"
};

firebase.initializeApp(firebaseConfig)
firebase.firestore()
export default firebase;