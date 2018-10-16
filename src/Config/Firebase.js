import firebase from 'firebase'
require('firebase/firestore')
const config = {
    apiKey: "AIzaSyB-fuOTdLnoniBSy0WrK-qI7E2xzMSv788",
    authDomain: "ling-task-test.firebaseapp.com",
    databaseURL: "https://ling-task-test.firebaseio.com",
    projectId: "ling-task-test",
    storageBucket: "ling-task-test.appspot.com",
    messagingSenderId: "697495590937"
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