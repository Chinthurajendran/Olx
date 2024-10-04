import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAk38JDL944oprJT1fKaPjJagJxuvkh73E",
    authDomain: "olx-demo-4c46a.firebaseapp.com",
    projectId: "olx-demo-4c46a",
    storageBucket: "olx-demo-4c46a.appspot.com",
    messagingSenderId: "1052230715323",
    appId: "1:1052230715323:web:9128e82204f8c0d382a69e"
  };

export default firebase.initializeApp(firebaseConfig)