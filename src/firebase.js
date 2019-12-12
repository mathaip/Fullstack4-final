import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDskhzGa0TSCnaWr9ocD-udaerKP_ZYZyo",
    authDomain: "voting-218a4.firebaseapp.com",
    databaseURL: "https://voting-218a4.firebaseio.com",
    projectId: "voting-218a4",
    storageBucket: "voting-218a4.appspot.com",
    messagingSenderId: "1076833867692",
    appId: "1:1076833867692:web:2b66f4496895eb183f4c09"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;