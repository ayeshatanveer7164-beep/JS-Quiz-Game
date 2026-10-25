// Quiz questions in JSON-style JavaScript data
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Main Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style web pages?",
        options: [
            "Python",
            "CSS",
            "SQL",
            "Java"
        ],
        answer: 1
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "define"
        ],
        answer: 2
    },
    {
        question: "Which method selects an element by its ID?",
        options: [
            "document.getElementById()",
            "document.getElementsByClassName()",
            "document.createElement()",
            "document.write()"
        ],
        answer: 0
    },
    {
        question: "Which symbol is used for strict equality in JavaScript?",
        options: [
            "=",
            "==",
            "===",
            "!="
        ],
        answer: 2
    }
];

// DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score-display");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

// Quiz state
let currentQuestion = 0;
let score = 0;
let answered = false;

// Start or restart the quiz
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    startScreen.hidden = true;
    resultScreen.hidden = true;
    quizScreen.hidden = false;

    showQuestion();
}

// Display the current question
function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;
    questionElement.textContent = current.question;
    feedback.textContent = "";
    optionsContainer.replaceChildren();

    progress.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    nextBtn.disabled = true;

    // Create answer buttons using the DOM
    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        optionsContainer.appendChild(button);
    });
}

// Check the selected answer
function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === current.answer) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && index !== current.answer) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === current.answer) {
        score++;
        feedback.textContent = "Correct! Well done.";
    } else {
        feedback.textContent = "Incorrect. Check the green answer.";
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextBtn.disabled = false;

    // Show full progress when the final question is answered
    if (currentQuestion === questions.length - 1) {
        progress.style.width = "100%";
        nextBtn.textContent = "View Results";
    }
}

// Move to the next question or show results
function nextQuestion() {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        nextBtn.textContent = "Next Question";
        showQuestion();
    } else {
        showResults();
    }
}

// Display the final score
function showResults() {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    finalScore.textContent =
        `Your score: ${score} / ${questions.length}`;

    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent =
            "Excellent! You answered every question correctly.";
    } else if (percentage >= 60) {
        resultMessage.textContent =
            "Good job! Keep practicing to improve your score.";
    } else {
        resultMessage.textContent =
            "Keep learning! Try again to improve your result.";
    }
}

// Button event listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);