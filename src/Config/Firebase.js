import firebase from 'firebase'
require('firebase/firestore')
const config = {
    apiKey: "AIzaSyAzdFGIgTpRc3t9XWHiVFmx3ISEKDEFUeM",
    authDomain: "test-project-ling-2.firebaseapp.com",
    databaseURL: "https://test-project-ling-2.firebaseio.com",
    projectId: "test-project-ling-2",
    storageBucket: "test-project-ling-2.appspot.com",
    messagingSenderId: "29868164974"
};
firebase.initializeApp(config);
export const ref = firebase.database().ref()
export const db = firebase.firestore();
export const settings = {/* your settings... */ timestampsInSnapshots: true };
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const provider2 = new firebase.auth.GoogleAuthProvider();
db.settings(settings);
export default firebase;