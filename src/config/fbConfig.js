import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyBNTt7Ez7yNGXnITOeiq0tcH6fIZT5dFMU",
  authDomain: "soulsbuild.firebaseapp.com",
  databaseURL: "https://soulsbuild.firebaseio.com",
  projectId: "soulsbuild",
  storageBucket: "gs://soulsbuild.appspot.com",
  messagingSenderId: "65829222476",
  appId: "1:65829222476:web:7206ebfa0c4e3c8f"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })
const storage = firebase.storage();

export {
    storage, firebase as default
}