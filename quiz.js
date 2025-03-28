const questions = [
    {
        question: "How many spokes are there in the Ashoka Chakra on the Indian flag?",
        answers: [
            { text: "26", correct: false },
            { text: "24", correct: true },
            { text: "28", correct: false },
            { text: "20", correct: false }
        ]
    },
    {
        question: "who was the first Prime Minister of India?",
        answers: [
            { text: "Sardar Vallabhbhai Patel", correct: false },
            { text: "Jawaharlal Nehru", correct: true },
            { text: "Mahatma Gandhi", correct: false },
            { text: "Dr B.R. Ambedkar", correct: false }
        ]
    },
    {
        question: "Which is the Longest River In India?",
        answers: [
            { text: "Ganga", correct: true},
            { text: "Yamuna", correct: false },
            { text: "Brahmaputra", correct: false },
            { text: "Godavari", correct: false }  
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct; 
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none"; 
    answerButtons.innerHTML = ""; 
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

   
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); 
        }
    });

    nextButton.style.display = "block"; 
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.onclick( startQuiz);
}

startQuiz();


