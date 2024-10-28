const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Jerman", correct: false },
        { text: "London", correct: false },
        { text: "Tokyo", correct: false },
        { text: "New York", correct: false },
        { text: "Paris", correct: true },
      ],
    },
    {
      question: "What is the chemical symbol for water?",
      answers: [
        { text: "O2", correct: false },
        { text: "CO2", correct: false },
        { text: "H2O", correct: true },
        { text: "NaCl", correct: false },
        { text: "HO", correct: false },
      ],
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Jupiter", correct: true },
        { text: "Mars", correct: false },
        { text: "Saturn", correct: false },
        { text: "Venus", correct: false },
      ],
    },
    {
      question: "What is the capital of the United States?",
      answers: [
        { text: "Washington D.C.", correct: true },
        { text: "New York", correct: false },
        { text: "Los Angeles", correct: false },
        { text: "Chicago", correct: false },
        { text: "San Francisco", correct: false },
      ],
    },
    {
      question: "What is the largest mammal in the world?",
      answers: [
        { text: "Elephant", correct: false },
        { text: "Blue Whale", correct: true },
        { text: "Giraffe", correct: false },
        { text: "Hippopotamus", correct: false },
        { text: "Rhinoceros", correct: false },
      ],
    },
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      answerButtonsElement.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
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
  
    Array.from(answerButtonsElement.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
  
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (nextButton.innerText === "Play Again") {
      startQuiz();
    } else {
      handleNextButton();
    }
  });
  
  startQuiz();
  