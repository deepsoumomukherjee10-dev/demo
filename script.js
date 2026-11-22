
/* ==========================================
   1. PERSONAL SECRET QUESTIONS
========================================== */

// CHANGE YOUR ANSWERS HERE

const correctAnswers = {
    1: "kolkata",
    2: "princess"
};

let unlocked1 = false;
let unlocked2 = false;


function checkAnswer(number) {

    const input = document.getElementById("answer" + number);

    const answer = input.value.trim().toLowerCase();

    if (number === 2 && !unlocked1) return;

    if (answer === correctAnswers[number]) {

        if (number === 1) {

            unlocked1 = true;

            document.getElementById("message1").innerText =
                "Correct! One secret unlocked! 💗";

            document.getElementById("lock2")
                .classList.remove("hidden");

            input.disabled = true;

        }

        else if (number === 2) {

            unlocked2 = true;

            document.getElementById("message2").innerText =
                "You know me so well! ❤️";

            document.getElementById("enterBtn")
                .classList.remove("hidden");

            input.disabled = true;

        }

    } else {

        document.getElementById("message" + number).innerText =
            "Oops! Wrong answer. Try again! 😂";

    }

}


/* ==========================================
   2. PAGE NAVIGATION
========================================== */

function goToPage(number) {

    if (number > 1 && !unlocked2) {

        alert("First unlock both secret messages! 💗");
        return;

    }

    // Stop all memory music when changing pages
    document.querySelectorAll(".memory-song").forEach(song => {
        song.pause();
    });

    document.querySelectorAll(".memory-card button").forEach(btn => {
        btn.innerText = "▶ Play Our Song";
    });

    currentMemorySong = null;

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("page" + number)
        .classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==========================================
   3. BIRTHDAY MUSIC
========================================== */

function startMusic() {

    // Stop memory music
    document.querySelectorAll(".memory-song").forEach(song => {
        song.pause();
    });

    document.querySelectorAll(".memory-card button").forEach(btn => {
        btn.innerText = "▶ Play Our Song";
    });

    currentMemorySong = null;

    const music = document.getElementById("bgMusic");

    music.play().catch(() => {
        alert("Please tap the music button again!");
    });

}


/* ==========================================
   4. INDIVIDUAL MEMORY MUSIC
========================================== */

let currentMemorySong = null;

function playMemorySong(button) {

    const song = button
        .closest(".memory-card")
        .querySelector(".memory-song");

    const backgroundMusic = document.getElementById("bgMusic");

    backgroundMusic.pause();

    // Pause the current song if the same button is clicked
    if (currentMemorySong === song && !song.paused) {

        song.pause();

        button.innerText = "▶ Play Our Song";

        currentMemorySong = null;

        return;

    }

    // Stop every other memory song
    document.querySelectorAll(".memory-song").forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    document.querySelectorAll(".memory-card button").forEach(btn => {
        btn.innerText = "▶ Play Our Song";
    });

    currentMemorySong = song;

    song.play().then(() => {

        button.innerText = "⏸ Pause Song";

    }).catch(() => {

        button.innerText = "▶ Play Our Song";

        currentMemorySong = null;

        alert("Tap again to play this song!");

    });

    song.onended = () => {

        button.innerText = "▶ Play Our Song";

        currentMemorySong = null;

    };

}


/* ==========================================
   5. BIRTHDAY CAKE
========================================== */

let candlesBlown = false;
let cakeCut = false;


function blowCandles() {

    if (candlesBlown) return;

    candlesBlown = true;

    const scene = document.getElementById("cakeScene");

    scene.classList.add("blown");

    document.getElementById("birthdayWish")
        .classList.remove("hidden");

    document.getElementById("cakeMessage").innerText =
        "Your wish is on its way! ✨";

    launchConfetti();

}


function cutCake() {

    if (!candlesBlown) {

        document.getElementById("cakeMessage").innerText =
            "First blow out your candles! 🕯️";

        return;

    }

    if (cakeCut) return;

    cakeCut = true;

    document.getElementById("cakeScene")
        .classList.add("cut");

    document.getElementById("cakeMessage").innerText =
        "A slice of happiness, just for you! 🍰";

    setTimeout(() => {
        launchConfetti();
    }, 1200);

}


/* ==========================================
   6. CONFETTI ANIMATION
========================================== */

function launchConfetti() {

    const decorations = ["💗", "💙", "✨", "🎉", "🎀"];

    for (let i = 0; i < 50; i++) {

        const piece = document.createElement("div");

        piece.innerText =
            decorations[Math.floor(Math.random() * decorations.length)];

        piece.style.position = "fixed";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-30px";
        piece.style.fontSize = "25px";
        piece.style.zIndex = "1000";
        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);

        piece.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform: "translateY(100vh) rotate(720deg)",
                    opacity: 0
                }
            ],
            {
                duration: 3000 + Math.random() * 2000,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            piece.remove();
        }, 5500);

    }

}


