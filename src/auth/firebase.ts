import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// User registration
const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// User sign-in
const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// User sign-out
const logoutUser = () => {
    return signOut(auth);
};

// Auth state change
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log('User:', user);
    } else {
        // User is signed out
        console.log('No user is signed in.');
    }
});

// Send Email Verification
const sendVerificationEmail = (user) => {
    return sendEmailVerification(user);
};

// Check if user is verified
const isUserVerified = (user) => {
    return user.emailVerified;
};

export {
    registerUser,
    loginUser,
    logoutUser,
    sendVerificationEmail,
    isUserVerified
};