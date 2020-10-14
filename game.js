const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question: " How do you write 'Hello!' in an alert box?",
        choice1: "msgBox('Hello!');",
        choice2: "alertBox('Hello!');",
        choice3: "msg('Hello!');",
        choice4: "alert('Hello!');",
        answer: 4,
    },
    {
        question: "How do you create a function in JavaScript?",
        choice1: "function {myFunction}",
        choice2: "function myFunction()",
        choice3: "function.myFunction[]",
        choice4:  "none of the above",
        answer: 2,
    },
    {
        question: "What is the correct way to write an array?",
        choice1:  "var colors = {red blue green}",
        choice2:  "var colors = (red, blue, green)",
        choice3:  "var colors = ['red', 'blue', 'green']",
        choice4:  "varColors = ([red blue green])",
        answer: 3,
    },  
    {
        question: "How do you declare a JavaScript variable?",
        choice1: "v carModel",
        choice2: "var carModel",
        choice3: "variable carModel",
        choice4: "v=carModel",
        answer: 2,
        
    }
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

let timeLeft = 30;
let elem = document.getElementById('timer');
let timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft < 0) {
      clearTimeout(timerId);
      quizOver();

  } else {
      elem.innerHTML = timeLeft + ' seconds remaining';
      timeLeft--;     
  }
}

function quizOver() {
  window.location.assign("end.html");
}

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
  };
  
  getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)
   
      return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
  
    choices.forEach(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
    });
  
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };
  
  choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
  
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        timeLeft -=5
  
      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      } else {
        console.log(timeLeft)
      }
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });
  
  incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };

  
  startGame();