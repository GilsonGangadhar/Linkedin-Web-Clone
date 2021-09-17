import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBbXeu3YSAciCcBZyeRKXyRqfaV9UUlqZM",
    authDomain: "linked-in-clone-39954.firebaseapp.com",
    projectId: "linked-in-clone-39954",
    storageBucket: "linked-in-clone-39954.appspot.com",
    messagingSenderId: "167892447388",
    appId: "1:167892447388:web:a29924a9c151d922bdfd59"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()
  const storage = firebase.storage()

  export {auth, provider, storage};
  export default db;