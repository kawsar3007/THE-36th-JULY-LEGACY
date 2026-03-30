import { db, ref, onValue, push, set, serverTimestamp } from './firebase-config.js';

// ১. লাইভ স্ট্যাটাস আপডেট (Header Stats)
const statDonation = document.getElementById('stat-donation');
const statBought = document.getElementById('stat-bought');
const statHanded = document.getElementById('stat-handed');

onValue(ref(db, 'liveStats'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // অ্যানিমেশন সহ সংখ্যা আপডেট (Optional Counter Effect)
        animateValue(statDonation, parseInt(statDonation.innerText.replace('$', '')) || 0, data.collected, "$");
        animateValue(statBought, parseInt(statBought.innerText) || 0, data.bought, "");
        animateValue(statHanded, parseInt(statHanded.innerText) || 0, data.delivered, "");
    }
});

// ২. আর্কাইভ গ্রিড লোড করা (Legacy Archive Grid)
const gridContainer = document.getElementById('infiniteGrid');
const allocatedCountEl = document.getElementById('allocated-count');

onValue(ref(db, 'publishedPlots'), (snapshot) => {
    gridContainer.innerHTML = ""; // আগের ডেটা ক্লিয়ার করা
    const plots = snapshot.val();
    
    if (plots) {
        const plotArray = Object.values(plots);
        allocatedCountEl.innerText = plotArray.length;

        plotArray.reverse().forEach((plot) => {
            const plotElement = document.createElement('div');
            plotElement.className = 'donor-card'; // CSS এ এই ক্লাসটি ডিজাইন করা থাকবে
            plotElement.innerHTML = `
                <a href="${plot.social || '#'}" target="_blank" style="text-decoration:none; color:inherit;">
                    <div class="donor-circle">
                        <img src="${plot.image}" alt="${plot.name}" onerror="this.src='https://via.placeholder.com/150?text=ARK'">
                        <div class="donor-hover">
                            <i class="fas fa-tree"></i>
                            <span>${plot.qty} Trees</span>
                        </div>
                    </div>
                    <h4 class="donor-name">${plot.name}</h4>
                </a>
            `;
            gridContainer.appendChild(plotElement);
        });
    }
});

// ৩. ডোনেশন রিকোয়েস্ট হ্যান্ডলিং (index.html এর ড্রয়ার থেকে)
const submitBtn = document.getElementById('submitRequestBtn');
if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        const name = document.getElementById('custName').value;
        const qty = document.getElementById('treeQty').value;

        if (!name || !qty) {
            alert("Please provide your name and number of trees.");
            return;
        }

        const requestRef = push(ref(db, 'donationRequests'));
        set(requestRef, {
            name: name,
            treeQty: qty,
            timestamp: serverTimestamp(),
            status: 'pending'
        }).then(() => {
            // পেমেন্ট সেকশন দেখানো
            document.getElementById('payment-list').style.display = 'block';
            submitBtn.style.display = 'none';
            
            // কনফেটি এনিমেশন (যদি ক্যানভাস কনফেটি লাইব্রেরি থাকে)
            if(typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#00BFFF', '#FF1493', '#ffffff']
                });
            }

            // অভিনন্দন পপআপ
            const popup = document.getElementById('congrats-popup');
            document.getElementById('congrats-title').innerText = `THANK YOU, ${name.split(' ')[0].toUpperCase()}!`;
            document.getElementById('congrats-desc').innerText = `Your request for ${qty} trees has been logged into the ARK defense grid.`;
            popup.classList.add('active');
        });
    });
}

// ৪. ভ্যালু অ্যানিমেশন ফাংশন (সংখ্যা বাড়ার ইফেক্ট)
function animateValue(obj, start, end, prefix) {
    let startTimestamp = null;
    const duration = 1000;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentVal = Math.floor(progress * (end - start) + start);
        obj.innerHTML = prefix + currentVal.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
