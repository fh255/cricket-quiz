let activeQuestion = 1;
var username = "";
const userResponse = {};

function startQuiz() {
    var usernameInput = document.getElementById('usernameInput');
    var username = usernameInput.value;

    // Display welcome message in a div
    var welcomeMessage = document.getElementById('usernamecontainer');
    welcomeMessage.innerHTML = "<p>Welcome to the quiz, " + username + ".</p>";

    // Activate the first question
    var nextQuestionElement = document.getElementById('question1');
    nextQuestionElement.classList.add('active');
}

function nextQuestion() {
    storeAnswer();
    const activeQuestionElement = document.getElementById(`question${activeQuestion}`);
    activeQuestionElement.classList.remove('active');

    activeQuestion++;
    if (activeQuestion > 3) {
        activeQuestion = 3; // Prevent going beyond the last question
    }

    const nextQuestionElement = document.getElementById(`question${activeQuestion}`);
    nextQuestionElement.classList.add('active');
    getAnswer();
}

function previousQuestion() {
    storeAnswer();
    const activeQuestionElement = document.getElementById(`question${activeQuestion}`);
    activeQuestionElement.classList.remove('active');

    activeQuestion--;
    if (activeQuestion < 1) {
        activeQuestion = 1; // Prevent going before the first question
    }

    const previousQuestionElement = document.getElementById(`question${activeQuestion}`);
    previousQuestionElement.classList.add('active');
    getAnswer();
}

function storeAnswer() {
    const variants = document.getElementsByName(`q${activeQuestion}`);
    for (const variant of variants) {
        if (variant.checked) {
            userResponse[`q${activeQuestion}`] = variant.value;
            break;
        }
    }
}

function getAnswer() {
    const chooseAnswer = userResponse[`q${activeQuestion}`];
    if (chooseAnswer) {
        const variants = document.getElementsByName(`q${activeQuestion}`);
        for (const variant of variants) {
            variant.checked = variant.value === chooseAnswer;
        }
    }
}

function calculateScore() {
    storeAnswer();

    const correctAnswers = {
        q1: 'west-indies',
        q2: '10',
        q3: 'newzeland',
    };

    let scores = 0;
    for (const question in correctAnswers) {
        if (userResponse[question] === correctAnswers[question]) {
            scores++;
        }
    }

    const resultText = `You scored ${scores} out of 3`;
    document.getElementById('result-text').textContent = resultText;

    // Hide questions and display result
    document.querySelectorAll('.question').forEach(question => {
        question.style.display = 'none';
    });
    document.getElementById('result').style.display = 'block';
}

// Show the first question initially
document.getElementById('question1').classList.add('usernamecontainer');