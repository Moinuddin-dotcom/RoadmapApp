// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_apiKey,
//     authDomain: import.meta.env.VITE_authDomain,
//     projectId: import.meta.env.VITE_projectId,
//     storageBucket: import.meta.env.VITE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     appId: import.meta.env.VITE_appId,
// };

const firebaseConfig = {
    apiKey: "AIzaSyD05O95FkBSQFs9G5XCr3XN_fMl-l5hxcc",
    authDomain: "roadmap-f4e98.firebaseapp.com",
    projectId: "roadmap-f4e98",
    storageBucket: "roadmap-f4e98.firebasestorage.app",
    messagingSenderId: "314333535184",
    appId: "1:314333535184:web:39fddd09b5c652a3f9f7d5"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);