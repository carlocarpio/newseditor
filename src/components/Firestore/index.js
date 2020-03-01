import firebase from 'firebase';
const config = {
   apiKey: "AIzaSyDj6souApBzAiKTamPuiKXAIcIPgLWaij8",
    authDomain: "testeditorapp.firebaseapp.com",
    databaseURL: "https://testeditorapp.firebaseio.com",
    projectId: "testeditorapp",
    storageBucket: "testeditorapp.appspot.com",
    messagingSenderId: "780662328745",
    appId: "1:780662328745:web:211552f046dffe944148b8"
};
firebase.initializeApp(config);
export default firebase;