/* ==========================================
   7. MOOD GAME
========================================== */

function chooseMood(mood) {

    const result = document.getElementById("moodResult");

    const emoji = document.getElementById("meEmoji");

    if (mood === "angry") {

        emoji.innerText = "🤕";

        result.innerText =
            "Ouch!! 😂 You can beat me, but don't stop being my favourite person!";

    }

    else if (mood === "love") {

        emoji.innerText = "😘";

        result.innerText =
            "Sending you a thousand kisses! Mwahhh! 💋";

    }

    else if (mood === "peace") {

        emoji.innerText = "🤗";

        result.innerText =
            "Big warm hug! You deserve all the peace in the world! ❤️";

    }

    // Restart the animation every time
    emoji.style.animation = "none";

    void emoji.offsetWidth;

    emoji.style.animation = "moodPop 0.6s ease";

}


/* ==========================================
   8. CATCHING GAME
========================================== */

let score = 0;
let gameRunning = false;

let gameInterval = null;
let fallingInterval = null;
let gameTimeout = null;

let bucketPosition = 45;

const gameArea = document.getElementById("gameArea");

const bucket = document.getElementById("bucket");


/* MOVE BUCKET */

function moveBucket(position) {

    bucketPosition = Math.max(0, Math.min(90, position));

    bucket.style.left = bucketPosition + "%";

}


/* POINTER SUPPORT: MOUSE + TOUCH */

gameArea.addEventListener("pointermove", function(event) {

    if (!gameRunning) return;

    const rect = gameArea.getBoundingClientRect();

    const position =
        ((event.clientX - rect.left) / rect.width) * 100;

    moveBucket(position - 4);

});


/* KEYBOARD SUPPORT */

document.addEventListener("keydown", function(event) {

    if (!gameRunning) return;

    if (event.key === "ArrowLeft") {

        moveBucket(bucketPosition - 5);

    }

    if (event.key === "ArrowRight") {

        moveBucket(bucketPosition + 5);

    }

});


/* START GAME */

function startGame() {

    if (gameRunning) return;

    score = 0;

    document.getElementById("score").innerText = score;

    document.getElementById("gameMessage").innerText =
        "Catch as many as you can! 💗";

    gameRunning = true;

    bucketPosition = 45;

    moveBucket(bucketPosition);

    fallingInterval = setInterval(createFallingItem, 650);

    gameInterval = setInterval(checkCollision, 40);

    gameTimeout = setTimeout(() => {

        stopGame();

    }, 30000);

}


/* CREATE FALLING OBJECTS */

function createFallingItem() {

    if (!gameRunning) return;

    const item = document.createElement("div");

    item.classList.add("falling-item");

    const items = ["❤️", "🍫", "💗", "🍬"];

    item.innerText =
        items[Math.floor(Math.random() * items.length)];

    item.style.left = Math.random() * 90 + "%";

    gameArea.appendChild(item);

    let position = 0;

    const fall = setInterval(() => {

        if (!gameRunning || !item.isConnected) {

            clearInterval(fall);
            item.remove();

            return;

        }

        position += 3;

        item.style.top = position + "px";

        if (position > gameArea.clientHeight) {

            clearInterval(fall);

            item.remove();

        }

    }, 35);

}


/* CHECK COLLISION */

function checkCollision() {

    const items = document.querySelectorAll(".falling-item");

    const bucketRect = bucket.getBoundingClientRect();

    items.forEach(item => {

        const itemRect = item.getBoundingClientRect();

        const collision =

            itemRect.bottom >= bucketRect.top &&
            itemRect.top <= bucketRect.bottom &&
            itemRect.right >= bucketRect.left &&
            itemRect.left <= bucketRect.right;

        if (collision) {

            score += 10;

            document.getElementById("score").innerText = score;

            item.remove();

        }

    });

}


/* END GAME */

function stopGame() {

    if (!gameRunning) return;

    gameRunning = false;

    clearInterval(gameInterval);

    clearInterval(fallingInterval);

    clearTimeout(gameTimeout);

    document.querySelectorAll(".falling-item").forEach(item => {
        item.remove();
    });

    document.getElementById("gameMessage").innerText =
        "Game over! Your final score is " + score + "! 💗";

}
