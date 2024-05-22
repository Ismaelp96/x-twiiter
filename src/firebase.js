// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'x-next-423918.firebaseapp.com',
  projectId: 'x-next-423918',
  storageBucket: 'x-next-423918.appspot.com',
  messagingSenderId: '140818345058',
  appId: '1:140818345058:web:d219e38e263c445719b53b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
