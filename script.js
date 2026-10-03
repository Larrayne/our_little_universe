const heartButton = document.getElementById("heartButton");
const burstContainer = document.getElementById("burstContainer");

const welcomeScreen = document.getElementById("welcomeScreen");
const questionScreen = document.getElementById("questionScreen");

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");


// ❤️ QUESTIONS

const questions = [
    {
        question: "Do you know how much I love you? 💕",
        yes: "More than words ❤️",
        no: "You’re impossible 😈"
    },

    {
        question: "Do I make your world feel softer? 🥺",
        yes: "Always 💕",
        no: "You really do 😏"
    },

    {
        question: "Would you still pick me in every universe? 💜",
        yes: "Every single time ❤️",
        no: "You’re making me blush 👀"
    },

    {
        question: "Am I your favorite place to be? 🥰",
        yes: "Obviously 💕",
        no: "You’re so dramatic 😭"
    },

    {
        question: "Are you ready for your surprise? 🎁",
        yes: "YESSS! 😍",
        no: "I’ll take that as a yes 😂"
    }
];


let currentQuestion = 0;
let noClicks = 0;


// ❤️ HEART BURST

heartButton.addEventListener("click", function () {

    const rect = heartButton.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const hearts = ["💗", "💖", "💕", "💜", "❤️", "✨", "🌸", "🌷", "💐", "💞"];

    for (let i = 0; i < 25; i++) {

        const heart = document.createElement("span");

        heart.classList.add("burst-heart");

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;

        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 180;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        heart.style.setProperty("--x", `${x}px`);
        heart.style.setProperty("--y", `${y}px`);

        burstContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1200);
    }


    setTimeout(() => {

        welcomeScreen.style.opacity = "0";

        setTimeout(() => {

            welcomeScreen.style.display = "none";

            questionScreen.classList.add("show");

        }, 500);

    }, 700);

});


// 😈 NO BUTTON

noButton.addEventListener("click", function () {

    noClicks++;

    const newSize = 1 + (noClicks * 0.25);

    yesButton.style.transform = `scale(${newSize})`;

    const responses = [
        "Are you sure? 😭",
        "Really?! 😭",
        "STOP LYING 😂",
        "You can't escape the YES button 😈"
    ];

    noButton.textContent =
        responses[Math.min(noClicks - 1, responses.length - 1)];
});


// ❤️ YES BUTTON

yesButton.addEventListener("click", function () {

    nextQuestion();

});


// ✨ NEXT QUESTION

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        showFinalScreen();

        return;
    }


    // Fade current question out

    questionScreen.classList.add("leaving");


    setTimeout(() => {

        const next = questions[currentQuestion];

        questionNumber.textContent =
            `Question ${currentQuestion + 1} of ${questions.length}`;

        questionText.textContent =
            next.question;

        yesButton.textContent =
            next.yes;

        noButton.textContent =
            next.no;


        // Reset YES button

        yesButton.style.transform = "scale(1)";

        noClicks = 0;


        // Fade question back in

        questionScreen.classList.remove("leaving");

        questionScreen.classList.remove("entering");

        void questionScreen.offsetWidth;

        questionScreen.classList.add("entering");

    }, 600);

}


// 💌 FINAL SCREEN
function showFinalScreen() {

    questionScreen.innerHTML = `

        <p class="question-number">
            You've made it to the end... ✨
        </p>

        <h2>
            One last thing... 💌
        </h2>

        <button class="heart-button final-heart" id="finalHeart">
            ❤️
        </button>

        <p class="tap-text">
            Tap the heart for your surprise 💕
        </p>

    `;

    const finalHeart = document.getElementById("finalHeart");

    if (!finalHeart) {
        return;
    }

    finalHeart.addEventListener("click", function () {

        createHeartBurst(finalHeart);

        setTimeout(() => {
            openLoveLetter();
        }, 900);

    });
}

function openLoveLetter() {

    questionScreen.innerHTML = `

        <div class="letter-container">

            <div class="envelope" id="envelope">

                <div class="envelope-bow" aria-hidden="true">
                    <span class="bow-lobe bow-left"></span>
                    <span class="bow-lobe bow-right"></span>
                    <span class="bow-knot"></span>
                </div>

                <div class="envelope-flap"></div>

                <div class="envelope-body">

                    <div class="letter">

                        <div class="letter-sheet">
                            <div class="paper-lines" aria-hidden="true"></div>
                            <span class="scribble scribble-one">✎</span>
                            <span class="scribble scribble-two">♡</span>
                            <span class="scribble scribble-three">✦</span>

                            <div class="letter-content">

                                <h3>To My Love 💜</h3>

                                <p>
                                    My love,
                                </p>

                                <p>
                                    If you're reading this, it means we made it here.
                                    Through all the little moments, the big feelings,
                                    and every version of us that keeps becoming more us.
                                    ❤️
                                </p>

                                <p>
                                    I just wanted to tell you something simple and true:
                                    you make my life feel warmer, softer, brighter,
                                    and more beautiful than I ever knew it could.
                                </p>

                                <p>
                                    I love the way you make ordinary days feel special,
                                    the way your laugh settles my whole heart,
                                    and the way being with you feels like home.
                                </p>

                                <p>
                                    The truth is, my favorite place in the world is
                                    wherever you are. And my favorite part of this life
                                    is getting to share it with you. ✨
                                </p>

                                <p>
                                    Thank you for being my person, my comfort,
                                    my safe place, and the love I keep choosing again and again.
                                </p>

                                <p class="signature">
                                    Always yours,<br>
                                    💜 Me
                                </p>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <p class="letter-hint">
                💌 Tap the envelope
            </p>

        </div>
    `;


    const envelope = document.getElementById("envelope");

    envelope.addEventListener("click", function () {

        const letterHint = document.querySelector(".letter-hint");

        if (!envelope.classList.contains("open")) {
            envelope.classList.add("open");

            if (letterHint) {
                letterHint.textContent = "💌 Tap the envelope to keep going";
            }

            setTimeout(() => {
                createHeartBurst(envelope);
            }, 900);

            return;
        }

        if (letterHint) {
            letterHint.style.opacity = "0";
        }

        showLoveYouScreen();
    });
}

function showLoveYouScreen() {
    questionScreen.innerHTML = `

        <div class="final-love-screen">

            <p class="small-text">Always and forever ✨</p>

            <h2>I love you 💜</h2>

            <p class="love-you-message">
                More than words could ever say, more than I can ever explain.
                You are my favorite person, my favorite place, and my favorite dream.
            </p>

            <button class="heart-button final-love-heart" id="finalLoveHeart">
                ❤️
            </button>

            <p class="tap-text">Forever yours 💕(tap the heart)</p>

        </div>
    `;

    const loveHeart = document.getElementById("finalLoveHeart");

    if (!loveHeart) {
        return;
    }

    loveHeart.addEventListener("click", function () {
        createHeartBurst(loveHeart);
    });
}


// 💥 HEART BURST FUNCTION

function createHeartBurst(targetElement = document.querySelector(".final-heart") || document.getElementById("envelope")) {

    if (!targetElement) {
        return;
    }

    const rect = targetElement.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 2;

    const hearts =
        ["💗", "💖", "💕", "💜", "❤️", "✨", "🌸", "🌷", "💐", "💞"];

    for (let i = 0; i < 40; i++) {

        const heart = document.createElement("span");

        heart.classList.add("burst-heart");

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 250;

        heart.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        heart.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );

        burstContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1200);
    }
}