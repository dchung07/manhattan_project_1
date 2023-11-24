function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const questions = [
    {
        question: "Should Larry quit League Of Legends?",
        answers: [
            { text: "Yes", correct: true},
            { text: "No", correct: false},
            { text: "Maybe I don't flame?", correct: false},
            { text: "OFC NOT, HE IS FAKER!", correct: false},
        ]
    },
   //can add more questions in the bottom styled like the one above and one bellow
   //the answers and questions are all shuffled so arrangement doesn't matter, makes it easier to code! - jinx
    {
        question: "Best Pokemon Era of Games?",
        answers: [
            { text: "Nintendo Wii U", correct: false},
            { text: "Nintendo Switch", correct: false},
            { text: "Nintendo DS", correct: true},
            { text: "Nintendo 3DS", correct: false},
        ]
    }
];

const questionElementNo = document.getElementById("questionNumber");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("buttonContainer");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    shuffleArray(questions);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 + ". ";
    questionElementNo.innerHTML = questionNo;
    questionElement.innerHTML = currentQuestion.question;
    shuffleArray(currentQuestion.answers);

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("playButton");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
            score++;
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElementNo.innerHTML = '';
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "PLAY AGAIN!";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();