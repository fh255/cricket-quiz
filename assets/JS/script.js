// Vriable to hold the questions and user's Answer 

let activeQuestion = 1;
var username = "";
const userResponse = {};

// Define the start quiz function

function startQuiz() {
    let usernameInput = document.getElementById('usernameInput');
    let username = usernameInput.value;

    // Display welcome message in a div

    let welcomeMessage = document.getElementById('usernamecontainer');
    welcomeMessage.innerHTML = "<p>Welcome to the quiz, " + username + ".</p>";

    // Activ the 1st question
    let nextQuestionElement = document.getElementById('question1');
    nextQuestionElement.classList.add('active');
}
//Load the next question and store the data

function nextQuestion() {
    storeAnswer();
    const activeQuestionElement = document.getElementById(`question${activeQuestion}`);
    activeQuestionElement.classList.remove('active');

// Prevent going beyond the last question

    activeQuestion++;
    if (activeQuestion > 3) {
        activeQuestion = 3; 
    }

    const nextQuestionElement = document.getElementById(`question${activeQuestion}`);
    nextQuestionElement.classList.add('active');
    getAnswer();
}
//Load the previous question and store the data

function previousQuestion() {
    storeAnswer();
    const activeQuestionElement = document.getElementById(`question${activeQuestion}`);
    activeQuestionElement.classList.remove('active');

    // Prevent going before the first question

    activeQuestion--;
    if (activeQuestion < 1) {
        activeQuestion = 1; 
    }

    const previousQuestionElement = document.getElementById(`question${activeQuestion}`);
    previousQuestionElement.classList.add('active');
    getAnswer();
}
// function to store the data

function storeAnswer() {
    const variants = document.getElementsByName(`q${activeQuestion}`);
    for (const variant of variants) {
        if (variant.checked) {
            userResponse[`q${activeQuestion}`] = variant.value;
            break;
        }
    }
}
// Function to get the answer

function getAnswer() {
    const chooseAnswer = userResponse[`q${activeQuestion}`];
    if (chooseAnswer) {
        const variants = document.getElementsByName(`q${activeQuestion}`);
        for (const variant of variants) {
            variant.checked = variant.value === chooseAnswer;
        }
    }
}
//Define the correct answer

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
    const resultImage = document.getElementById('result-image');
    if (scores === 3) {
        resultImage.src = 'https://github.com/fh255/cricket-quiz/blob/main/assets/images/main-image.webp'; // Path to the correct answer image
    } else {
        resultImage.src = 'https://github.com/fh255/cricket-quiz/blob/main/assets/images/logo.jpeg'; // Path to the incorrect answer image
    }

    // Hide questions and display result
    document.querySelectorAll('.question').forEach(question => {
        question.style.display = 'none';
    });
    document.getElementById('result').style.display = 'block';
}

// Show the first question initially

document.getElementById('question1').classList.add('usernamecontainer');