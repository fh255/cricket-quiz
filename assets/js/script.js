js-beautify
(v1.14.11)
Beautify JavaScript, JSON, React.js, HTML, CSS, SCSS, and SASS

Enable Dark Mode

Beautify JavaScript
Beautify Code (cmd-enter)

Copy to Clipboard
 
Select All
 
Clear
 No file chosen
Options

Indent with 4 spaces

Allow 5 newlines between tokens

Do not wrap lines

Braces with control statement
HTML <style>, <script> formatting:


Add one indent level
  End script and style with newline?
Support e4x/jsx syntax
Use comma-first list style?
Detect packers and obfuscators? (unsafe)
Preserve inline braces/code blocks?
Keep array indentation?
Break lines on chained methods?
Space before conditional: "if(x)" / "if (x)"
Unescape printable chars encoded as \xNN or \uNNNN?
Use JSLint-happy formatting tweaks?
Indent <head> and <body> sections?
Keep indentation on empty lines?
Use a simple textarea for code input?
Additional Settings (JSON):

{}
Your Selected Options (JSON):

{
  "indent_size": "4",
  "indent_char": " ",
  "max_preserve_newlines": "5",
  "preserve_newlines": true,
  "keep_array_indentation": false,
  "break_chained_methods": false,
  "indent_scripts": "normal",
  "brace_style": "collapse",
  "space_before_conditional": true,
  "unescape_strings": false,
  "jslint_happy": false,
  "end_with_newline": false,
  "wrap_line_length": "0",
  "indent_inner_html": false,
  "comma_first": false,
  "e4x": false,
  "indent_empty_lines": false
}
Created by Einar Lielmanis, maintained and evolved by Liam Newman.

All of the source code is completely free and open, available on GitHub under MIT licence, and we have a command-line version, python library and a node package as well.

We use the wonderful CodeMirror syntax highlighting editor, written by Marijn Haverbeke.

Made with a great help of many contributors. Special thanks to:
Jason Diamond, Patrick Hof, Nochum Sossonko, Andreas Schneider, Dave Vasilevsky, Vital Batmanov, Ron Baldwin, Gabriel Harrison, Chris J. Shull, Mathias Bynens, Vittorio Gambaletta, Stefano Sanfilippo and Daniel Stockman.

  @import url('https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&display=swap');
  body {
      font - family: 'Hedvig Letters Serif', serif;
      text - align: center;
      align - items: center;
      justify - content: center;
  }

  /* Logo and Hearder*/
  .logo {

      font - size: 30 px;
  }
  a {
      text - decoration: none;
      color: inherit;
  }
  .pic {
      height: 70 px;
  }

  form {
      display: flex;
      flex - direction: column;
      align - items: center;
  }

  .user - container {
      display: flex;
      flex - direction: column;
      align - items: center;
      justify - content: center;
      max - width: 450 px;
      padding: 20 px;
      margin: auto;
      top: 50 % ;
      left: 50 % ;
  }


  input {
      padding: 8 px;
      margin - bottom: 15 px;
  }

  .username {
      padding: 20 px;
  }

  .hidden {
      display: none;
  }



  .container {
      max - width: 370 px;
      width: 100 % ;
      padding: 20 px;
      margin: auto;
      display: flex;
      flex - direction: column;
      align - items: center;
      justify - content: center;
  }

  .question {
      display: none;
  }

  .active {
      display: block;
  }

  form {
      display: flex;
      flex - direction: column;
      align - items: center;
  }
  label {
      display: flex;
      margin - top: 10 px;
  }

  button {
      padding: 8 px;
      font - size: 20 px;
      cursor: pointer;
      background - color: #5ca5ef;
      color: # fff;
      border - radius: 5 px;
  }
  .result {
      height: 350 px;
  }

  #imageDiv {
      height: 280 px;
      width: 200 px;
      display: flex;
      flex - direction: column;
  }
