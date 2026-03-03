// --- CONFIGURATION ---
const introText = "Ummuu ❤️ Saniya — Our Love Story";
const anniversaryDate = "2025-11-24";
const quizQuestions = [
    {q:"Who said I love you first?", a:["Saniya","Ummuu"], correct:0},
    {q:"Favorite date together?", a:["24 Nov 2025","25 Dec 2025"], correct:0},
    {q:"Who plans surprises?", a:["Saniya","Ummuu"], correct:1},
    {q:"what trish loves the most ", a:["food","you"], correct:1},
    {q:"Who is cuter?", a:["Saniya","Ummuu"], correct:0},
    {q:"lets love each other",a:["more","infinitely"],correct:1}
];

// --- STATE ---
let i = 0;
let currentQ = 0;
let score = 0;
let gameInterval;
const audio = document.getElementById('bgMusic');

// --- INITIALIZATION ---
function typeWriter() {
    if (i < introText.length) {
        document.getElementById("typeText").innerHTML += introText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    } else {
        setTimeout(() => switchScreen("intro", "home"), 1000);
    }
}

// Play Music on first interaction
document.body.addEventListener('click', () => {
    audio.play().catch(() => {});
}, { once: true });

// Anniversary Counter
function updateCounter() {
    let start = new Date(anniversaryDate);
    let now = new Date();
    let diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    document.getElementById("days").innerText = "Together for " + diff + " days ❤️";
}

// --- NAVIGATION ---
function switchScreen(hide, show) {
    document.getElementById(hide).classList.add("hidden");
    document.getElementById(show).classList.remove("hidden");
}

// --- PROPOSAL ---
const noBtn = document.getElementById("noBtn");
noBtn.addEventListener('mouseover', () => {
    noBtn.style.top = Math.random() * 80 + "vh";
    noBtn.style.left = Math.random() * 80 + "vw";
});

// --- QUIZ ---
function showQuiz() {
    if (currentQ >= quizQuestions.length) {
        switchScreen("quiz", "gallery");
        return;
    }
    let q = document.getElementById("quizQuestion");
    let options = document.getElementById("quizOptions");
    q.innerText = quizQuestions[currentQ].q;
    options.innerHTML = "";
    
    quizQuestions[currentQ].a.forEach((opt, index) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        options.appendChild(btn);
    });
}

function checkAnswer(index) {
    let result = document.getElementById("quizResult");
    if (index === quizQuestions[currentQ].correct) {
        result.innerText = "Correct 😍";
    } else {
        result.innerText = "umhu 😜";
    }
    currentQ++;
    setTimeout(() => {
        result.innerText = "";
        showQuiz();
    }, 1000);
}

// --- GAME: CATCH THE HEARTS ---
function startGame() {
    let gameTime = 15000; // 15 seconds
    gameInterval = setInterval(() => {
        let heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.className = "heart";
        heart.style.left = Math.random() * 90 + "vw";
        heart.style.top = "-50px";
        document.body.appendChild(heart);

        // Falling animation
        setTimeout(() => { heart.style.top = "110vh"; }, 50);

        heart.onclick = () => {
            score++;
            document.getElementById("score").innerText = score;
            heart.remove();
        };

        // Cleanup
        setTimeout(() => { if(heart) heart.remove(); }, 5000);
    }, 600);

    setTimeout(() => {
        clearInterval(gameInterval);
        switchScreen("game", "final");
        document.getElementById("ring").style.display = "block";
        startFireworks();
        startFloatingHearts();
    }, gameTime);
}

// --- FINALE ---
function startFireworks() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 5 + 2,
            life: 100,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life--;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, 3, 3);
        });
        particles = particles.filter(p => p.life > 0);
        if (particles.length > 0) requestAnimationFrame(animate);
    }
    animate();
}

function startFloatingHearts() {
    setInterval(() => {
        let h = document.createElement("div");
        h.innerHTML = "❤️";
        h.style.position = "absolute";
        h.style.left = Math.random() * 100 + "vw";
        h.style.top = "100vh";
        h.style.fontSize = "20px";
        h.style.transition = "5s linear";
        h.style.pointerEvents = "none";
        document.body.appendChild(h);
        setTimeout(() => { h.style.top = "-10vh"; }, 50);
        setTimeout(() => h.remove(), 5000);
    }, 400);
}

// --- EVENT LISTENERS ---
document.getElementById("enterBtn").onclick = () => switchScreen("home", "proposal");
document.getElementById("yesBtn").onclick = () => {
    switchScreen("proposal", "quiz");
    showQuiz();
};
document.getElementById("playGameBtn").onclick = () => {
    switchScreen("gallery", "game");
    startGame();
};

// --- START ---
window.onload = () => {
    typeWriter();
    updateCounter();
};