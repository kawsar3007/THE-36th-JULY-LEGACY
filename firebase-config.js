// Firebase SDKs ইমপোর্ট করা
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAdnfu2R82xbC7H85n_9mvQBE58X3TjbA",
  authDomain: "the-5k-elite-legacy.firebaseapp.com",
  databaseURL: "https://the-5k-elite-legacy-default-rtdb.firebaseio.com",
  projectId: "the-5k-elite-legacy",
  storageBucket: "the-5k-elite-legacy.firebasestorage.app",
  messagingSenderId: "440824313752",
  appId: "1:440824313752:web:2c93344dcfe2ba0a4c5ded",
  measurementId: "G-6KEYY60YGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// এক্সপোর্ট করা যাতে অন্য ফাইলে ব্যবহার করা যায়
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
