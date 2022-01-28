import { initializeApp } from "firebase/app";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCBf6NRRadgnD_bwOmMS-xoKlnyD4b40bI",
    authDomain: "todo-b0fb7.firebaseapp.com",
    databaseURL: "https://todo-b0fb7-default-rtdb.firebaseio.com",
    projectId: "todo-b0fb7",
    storageBucket: "todo-b0fb7.appspot.com",
    messagingSenderId: "496631331677",
    appId: "1:496631331677:web:0b674ff00037dc0634c6b4"  

  })

  const db = firebaseApp.firestore();
//   const auth = firebase.auth();
export default db;