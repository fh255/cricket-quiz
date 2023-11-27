/* eslint-env es6 */
/* jshint esversion: 6 */

let activeQuestion = 1; // Variable to hold the current question number
let username = "Guest"; // Variable to hold the username, initialized with a default value
const userResponse = {}; // Object to store user responses for each question
// Define the function to start the quiz
function startQuiz() {
    let usernameInput = document.getElementById("usernameInput");  // Get the username input element
    // Check if the input element exists
    if(usernameInput != null) {
        username = usernameInput.value; // Update the global username variable with the user's input
        }
    // Display a welcome message with the username
    let welcomeMessage = document.getElementById("usernamecontainer");
    welcomeMessage.innerHTML = "<p>Welcome to the quiz, " + username + ".</p>";

    // Activ the 1st question
    let nextQuestionElement = document.getElementById("question1");
    nextQuestionElement.classList.add("active");
}
// Function to load the next question and store the data
function nextQuestion() {
    storeAnswer();
    // Deactivate the current question
    const activeQuestionElement = document.getElementById(
        `question${activeQuestion}`
    );
    activeQuestionElement.classList.remove("active");

    // Prevent going beyond the last question
    activeQuestion++;
    if (activeQuestion > 3) {
        activeQuestion = 3;
    }
//Activated the next question
    const nextQuestionElement = document.getElementById(
        `question${activeQuestion}`
    );
    nextQuestionElement.classList.add("active");
    getAnswer();
}
//Function to load the previous question and store the data
function previousQuestion() {
    storeAnswer();
    // Deactivate the current question
    const activeQuestionElement = document.getElementById(
        `question${activeQuestion}`
    );
    activeQuestionElement.classList.remove("active");

    // Prevent going before the first question

    activeQuestion--;
    if (activeQuestion < 1) {
        activeQuestion = 1;
    }
// Activated the previous question
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
            // Store the selected variant's value in the userResponse object
            userResponse[`q${activeQuestion}`] = variant.value;
            break;
        }
    }
}
// Function to retrieve and display the user's answer

function getAnswer() {
    const chooseAnswer = userResponse[`q${activeQuestion}`];
    if (chooseAnswer) {
        const variants = document.getElementsByName(`q${activeQuestion}`);
        for (const variant of variants) {
            // Check the radio button corresponding to the user's stored answer
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
 // Initialize variables to track scores and question numbers
    let scores = 0;
    let questionNumber = 1;
// Iterate through correct answers and compare with user responses
    for (const question in correctAnswers) {
        if (correctAnswers.hasOwnProperty(question)) {
// Create image and label elements to display correctness
            const imgElement = document.createElement("img");
            const labelElement = document.createElement("label");
            labelElement.innerHTML = `${questionNumber}${userResponse[question]}`;
 // Set image source based on correctness
            imgElement.setAttribute(
                "src",
                userResponse[question] === correctAnswers[question] ? "assets/images/correct.png"
                    : "assets/images/incorrect.png"
            );
// Set image styles
            imgElement.style.width = "100%";
            imgElement.style.height = "100%";
 // Create a container div to hold label and image
            const containerDiv = document.createElement("div");
            containerDiv.style.display = "flex";
            containerDiv.style.alignItems = "center";
 // Append label and image to the container
            containerDiv.appendChild(labelElement);
            containerDiv.appendChild(imgElement);
// Append the container to the imageDiv
            document.getElementById("imageDiv").appendChild(containerDiv);
// Update scores based on correctness
            if (userResponse[question] === correctAnswers[question]) {
                scores++;
            }
// Increment the question number
            questionNumber++;
        }
    }
// Display the quiz results and scores
    const resultText = `You scored ${scores} out of 3`;
    document.getElementById("result-text").textContent = resultText;
// Hide all questions and display the result container
    document.querySelectorAll(".question").forEach((question) => {
        question.style.display = "none";
    });
// Show the first question initially
    document.getElementById("result").style.display = "block";
}

// Function to start the quiz again
function startAgain() {
    // Reset the username input field
    document.getElementById("usernameInput").value = "";

    // Hide the result container and show the first question
    document.getElementById("result").style.display = "none";
    document.querySelectorAll(".question").forEach((question) => {
        question.style.display = "none";
    });
    document.getElementById("question1").style.display = "block";
}


// Show the first question initially

document.getElementById("question1").classList.add("usernamecontainer");