1
// To specify that you’re using ES6 features in your code.
2
/* eslint-env es6 */
3
/* jshint esversion: 6 */
4
// To turn off the missing semicolon warning.
5
/* jshint -W033 */
6
​
7
// Variable to hold the current question number, username, and user's answers
8
let activeQuestion = 1;
9
let username = "Guest";
10
let userResponse = {};
11
​
12
// Define the start quiz function
13
function startQuiz() {
14
    // Get the username input element
15
    let usernameInput = document.getElementById("usernameInput");
16
​
17
    // Update the username if it's not empty or null
18
    if (usernameInput.value !== null && usernameInput.value.trim() !== "") {
19
        username = usernameInput.value;
20
    }
21
​
22
    // Display welcome message in a div
23
    let welcomeMessage = document.getElementById("usernamecontainer");
24
    welcomeMessage.innerHTML = "<p>Welcome to the quiz, " + username + ".</p>";
25
​
26
    // Activate the first question
27
    let nextQuestionElement = document.getElementById("question1");
28
    nextQuestionElement.classList.add("active");
29
}
30
​
31
// Load the next question and store the data
32
function nextQuestion() {
33
    storeAnswer();
34
​
35
    // Deactivate the current question
36
    const activeQuestionElement = document.getElementById(`question${activeQuestion}`);
37
    activeQuestionElement.classList.remove("active");
38
​
39
    // Prevent going beyond the last question
40
    activeQuestion++;
41
    if (activeQuestion > 8) {
42
        activeQuestion = 8;
43
    }
44
​
45
    // Activate the next question
46
    const nextQuestionElement = document.getElementById(`question${activeQuestion}`);
47
    nextQuestionElement.classList.add("active");
48
    getAnswer();
49
}
50
​
51
// Load the previous question and store the data
52
function previousQuestion() {
53
    storeAnswer();
54
​
55
    // Deactivate the current question
56
    const activeQuestionElement = document.getElementById(`question${activeQuestion}`);
57
    activeQuestionElement.classList.remove("active");
58
​
59
    // Prevent going before the first question
60
    activeQuestion--;
61
    if (activeQuestion < 1) {
62
        activeQuestion = 1;
63
    }
64
​
65
    // Activate the previous question
66
    const previousQuestionElement = document.getElementById(`question${activeQuestion}`);
67
    previousQuestionElement.classList.add("active");
68
    getAnswer();
69
}
70
​
71
// Function to store the user's answer
72
function storeAnswer() {
73
    const variants = document.getElementsByName(`q${activeQuestion}`);
74
    for (const variant of variants) {
75
        if (variant.checked) {
76
            userResponse[`q${activeQuestion}`] = variant.value;
77
            break;
78
        }
79
    }
80
}
81
​
82
// Function to display the user's selected answer
83
function getAnswer() {
84
    const chooseAnswer = userResponse[`q${activeQuestion}`];
85
    if (chooseAnswer) {
86
        const variants = document.getElementsByName(`q${activeQuestion}`);
87
        for (const variant of variants) {
88
            variant.checked = variant.value === chooseAnswer;
89
        }
90
    }
91
}
92
​
93
// Define the correct answers
94
function calculateScore() {
95
    storeAnswer();
96
​
97
    const correctAnswers = {
98
        q1: "west-indies",
99
        q2: "10",
100
        q3: "newzeland",
101
        q4: "australia",
102
        q5: "england",
103
        q6: "umpire",
104
        q7: "east-africa",
105
        q8: "bails",
106
    };
107
​
108
    let scores = 0;
109
    let questionNumber = 1;
110
​
111
    // Iterate through each question and compare user's response with correct answer
112
    for (const question in correctAnswers) {
113
        if (correctAnswers.hasOwnProperty(question)) {
114
            const imgElement = document.createElement("img");
115
            const labelElement = document.createElement("label");
116
​
117
            // Display user's anwered questions and relevent correct/wrong answer.
118
            labelElement.innerHTML = `Question-${questionNumber}: ${userResponse[question]}`;
119
            //Set the appropiate image correct/wrong, according to the user given answer
120
            imgElement.setAttribute(
121
                "src",
122
                userResponse[question] === correctAnswers[question] ? "assets/images/correct.png" :
123
                "assets/images/incorrect.png"
124
            );
125
​
126
            // Style the elements for imageDiv
127
            labelElement.style.width = "90%";
128
            labelElement.style.height = "100%";
129
            imgElement.style.width = "10%";
130
            imgElement.style.height = "100%";
131
​
132
            // Create a container to hold the label and image all together
133
            const containerDiv = document.createElement("div");
134
            containerDiv.style.display = "flex";
135
            containerDiv.style.alignItems = "center";
136
​
137
            // Append label and image to the container
138
            containerDiv.appendChild(labelElement);
139
            containerDiv.appendChild(imgElement);
140
​
141
            // Append the container to the imageDiv
142
            document.getElementById("imageDiv").appendChild(containerDiv);
143
​
144
            // Increment scores if the answer is correct
145
            if (userResponse[question] === correctAnswers[question]) {
146
                scores++;
147
            }
148
​
149
            questionNumber++;
150
        }
151
    }
152
​
153
    // Display the result text
154
    const resultText = `You scored ${scores} out of 3`;
155
    document.getElementById("result-text").textContent = resultText;
156
​
157
    // Hide all questions and display the result container
158
    document.querySelectorAll(".question").forEach((question) => {
159
        question.style.display = "none";
160
    });
161
    document.getElementById("result").style.display = "block";
162
}
163
​
164
// Function to reset the quiz and start again
165
function startAgain() {
166
    // Reset active question, user responses, and hide the result container
167
    activeQuestion = 1;
168
    userResponse = {};
169
    // Navigate to the Start page
170
    window.location.href = 'index.html';
171
}
172
​
173
// Show the first question initially
174
document.getElementById("question1").classList.add("usernamecontainer");
