// To specify that you’re using ES6 features in your code.
/* eslint-env es6 */
/* jshint esversion: 6 */
// To turn off the missing semicolon warning.
/* jshint -W033 */

// Variable to hold the current question number, username, and user's answers
let activeQuestion = 1;
let username = "Guest";
let userResponse = {};

// Define the start quiz function
function startQuiz() {
    // Get the username input element
    let usernameInput = document.getElementById("usernameInput");

    // Update the username if it's not empty or null
    if (usernameInput.value !== null && usernameInput.value.trim() !== "") {
        username = usernameInput.value;
    }

    // Display welcome message in a div
    let welcomeMessage = document.getElementById("usernamecontainer");
    welcomeMessage.innerHTML = "<p>Welcome to the quiz, " + username + ".</p>";

    // Activate the first question
    let nextQuestionElement = document.getElementById("question1");
    nextQuestionElement.classList.add("active");
}

// Load the next question and store the data
function nextQuestion() {
    storeAnswer();

    // Deactivate the current question
    const activeQuestionElement = document.getElementById(`question${activeQuestion}`);
    activeQuestionElement.classList.remove("active");

    // Prevent going beyond the last question
    activeQuestion++;
    if (activeQuestion > 8) {
        activeQuestion = 8;
    }

    // Activate the next question
    const nextQuestionElement = document.getElementById(`question${activeQuestion}`);
    nextQuestionElement.classList.add("active");
    getAnswer();
}

// Load the previous question and store the data
function previousQuestion() {
    storeAnswer();

    // Deactivate the current question
    const activeQuestionElement = document.getElementById(`question${activeQuestion}`);
    activeQuestionElement.classList.remove("active");

    // Prevent going before the first question
    activeQuestion--;
    if (activeQuestion < 1) {
        activeQuestion = 1;
    }

    // Activate the previous question
    const previousQuestionElement = document.getElementById(`question${activeQuestion}`);
    previousQuestionElement.classList.add("active");
    getAnswer();
}

// Function to store the user's answer
function storeAnswer() {
    const variants = document.getElementsByName(`q${activeQuestion}`);
    for (const variant of variants) {
        if (variant.checked) {
            userResponse[`q${activeQuestion}`] = variant.value;
            break;
        }
    }
}

// Function to display the user's selected answer
function getAnswer() {
    const chooseAnswer = userResponse[`q${activeQuestion}`];
    if (chooseAnswer) {
        const variants = document.getElementsByName(`q${activeQuestion}`);
        for (const variant of variants) {
            variant.checked = variant.value === chooseAnswer;
        }
    }
}

// Define the correct answers
function calculateScore() {
    storeAnswer();

    const correctAnswers = {
        q1: "west-indies",
        q2: "10",
        q3: "newzeland",
        q4: "australia",
        q5: "england",
        q6: "umpire",
        q7: "east-africa",
        q8: "bails",
    };

    let scores = 0;
    let questionNumber = 1;

    // Iterate through each question and compare user's response with correct answer
    for (const question in correctAnswers) {
        if (correctAnswers.hasOwnProperty(question)) {
            const imgElement = document.createElement("img");
            const labelElement = document.createElement("label");

            // Display user's anwered questions and relevent correct/wrong answer.
            labelElement.innerHTML = `Question-${questionNumber}: ${userResponse[question]}`;
            //Set the appropiate image correct/wrong, according to the user given answer
            imgElement.setAttribute(
                "src",
                userResponse[question] === correctAnswers[question] ? "assets/images/correct.png"
                    : "assets/images/incorrect.png"
            );

            // Style the elements for imageDiv
            labelElement.style.width = "90%";
            labelElement.style.height = "100%";
            imgElement.style.width = "10%";
            imgElement.style.height = "100%";

            // Create a container to hold the label and image all together
            const containerDiv = document.createElement("div");
            containerDiv.style.display = "flex";
            containerDiv.style.alignItems = "center";

            // Append label and image to the container
            containerDiv.appendChild(labelElement);
            containerDiv.appendChild(imgElement);

            // Append the container to the imageDiv
            document.getElementById("imageDiv").appendChild(containerDiv);

            // Increment scores if the answer is correct
            if (userResponse[question] === correctAnswers[question]) {
                scores++;
            }

            questionNumber++;
        }
    }

    // Display the result text
    const resultText = `You scored ${scores} out of 3`;
    document.getElementById("result-text").textContent = resultText;

    // Hide all questions and display the result container
    document.querySelectorAll(".question").forEach((question) => {
        question.style.display = "none";
    });
    document.getElementById("result").style.display = "block";
}

// Function to reset the quiz and start again
function startAgain() {
    // Reset active question, user responses, and hide the result container
    activeQuestion = 1;
    userResponse = {};
    // Navigate to the Start page
    window.location.href = 'index.html';
}

// Show the first question initially
document.getElementById("question1").classList.add("usernamecontainer");
