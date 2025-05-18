const quizData = [
  {
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["France", "Argentina", "Brazil", "Germany"],
    correct: "France"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci"],
    correct: "Leonardo da Vinci"
  },
  {
    question: "What is the largest species of shark?",
    options: ["Whale Shark", "Tiger Shark", "Hammerhead Shark", "Great White Shark"],
    correct: "Whale Shark"
  }
];

let currentQuiz = 0;
let score = 0;
let timeLeft = 30;
let timer;

const quizContainer = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const submitBtn = document.getElementById("submit");
const retryBtn = document.getElementById("retry");
const restartBtn = document.getElementById("restart");
const showAnswerBtn = document.getElementById("showAnswer");
const timerEl = document.getElementById("time");

function loadQuiz() {
  startTimer();
  quizContainer.classList.remove("fade");
  void quizContainer.offsetWidth;
  quizContainer.classList.add("fade");

  const currentData = quizData[currentQuiz];
  quizContainer.innerHTML = `
    <div class="question">${currentData.question}</div>
    <div class="options">
      ${currentData.options.map(option => `
        <label>
          <input type="radio" name="option" value="${option}">
          ${option}
        </label>
      `).join('')}
    </div>
  `;
}

function getSelected() {
  const options = document.getElementsByName("option");
  for (let opt of options) {
    if (opt.checked) return opt.value;
  }
  return undefined;
}

function showResult() {
  quizContainer.innerHTML = "";
  resultEl.innerText = `You scored ${score} out of ${quizData.length}`;
  retryBtn.classList.remove("hide");
  restartBtn.classList.remove("hide");
  showAnswerBtn.classList.remove("hide");
  stopTimer();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.innerText = timeLeft;
  timerEl.style.color = "#d90000";

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;

    if (timeLeft === 10) {
      alert("⚠️ Only 10 seconds left! Hurry up!");
      timerEl.style.color = "orange";
    }

    if (timeLeft <= 5) {
      timerEl.style.color = "red";
    }

    if (timeLeft === 0) {
      clearInterval(timer);
      alert("⏰ Time's up!");
      submitBtn.click();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (!answer) return;

  if (answer === quizData[currentQuiz].correct) {
    score++;
  }

  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

retryBtn.addEventListener("click", () => {
  currentQuiz = 0;
  score = 0;
  resultEl.innerText = "";
  retryBtn.classList.add("hide");
  restartBtn.classList.add("hide");
  showAnswerBtn.classList.add("hide");
  loadQuiz();
});

restartBtn.addEventListener("click", () => {
  window.location.reload();
});

showAnswerBtn.addEventListener("click", () => {
  quizContainer.innerHTML = quizData.map(q => `
    <div class="question">${q.question}</div>
    <div class="options">
      ${q.options.map(option => `
        <label style="color: ${option === q.correct ? 'green' : 'black'};">
          ${option}
        </label>
      `).join('')}
    </div>
  `).join('');
});

loadQuiz();
