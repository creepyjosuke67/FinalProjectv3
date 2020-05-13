import Firebase from 'firebase';
let config= {
    apiKey: "AIzaSyA0bQP3msSBfZhoqrWw__-gf_l3NqM7OdI",
    authDomain: "albumsaver-2ba3c.firebaseapp.com",
    databaseURL: "https://albumsaver-2ba3c.firebaseio.com",
    projectId: "albumsaver-2ba3c",
    storageBucket: "albumsaver-2ba3c.appspot.com",
    messagingSenderId: "651102889609",
    appId: "1:651102889609:web:b2b1d8396d433d9c6f4858",
    measurementId: "G-EDH6FCL48B"
};
let app = Firebase.initializeApp(config);
export const db = app.database();
export default app;