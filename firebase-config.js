// Firebase SDK modules ইম্পোর্ট করা হচ্ছে
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, update, onValue, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// আপনার দেওয়া ফায়ারবেস কনফিগারেশন
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

// অ্যাপ ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);

// অন্যান্য ফাইল থেকে ব্যবহারের জন্য এক্সপোর্ট করা হচ্ছে
export { db, ref, set, update, onValue, push, serverTimestamp }; 
