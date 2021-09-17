import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDuMKFdvyF1YIdgikRUTw6k036Iy6_1xAs",
    authDomain: "netflix-49aaa.firebaseapp.com",
    projectId: "netflix-49aaa",
    storageBucket: "netflix-49aaa.appspot.com",
    messagingSenderId: "257601304115",
    appId: "1:257601304115:web:1ea956be142ce953e59546",
    measurementId: "G-6NZNNFT21C"
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
export default storage;