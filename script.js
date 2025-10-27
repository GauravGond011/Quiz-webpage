const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  }
];

const quizContainer = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");

function loadQuiz() {
  quizContainer.innerHTML = "";
  quizData.forEach((q, i) => {
    const questionBlock = document.createElement("div");
    questionBlock.innerHTML = `
      <h3>${i + 1}. ${q.question}</h3>
      ${q.options
        .map(
          opt => `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`
        )
        .join("")}
    `;
    quizContainer.appendChild(questionBlock);
  });
}

submitBtn.addEventListener("click", () => {
  let score = 0;
  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === q.answer) score++;
  });
  result.textContent = `You scored ${score} out of ${quizData.length}!`;
});

loadQuiz();
