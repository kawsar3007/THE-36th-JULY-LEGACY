// ১. কনফিগারেশন সেটআপ (২৪০০ প্লট অনুযায়ী)
const totalPlots = 2400;
const cols = 60;   // ৬০টি কলাম
const bS = 50;     // আপনার চাহিদা অনুযায়ী ৫০x৫০ পিক্সেল ব্লক সাইজ
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const marker = document.getElementById('plotMarker');
const wrapper = document.getElementById('cWrapper');

// ক্যানভাস সাইজ নির্ধারণ (৬০ কলাম * ৫০ পিক্সেল = ৩০০০px প্রস্থ)
// (২৪০০ প্লট / ৬০ কলাম = ৪০টি সারি। ৪০ সারি * ৫০ পিক্সেল = ২০০০px উচ্চতা)
canvas.width = cols * bS; 
canvas.height = Math.ceil(totalPlots / cols) * bS; 

// ২. সোল্ড প্লট ডাটাবেজ (ভবিষ্যতে এখানে আইডি ও লোগো যোগ করবেন)
const soldPlots = {}; 

// ৩. ম্যাপ গ্রিড ড্রয়িং ফাংশন
function drawMap() {
    // ক্যানভাস পরিষ্কার করে সাদা ব্যাকগ্রাউন্ড দেওয়া
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let soldCount = 0;

    for (let i = 1; i <= totalPlots; i++) {
        const r = Math.floor((i - 1) / cols);
        const c = (i - 1) % cols;
        const x = c * bS;
        const y = r * bS;

        if (soldPlots[i]) {
            // যদি প্লটটি বিক্রি হয়ে থাকে
            const img = new Image();
            img.src = soldPlots[i].logo;
            ctx.drawImage(img, x, y, bS, bS);
            soldCount++;
        } else {
            // খালি প্লট ড্রয়িং
            ctx.strokeStyle = "#dddddd"; // হালকা ধূসর বর্ডার
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, bS, bS);
            
            // প্লট নাম্বার (খুব ছোট করে)
            ctx.fillStyle = "#bbbbbb";
            ctx.font = "10px Arial";
            ctx.textAlign = "center";
            ctx.fillText(i, x + bS/2, y + bS/2 + 4);
        }
    }

    // স্ট্যাটাস বার আপডেট করা
    if(document.getElementById('soldCount')) document.getElementById('soldCount').innerText = soldCount;
    if(document.getElementById('availCount')) document.getElementById('availCount').innerText = totalPlots - soldCount;
}

// ৪. সার্চ এবং হাইলাইট লজিক (স্মার্ট ফোকাস সহ)
window.findAndMarkPlot = function(id) {
    const plotID = parseInt(id);

    // ভ্যালিডেশন
    if (isNaN(plotID) || plotID < 1 || plotID > totalPlots) {
        alert("Please enter ID between 1 to " + totalPlots);
        return;
    }

    // পজিশন ক্যালকুলেশন
    const r = Math.floor((plotID - 1) / cols);
    const c = (plotID - 1) % cols;
    const x = c * bS;
    const y = r * bS;

    // ৫. মার্কার পজিশন সেট করা (৫০x৫০ সাইজ অনুযায়ী)
    if (marker) {
        marker.style.display = 'block';
        marker.style.width = bS + "px";
        marker.style.height = bS + "px";
        
        // ক্যানভাস যদি রেসপন্সিভ হয় তার জন্য পজিশন পার্সেন্টেজে রূপান্তর
        const leftPercent = (x / canvas.width) * 100;
        const topPercent = (y / canvas.height) * 100;
        
        marker.style.left = leftPercent + "%";
        marker.style.top = topPercent + "%";
    }

    // ৬. অটোমেটিক স্ক্রল লজিক (ইউজারকে প্লটের কাছে নিয়ে যাবে)
    if (wrapper) {
        // ম্যাপের বর্তমান প্রদর্শিত সাইজ অনুযায়ী স্ক্রল রেশিও বের করা
        const ratio = wrapper.offsetWidth / canvas.width;
        const scrollTargetX = (x * ratio) - (wrapper.offsetWidth / 2) + (bS * ratio / 2);
        const scrollTargetY = (y * ratio) - (wrapper.offsetHeight / 2) + (bS * ratio / 2);

        wrapper.scrollTo({
            left: scrollTargetX,
            top: scrollTargetY,
            behavior: 'smooth'
        });
    }
};

// ম্যাপ লোড করা
window.onload = drawMap;
