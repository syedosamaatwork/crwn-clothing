// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDH8SECgbVG8QKa2tbmxW7oOvY6OTa5DOQ",
    authDomain: "crwn-clothing-db-c5cf1.firebaseapp.com",
    projectId: "crwn-clothing-db-c5cf1",
    storageBucket: "crwn-clothing-db-c5cf1.appspot.com",
    messagingSenderId: "94776426282",
    appId: "1:94776426282:web:f2b32f131ff0e2f1cc2853"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log("userDocRef", userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log("snapshot", userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
}