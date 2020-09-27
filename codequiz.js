var startButton = document.getElementById("start-btn")
var welcomeScreen = document.getElementById("welcome")
var nextButton = document.getElementById("next-btn")
var questionContainerEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")
var correctAns = document.getElementById("correct")
var wrongAns = document.getElementById("wrong")
var score = 0;

var currentQuestionIndex = 0;

var timeEl = document.querySelector(".topcorner");
var mainEl = document.getElementById("timer");
var timerInterval;
var secondsLeft = 60;

function setTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left till quiz is over.";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz();
            secondsLeft = 0;
            timeEl.textContent = secondsLeft + " Game is over.";
        }

    }, 1000);
}



function startGame() {
    startButton.classList.add("hide")
    welcomeScreen.classList.add("hide")
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide")
    setNextQuestion()
    setTime()
}

 function setNextQuestion() {
    var currentQuestion = questions[currentQuestionIndex].question;
    questionEl.textContent = currentQuestion;
    answerButtonsEl.innerHTML = "";
    questions[currentQuestionIndex].answers.forEach(function (choice) {
        var button = document.createElement("button");
        button.setAttribute("value", choice);
        button.setAttribute("class", "btn")
        button.textContent = choice;
        button.onclick = checkAnswers;
        answerButtonsEl.appendChild(button);
    })
}   

function checkAnswers() {
    if (this.value === questions[currentQuestionIndex].correct) {
        score++
        correctAns.classList.remove("hide")
        setTimeout(() => {
            correctAns.classList.add("hide")
        }, 1000);
    } else {
        secondsLeft -= 2;
        timeEl.textContent = secondsLeft + " seconds left till quiz is over.";
        wrongAns.classList.remove("hide")
        setTimeout(() => {
            wrongAns.classList.add("hide")
        }, 1000);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        setNextQuestion();
    }
}


startButton.addEventListener("click", startGame)

function endQuiz() {
    clearInterval(timerInterval);
    console.log("game over");
    // when the timer runs out or the user answers all the questions, it takes them to a new page with their score 
    // would this be an if statement? 
}

var questions = [{
        question: "What element should we put the JavaScript?",
        answers: [
            "<script>",
            "<head>",
            "js",
            "javascript",
        ],
        correct: "<script>"

    },
    {
        question: "How do you write 'Stop!' in an alert box?",
        answers: [
            "alert('Stop!')",
            "alertBox('Stop!')",
            "alert{'Stop'}",
            "msg('Stop!')",
        ],
        correct: "alert('Stop!')"
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            "function myFunction()",
            "function {myFunction}",
            "function.myFunction[]",
            "none of the above",
        ],
        correct: "function myFunction()"
    },
    {
        question: "What is the correct way to write an array?",
        answers: [
            "var colors = ['red', 'blue', 'green']",
            "var colors = (red, blue, green)",
            "var colors = {red red blue green}",
        ],
        correct: "var colors = ['red', 'blue', 'green']"
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            "var carModel",
            "v carModel",
            "variable carModel",
            "v=carModel",
        ],
        correct: "var carModel"
    }
]