var startButton = document.getElementById("start-btn")
var welcomeScreen = document.getElementById("welcome")
var nextButton = document.getElementById("next-btn")
var questionContainterEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")

var shuffledQuestions, currentQuestionIndex


startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
	currentQuestionIndex++
	setNextQuestion()
})

function startGame() {
	console.log("Started")
	startButton.classList.add("hide")
	welcomeScreen.classList.add("hide")
	shuffledQuestions = questions.sort(() => Math.random() - .5)
	currentQuestionIndex = 0
	questionContainterEl.classList.remove("hide")
	setNextQuestion()
}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
	questionEl.innerText = question.question
	question.answers.forEach(answer => {
		var button = document.createElement("button")
		button.innerText = answer.text
		button.classList.add("btn")
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener("click", selectAnswer)
		answerButtonsEl.appendChild(button)
	})
}

function resetState() {
	clearStatusClass(document.body)
	nextButton.classList.add("hide")
	while (answerButtonsEl.firstChild) {
		answerButtonsEl.removeChild(answerButtonsEl.firstChild)
	}
}

function selectAnswer(e) {
	var selectedButton = e.target
	var correct = selectedButton.dataset.correct
	setStatusClass(document.body, correct)
	Array.from(answerButtonsEl.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove("hide")
	} else {
		startButton.innerText = "Restart"
		startButton.classList.remove("hide")
	}
	
}

function setStatusClass(element, correct) {
	clearStatusClass(element)
	if (correct) {
		element.classList.add("correct")
	} else{
		element.classList.add("wrong")	
	}
}

function clearStatusClass(element){
	element.classList.remove("correct")
	element.classList.remove("wrong")
}

// Questions for quiz

var questions = [
			{
				question: "What element should we put the JavaScript?",
				answers: [
					{text: "<script>", correct: true},
					{text: "<head>", correct: false},
					{text: "js", correct: false},
					{text: "javascript", correct: false}
				]

			},
				{
					question: "How do you write 'Stop!' in an alert box?",
					answers: [
						{text: "alert('Stop!')", correct: true},
						{text: "alertBox('Stop!')", correct: false},
						{text: "alert{'Stop'}", correct: false},
						{text: "msg('Stop!')", correct: false}
					]				
			
				},
					{
						question: "How do you create a function in JavaScript?",
						answers: [
							{text: "function (myFunction)", correct: true},
							{text: "function {myFunction}", correct: false},
							{text: "function.myFunction[]", correct: false},
							{text: "none of the above", correct: false}
						]	
					},
						{
							question: "What is the correct way to write an array?",
							answers: [
								{text: "var colors = ['red', 'blue', 'green']", correct: true},
								{text: "var colors = 'red', 'blue', 'green'", correct: false},
								{text: "var colors = (red, blue, green)", correct: false},
								{text: "var colors = {red red blue green}", correct: false}
							]	
						},
							{
								question: "How do you declare a JavaScript variable?",
								answers: [
									{text: "var carModel", correct: true},
									{text: "v carModel", correct: false},
									{text: "variable carModel", correct: false},
									{text: "v=carModel", correct: false}
								]	
							}
	]
