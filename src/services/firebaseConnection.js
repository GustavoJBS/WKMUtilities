import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/database';


let firebaseConfig = {
  apiKey: "AIzaSyCcRUNqg5nqo8tM2Qubo2CJU8gdIIT0RPc",
  authDomain: "wkmutility.firebaseapp.com",
  databaseURL: "https://wkmutility-default-rtdb.firebaseio.com",
  projectId: "wkmutility",
  storageBucket: "wkmutility.appspot.com",
  messagingSenderId: "842588541144",
  appId: "1:842588541144:web:df7459a39ab878d4a647ad",
  measurementId: "G-R248GM7FZW"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
