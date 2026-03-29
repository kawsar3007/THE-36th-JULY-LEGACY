// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const db = getDatabase(app);

// --- স্ট্যাটাস শো করার ফাংশন (Real-time) ---
export function listenToStats(callback) {
    const statsRef = ref(db, 'system/global_stats');
    onValue(statsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            callback(data);
        }
    });
}

// --- ডোনেশন ডাটা সেভ করার ফাংশন ---
export async function saveDonationRequest(name, qty) {
    try {
        const requestListRef = ref(db, 'payment_requests');
        const newRequestRef = push(requestListRef);
        await set(newRequestRef, {
            donorName: name,
            quantity: parseInt(qty),
            status: "pending",
            timestamp: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: error.message };
    }
}
