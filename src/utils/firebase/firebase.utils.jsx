import {initializeApp} from 'firebase/app';
import {getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
        } from 'firebase/firestore'

// royal-bazar web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyVNY4SBta9ec7IUTBkuAp3FXF0KZMUZ4",
    authDomain: "royal-bazar-4cda1.firebaseapp.com",
    projectId: "royal-bazar-4cda1",
    storageBucket: "royal-bazar-4cda1.appspot.com",
    messagingSenderId: "1083508214380",
    appId: "1:1083508214380:web:7f6c6f9d703e049d4ca649"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = async () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth)return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const  {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch(error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password)return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password)return;

    return await signInWithEmailAndPassword(auth, email, password);
};