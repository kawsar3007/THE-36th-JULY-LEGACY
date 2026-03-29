// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// আপনার অরিজিনাল Firebase কনফিগ
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
const db = getFirestore(app);

// --- Stats Real-time Sync Function ---
export function listenToStats(callback) {
    onSnapshot(doc(db, "system", "global_stats"), (docSnapshot) => {
        if (docSnapshot.exists()) {
            callback(docSnapshot.data());
        }
    });
}

// --- Submit Donation Function ---
export async function saveDonation(name, qty) {
    return await addDoc(collection(db, "payment_requests"), {
        donorName: name,
        quantity: parseInt(qty),
        status: "pending",
        timestamp: serverTimestamp()
    });
}
