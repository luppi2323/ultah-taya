// Konfigurasi Utama
const TARGET_PIN = "06071996";
let currentPin = "";
let musicStarted = false;

// Teks
const textPara1 = "Selamat ulang tahun, Bu, Dekz, Kakz Taya... apa pun panggilannya, selamat ulang tahun, Athaya Modina. 🥳🎉";
const textPara2 = "Orang pertama yang kukenal di DP3A, wahahah. Karena dirimu suka UI/UX website, jadi kubuat ini. Nanti request aja kalau mau dibuatkan lagi.";
const textPara3 = "Intinya, Selamat ulang tahun. Semoga di usia yang baru ini kesehatan selalu menyertai, rezekimu makin lancar, pekerjaanmu semakin menyenangkan, jarang lembur, dan dipertemukan dengan jodoh yang smart, enak diajak ngobrol, selalu mau dengerin dirimu (karena aslinya dirimu bawel sama orang yang dirimu percaya haha), satu selera humor, hobi makan (karena dirimu suka masak), tidak patriarki, dan tentunya anak rumahan. Wakakaka.";

// Elemen DOM
const pinDisplay = document.getElementById("pin-display");
const bgMusic = document.getElementById("bg-music");
const slide1 = document.getElementById("slide-1");
const slide2 = document.getElementById("slide-2");
const slideLoading = document.getElementById("slide-loading");
const slide3 = document.getElementById("slide-3");
const slide4 = document.getElementById("slide-4");
const slide5 = document.getElementById("slide-5");
const btnNext = document.getElementById("btn-next");

// Fungsi Transisi Slide
function goToSlide(currentSlide, nextSlide) {
    currentSlide.classList.remove("active");
    nextSlide.classList.add("active");
}

function initPinDots() {
    pinDisplay.innerHTML = "";
    for (let i = 0; i < TARGET_PIN.length; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        pinDisplay.appendChild(dot);
    }
}
initPinDots();

// --- LOGIKA PIN ---
function pressKey(num) {
    if (!musicStarted) {
        bgMusic.volume = 0.6;
        bgMusic.play().catch(e => console.log("Autoplay dicegah:", e));
        musicStarted = true;
    }
    if (currentPin.length < TARGET_PIN.length) {
        currentPin += num;
        updateDots();
    }
}

function clearPin() {
    currentPin = "";
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        if (index < currentPin.length) dot.classList.add("filled");
        else dot.classList.remove("filled");
    });
}

function checkPin() {
    if (currentPin === TARGET_PIN) {
        setTimeout(() => goToSlide(slide1, slide2), 300);
    } else {
        const panel = document.querySelector("#slide-1 .glass-panel");
        panel.classList.add("shake");
        setTimeout(() => { panel.classList.remove("shake"); clearPin(); }, 500);
    }
}

// --- LOGIKA QUIZ & LOADING KADO ---
function checkQuiz(isCorrect, btnElement) {
    if (isCorrect) {
        btnElement.style.background = "linear-gradient(90deg, #dcedc8, #c5e1a5)";
        btnElement.style.borderColor = "#8bc34a";
        btnElement.style.color = "#33691e";
        
        setTimeout(() => {
            goToSlide(slide2, slideLoading);
            mulaiLoadingKado();
        }, 800);
    } else {
        btnElement.classList.add("error");
        setTimeout(() => btnElement.classList.remove("error"), 500);
    }
}

function mulaiLoadingKado() {
    const bar = document.getElementById("loading-bar");
    const gift = document.getElementById("gift-box");
    
    setTimeout(() => { bar.style.width = "100%"; }, 200);
    setTimeout(() => { gift.classList.add("gift-shake"); }, 1700);

    setTimeout(() => {
        gift.classList.remove("gift-shake");
        ledakanConfetti(); 
        goToSlide(slideLoading, slide3);
    }, 2000);
}

// --- LOGIKA AMPLOP & EFEK NGETIK ---
function openEnvelope() {
    const wrapper = document.querySelector(".envelope-wrapper");
    wrapper.classList.add("open");
    
    setTimeout(() => {
        goToSlide(slide3, slide4);
        setTimeout(() => { startTypewriter(); }, 800);
    }, 1200);
}

function typeWriter(elementId, textString, speed, callback) {
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    let i = 0;

    function type() {
        if (i < textString.length) {
            el.innerHTML += textString.charAt(i);
            i++;
            
            const container = document.getElementById("letter-content");
            container.scrollTop = container.scrollHeight;
            
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function startTypewriter() {
    const speed = 75; 
    typeWriter("para-1", textPara1, speed, () => {
        typeWriter("para-2", textPara2, speed, () => {
            typeWriter("para-3", textPara3, speed, () => {
                // Munculkan tombol setelah semua teks selesai diketik
                btnNext.classList.add("show");
            });
        });
    });
}

// --- PINDAH KE SLIDE 5 (TULISAN AKHIR) ---
btnNext.addEventListener("click", () => {
    goToSlide(slide4, slide5);
    // Tambahkan efek ledakan konfeti lagi untuk meramaikan slide terakhir
    ledakanConfetti();
});

// --- EFEK CONFETTI ---
const confettiContainer = document.getElementById("confetti-container");
const confettiColors = ['#ffb6c1', '#ff69b4', '#ff1493', '#ffc0cb', '#ffffff', '#ffd700'];

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.left = Math.random() * 100 + 'vw';
    
    const size = Math.random() * 8 + 6;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    
    if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
    else confetti.style.height = `${size * 2}px`;
    
    confetti.style.animationDuration = Math.random() * 3 + 3 + 's';
    
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 6000);
}
setInterval(createConfetti, 150);

function ledakanConfetti() {
    for (let i = 0; i < 70; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        
        confetti.style.left = '50vw';
        confetti.style.top = '50vh';
        
        const size = Math.random() * 8 + 6;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 60 + 20; 
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        confetti.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${tx}vw, ${ty}vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 800,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        });
        
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1800);
    }
}
