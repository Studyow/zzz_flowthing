import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCXp_bycETJ03TDxJyk66uP00NwnQTDxAo",
    authDomain: "jet-ee43d.firebaseapp.com",
    projectId: "jet-ee43d",
    storageBucket: "jet-ee43d.appspot.com",
    messagingSenderId: "1047255680283",
    appId: "1:1047255680283:web:133d797d51b833c958ffbe",
    measurementId: "G-KRXPR61E6D"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({ timestampInSnapshots: true })
//   firebase.analytics();


//   export firestore database
export default firebaseApp.firestore()