const questions = [
    {
        question: "Milyen magas vagy?",
        answers: [
            { text: "Kisebbb mint 160cm", correct: false, ertek: 1 },
            { text: "160-175 cm", correct: true, ertek: 2 },
            { text: "175-185 cm", correct: false, ertek: 3 },
            { text: "Magasabb mint 185cm", correct: false, ertek: 4 },

        ]
    },
    {
        question: "Milyen az egyensúly érzéked?",
        answers: [
            { text: "Rossz", correct: false, ertek: 4 },
            { text: "Elmegy", correct: true, ertek: 3 },
            { text: "Jó", correct: false, ertek: 2 },
            { text: "Kiváló", correct: false, ertek: 1 },

        ]
    },
    {
        question: "Mennyire vagy csapatjátékos?",
        answers: [
            { text: "Solo", correct: false, ertek: 1 },
            { text: "Elvagyok a csapatban", correct: true, ertek: 2 },
            { text: "Szeretek csapatban játszani", correct: false, ertek: 3 },
            { text: "Gyakran csapatkapitány is vagyok", correct: false, ertek: 4 },

        ]
    }
    ,
    {
        question: "Mennyire jók a reflexeid?",
        answers: [
            { text: "Lassúak", correct: false, ertek: 1 },
            { text: "Normálisak", correct: false, ertek: 2 },
            { text: "Kifejezetten gyorsak", correct: false, ertek: 3 },
            { text: "Hamarabb észreveszem a hibát, mint a program.", correct: true, ertek: 4 },

        ]
    },
    {
        question: `Ki a valaha volt legjobb focista? <br>(Ez a kérdés nem szubjektív!)`,
        answers: [
            { text: "Lionel Messi", correct: false, ertek: 1 },
            { text: "Pelé", correct: false, ertek: 2 },
            { text: "Puskás Ferenc", correct: false, ertek: 3 },
            { text: "Cristiano Ronaldo", correct: true, ertek: 4 },

        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQestionIndex = 0;
let score = 0;
let szamlalo = 0;

function startQuiz() {
    currentQestionIndex = 0;
    score = 0;
    szamlalo = 0;
    nextButton.innerHTML = "Következő";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQestionIndex];
    let questionNo = currentQestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.dataset.ertek = answer.ertek;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    szamlalo = Number(selectedBtn.dataset.ertek) + szamlalo
    if (currentQestionIndex == 4) {

        if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
        }
    }
    else {
        selectedBtn.classList.add("valasztott");
    }

        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true" && currentQestionIndex ==4 ) {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    if (szamlalo < 9) {
        questionElement.innerHTML = `Számodra a legjobb sportág a SÍELÉS lehet.`
    }
    else if (szamlalo < 12) {
        questionElement.innerHTML = `A KORCSOLYA egy nagyon jó választás lehet.`
    }
    else if (szamlalo < 15) {
        questionElement.innerHTML = `A LABDARÚGÁS a te sportod.`
    }
    else if (szamlalo < 18) {
        questionElement.innerHTML = `Ugorj magasra, mert te RÖPLADBÁSnak születtél.`
    }
    else if (szamlalo < 20) {
        questionElement.innerHTML = `A KOSÁRLABDA vagy a KÉZILABDA sem jelenthet neked akadályt, hajrá!`
    }
    else {
        questionElement.innerHTML = `A KOSÁRLABDA ideális egy ilyen magas enyéniségnek.`
    }

    nextButton.innerHTML = "Újra";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQestionIndex++;
    if (currentQestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();