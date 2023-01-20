let countdown = document.getElementById("timer");
let startDiv = document.getElementById("start-screen");
let startButton = document.getElementById("start");
let questionDiv = document.getAnimations("questions");
let questionTitle = document.getElementById("question-title");
let questionChoices = document.getElementById("choices");
let quizEndDiv = document.getElementById("end-screen");
let finalScore = document.getElementById("final-score");
let scoreInitials = document.getElementById("initials");
let scoreSubmit = document.getElementById("submit");

// function to generate random number with the ability to exclude certain values.
// this is useful in this instance to avoid the same question being picked multiple times.
function randomExcept(min, max, exclude) {
  let randomX;
  while(!randomX) {
    const i = Math.floor(Math.random() * (max - min)) + min;
    if (exclude.indexOf(i) === -1) randomX = i;
  }
  return randomX;
};

// function to pick 5 random questions from the quizQuestions array.
// ensuring the 2nd to 5th questions are not the same as any of the preceding questions.
function pickQuestions(questions) {
  questions = [];
  questions[0] = quizQuestions[randomExcept(0, quizQuestions.length, [])];
  questions[1] = quizQuestions[randomExcept(0, quizQuestions.length, [(questions[0][0][1] - 1)])];
  questions[2] = quizQuestions[randomExcept(0, quizQuestions.length, [(questions[0][0][1] - 1), (questions[1][0][1] - 1)])];
  questions[3] = quizQuestions[randomExcept(0, quizQuestions.length, [(questions[0][0][1] - 1), (questions[1][0][1] - 1), (questions[2][0][1] - 1)])];
  questions[4] = quizQuestions[randomExcept(0, quizQuestions.length, [(questions[0][0][1] - 1), (questions[1][0][1] - 1), (questions[2][0][1] - 1), (questions[3][0][1] - 1)])];
  return questions;
};

// console log to check output of pickQuestions function
// console.log(pickQuestions());

// function used to quickly identify which question numbers were picked in the pickQuestions function.
// function checkForDuplicates(questions) {
//   questions = pickQuestions();
//   let questionNumbers = [];
//   for (let i = 0; i < questions.length; i++) {
//     questionNumbers[i] = questions[i][0][1];    
//   };
//   return questionNumbers
// };

// console log to check output of checkForDuplicates function.
// console.log(checkForDuplicates());

let pickedQuestions = pickQuestions();