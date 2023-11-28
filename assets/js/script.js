/* eslint-env es6 */
/* jshint esversion: 6 */
// Vriable to hold the questions and user's Answer

let activeQuestion = 1;
let username = "Guest";
const userResponse = {};

// Define the start quiz function

function startQuiz() {
    let usernameInput = document.getElementById("usernameInput");
    if (usernameInput.value !== null && usernameInput.value.trim() !== "") {
        username = usernameInput.value;
    }


    // Display welcome message in a div

    let welcomeMessage = document.getElementById("usernamecontainer");
    welcomeMessage.innerHTML = "<p>Welcome to the quiz, " + username + ".</p>";

    // Activ the 1st question
    let nextQuestionElement = document.getElementById("question1");
    nextQuestionElement.classList.add("active");
}
//Load the next question and store the data

function nextQuestion() {
    storeAnswer();
    const activeQuestionElement = document.getElementById(
        `question${activeQuestion}`
    );
    activeQuestionElement.classList.remove("active");

    // Prevent going beyond the last question

    activeQuestion++;
    if (activeQuestion > 3) {
        activeQuestion = 3;
    }

    const nextQuestionElement = document.getElementById(
        `question${activeQuestion}`
    );
    nextQuestionElement.classList.add("active");
    getAnswer();
}
//Load the previous question and store the data

function previousQuestion() {
    storeAnswer();
    const activeQuestionElement = document.getElementById(
        `question${activeQuestion}`
    );
    activeQuestionElement.classList.remove("active");

    // Prevent going before the first question

    activeQuestion--;
    if (activeQuestion < 1) {
        activeQuestion = 1;
    }

    const previousQuestionElement = document.getElementById(
        `question${activeQuestion}`
    );
    previousQuestionElement.classList.add("active");
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
        q1: "west-indies",
        q2: "10",
        q3: "newzeland",
    };

    let scores = 0;
    let questionNumber = 1;

    for (const question in correctAnswers) {
        if (correctAnswers.hasOwnProperty(question)) {
            const imgElement = document.createElement("img");
            const labelElement = document.createElement("label");
            labelElement.innerHTML = `Question-${questionNumber}: ${userResponse[question]}`;

            imgElement.setAttribute(
                "src",
                userResponse[question] === correctAnswers[question] ? "assets/images/correct.png"
                    : "assets/images/incorrect.png"
            );
            labelElement.style.width = "90%";
            labelElement.style.height = "100%";

            imgElement.style.width = "10%";
            imgElement.style.height = "100%";

            

            const containerDiv = document.createElement("div");
            containerDiv.style.display = "flex";
            containerDiv.style.alignItems = "center";

            containerDiv.appendChild(labelElement);
            containerDiv.appendChild(imgElement);

            document.getElementById("imageDiv").appendChild(containerDiv);


            if (userResponse[question] === correctAnswers[question]) {
                scores++;
            }

            questionNumber++;
        }
    }

    const resultText = `You scored ${scores} out of 3`;
    document.getElementById("result-text").textContent = resultText;

    document.querySelectorAll(".question").forEach((question) => {
        question.style.display = "none";
    });

    document.getElementById("result").style.display = "block";
}


// Show the first question initially

document.getElementById("question1").classList.add("usernamecontainer");
