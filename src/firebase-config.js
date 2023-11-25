import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC_sHB70ZHuclIp058fdJm6mE5JnkSzXD0",
    authDomain: "image-storage-1dbb2.firebaseapp.com",
    projectId: "image-storage-1dbb2",
    storageBucket: "image-storage-1dbb2.appspot.com",
    messagingSenderId: "220091825699",
    appId: "1:220091825699:web:89e6acc54d5900f79e3b96",
    measurementId: "G-ESPRQ6ZZV2",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

export default app;
