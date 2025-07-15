let current = 0;

const questionBox = document.getElementById('question-box');
const nextBtn = document.getElementById('next-btn');

function loadQuestion(index) {
  const q = questions[index];
  questionBox.innerHTML = `
    <h3>Q${index + 1}. ${q.question}</h3>
    ${Object.entries(q.options).map(([key, text]) => `
      <div class="option" data-key="${key}">${key}. ${text}</div>
    `).join('')}
  `;
  nextBtn.disabled = true;

  document.querySelectorAll('.option').forEach(opt => {
    opt.addEventListener('click', () => handleAnswer(opt, q.answer));
  });
}

function handleAnswer(optionEl, correctAnswer) {
  const selected = optionEl.getAttribute('data-key');

  document.querySelectorAll('.option').forEach(opt => {
    opt.classList.add('disabled');
    const key = opt.getAttribute('data-key');
    if (key === correctAnswer) {
      opt.classList.add('correct');
    } else if (key === selected) {
      opt.classList.add('incorrect');
    }
  });

  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  current++;
  if (current < questions.length) {
    loadQuestion(current);
  } else {
    questionBox.innerHTML = `<h3>✅ You've completed the prototype!</h3>`;
    nextBtn.style.display = 'none';
  }
});

loadQuestion(current);
