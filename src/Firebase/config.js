import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase configuration object containing keys and identifiers
const firebaseConfig = {
    apiKey: "AIzaSyDd5Jl03SPqcKOLn02FxvAIiMh1UULRoic",
    authDomain: "chat-room-3800a.firebaseapp.com",
    projectId: "chat-room-3800a",
    storageBucket: "chat-room-3800a.appspot.com",
    messagingSenderId: "152355851508",
    appId: "1:152355851508:web:4fb1fcc950fc8a252b22a1",
    measurementId: "G-Z0MXCYN4XB"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

if (window.location.hostname === 'localhost') {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFirestoreEmulator(db, '127.0.0.1', 8081);

}

export { auth, db };

export default app;