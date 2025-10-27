const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Tesla", "Edison"],
    answer: "Einstein"
  }
];

const startBtn = document.getElementById("startQuiz");
const quizContainer = document.getElementById("quiz");
const quizSection = document.getElementById("quiz-section");
const userInfo = document.getElementById("user-info");
const timerDisplay = document.getElementById("timer");
const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");

let countdown;
let totalSeconds = 60 * 60; // 1 hour

function startTimer() {
  countdown = setInterval(() => {
    totalSeconds--;
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds}`;

    if (totalSeconds <= 0) {
      clearInterval(countdown);
      alert("Time's up! Submitting quiz automatically.");
      calculateScore();
    }
  }, 1000);
}

function loadQuiz() {
  quizContainer.innerHTML = "";
  quizData.forEach((q, i) => {
    const questionBlock = document.createElement("div");
    questionBlock.innerHTML = `
      <h3>${i + 1}. ${q.question}</h3>
      ${q.options.map(opt => 
        `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`
      ).join("")}
    `;
    quizContainer.appendChild(questionBlock);
  });
}

function calculateScore() {
  clearInterval(countdown);
  let score = 0;
  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === q.answer) score++;
  });

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  result.textContent = `${name}, you scored ${score} out of ${quizData.length}.`;
  
  // Send data to a Google Sheet (see Part 2)
  saveResponse(name, email, score);
}

startBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!name || !email) {
    alert("Please enter your name and email before starting.");
    return;
  }

  userInfo.style.display = "none";
  quizSection.style.display = "block";
  loadQuiz();
  startTimer();
});

submitBtn.addEventListener("click", calculateScore);

// ---- OPTIONAL: Send to Google Sheet or API ----
function saveResponse(name, email, score) {
  // Placeholder: replace with Google Apps Script web app URL
  const scriptURL = "YOUR_GOOGLE_SCRIPT_WEBAPP_URL";
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ name, email, score, timestamp: new Date().toISOString() }),
    headers: { "Content-Type": "application/json" }
  }).catch(err => console.error(err));
}
