// ১. কনফিগারেশন সেটআপ
const totalPlots = 2400;
const cols = 10;      // ১০টি কলাম (ফিক্সড লম্বা ম্যাপ)
const bS = 50;        // প্রতিটি ব্লকের সাইজ ৫০x৫০
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const marker = document.getElementById('plotMarker');
const wrapper = document.getElementById('cWrapper');

// ক্যানভাস সাইজ ক্যালকুলেশন
canvas.width = cols * bS; 
const totalRows = Math.ceil(totalPlots / cols);
canvas.height = totalRows * bS; 

// সোল্ড প্লট ডাটাবেজ
const soldPlots = {}; 

// ২. ম্যাপ ড্রয়িং ফাংশন
function drawMap() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let soldCount = 0;

    for (let i = 1; i <= totalPlots; i++) {
        const r = Math.floor((i - 1) / cols);
        const c = (i - 1) % cols;
        const x = c * bS;
        const y = r * bS;

        if (soldPlots[i]) {
            // যদি ছবি থাকে তবে ড্র হবে
            const img = new Image();
            img.crossOrigin = "anonymous"; // সিকিউরিটি চেক সাকসেস করার জন্য
            img.src = soldPlots[i].logo;
            img.onload = () => ctx.drawImage(img, x, y, bS, bS);
            soldCount++;
        } else {
            // গ্রিড ড্রয়িং
            ctx.strokeStyle = "#eeeeee";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, bS, bS);
            
            // আইডি নম্বর
            ctx.fillStyle = "#bbbbbb";
            ctx.font = "14px Arial";
            ctx.textAlign = "center";
            ctx.fillText(i, x + bS/2, y + bS/2 + 5);
        }
    }

    // কাউন্টার আপডেট
    if(document.getElementById('soldCount')) document.getElementById('soldCount').innerText = soldCount;
    if(document.getElementById('availCount')) document.getElementById('availCount').innerText = totalPlots - soldCount;
}

// ৩. সার্চ এবং হাইলাইট (নিখুঁত ক্যালকুলেশন)
window.findAndMarkPlot = function(id) {
    const plotID = parseInt(id);
    if (isNaN(plotID) || plotID < 1 || plotID > totalPlots) {
        alert("Enter ID 1-2400");
        return;
    }

    const r = Math.floor((plotID - 1) / cols);
    const c = (plotID - 1) % cols;
    
    // ক্যানভাস সাইজ অনুযায়ী পজিশন
    const x = c * bS;
    const y = r * bS;

    if (marker) {
        marker.style.display = 'block';
        // ১০ কলামের রেসপন্সিভ প্রস্থ সেট করা
        marker.style.width = (100 / cols) + "%";
        marker.style.height = marker.offsetWidth + "px";
        marker.style.left = (c * (100 / cols)) + "%";
        marker.style.top = (y / canvas.height * 100) + "%";
    }

    // স্ক্রল ফোকাস
    const containerTop = wrapper.getBoundingClientRect().top + window.pageYOffset;
    const plotTopRelative = (y / canvas.height) * wrapper.offsetHeight;
    const targetScroll = containerTop + plotTopRelative - (window.innerHeight / 2);

    window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
    });
};

// ৪. ম্যাপ ডাউনলোড (Security Check Bypass)
window.downloadMap = function() {
    try {
        const link = document.createElement('a');
        link.download = 'District_Map.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    } catch (err) {
        alert("Security check failed! Please try using a different browser or host your files on a server.");
        console.error("Canvas error:", err);
    }
};

// ম্যাপ রান করা
window.onload = drawMap;
