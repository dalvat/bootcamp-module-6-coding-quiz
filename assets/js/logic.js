let countdown = document.getElementById('timer');
let startDiv = document.getElementById('start-screen');
let startButton = document.getElementById('start');
let questionDiv = document.getElementById('questions');
let questionTitle = document.getElementById('question-title');
let questionChoices = document.getElementById('choices');
let quizEndDiv = document.getElementById('end-screen');
let finalScore = document.getElementById('final-score');
let scoreInitials = document.getElementById('initials');
let scoreSubmit = document.getElementById('submit');

let correctAnswers = 0;
let wrongAnswers = 0;

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

function questionParts(number) {
  let question = pickedQuestions[number][0][0];
  let choice1 = pickedQuestions[number][1];
  let choice2 = pickedQuestions[number][2];
  let choice3 = pickedQuestions[number][3];
  let choice4 = pickedQuestions[number][4];
  let parts = [question, choice1, choice2, choice3, choice4]
  return parts
};

question1 = questionParts(0);
question2 = questionParts(1);
question3 = questionParts(2);
question4 = questionParts(3);
question5 = questionParts(4);

let allQuestions = [question1, question2, question3, question4, question5]
// console log
// console.log(question1, question2, question3, question4, question5);

startButton.addEventListener('click', function() {
  startDiv.className = 'hide';
  questionDiv.className = 'questions';
  questionTitle.textContent = question1[0];
  let choicesList = document.createElement('ol');
  choicesList.id = 'choices-list'
  let li1 = document.createElement('li');
  let li2 = document.createElement('li');
  let li3 = document.createElement('li');
  let li4 = document.createElement('li');
  let item1 = document.createElement('button');
  let item2 = document.createElement('button');
  let item3 = document.createElement('button');
  let item4 = document.createElement('button');
  item1.textContent = question1[1][0];
  item2.textContent = question1[2][0];
  item3.textContent = question1[3][0];
  item4.textContent = question1[4][0];
  item1.setAttribute('isRight', question1[1][1])
  item2.setAttribute('isRight', question1[2][1])
  item3.setAttribute('isRight', question1[3][1])
  item4.setAttribute('isRight', question1[4][1])
  item1.id = 'li1'
  item2.id = 'li2'
  item3.id = 'li3'
  item4.id = 'li4'
  questionChoices.appendChild(choicesList);
  choicesList.appendChild(li1);
  choicesList.appendChild(li2);
  choicesList.appendChild(li3);
  choicesList.appendChild(li4);
  li1.appendChild(item1);
  li2.appendChild(item2);
  li3.appendChild(item3);
  li4.appendChild(item4);
});

let questionsComplete = 0;

questionChoices.addEventListener("click", function(event) {
  let element = event.target;
  choicesList = document.getElementById('choices-list')
  if (element.matches('button')) {
    if (questionsComplete < 4) {
      questionsComplete++;
      let isTrue = element.getAttribute('isRight');
      let correct = document.createElement("p")
      if (isTrue === 'true') {
        correct.textContent = 'Correct! +10 points';
        correctAnswers++;
      } else {
        correct.textContent = 'Wrong! -5 points';
        wrongAnswers++;
      };
      choicesList.appendChild(correct);
      setTimeout(function() {
        choicesList.removeChild(correct);
        nextQuestion();
      }, 1000);
    } else if (questionsComplete === 4) {
      questionsComplete++;
      let isTrue = element.getAttribute('isRight');
      let correct = document.createElement("p")
      if (isTrue === 'true') {
        correct.textContent = 'Correct! +10 points';
        correctAnswers++;
      } else {
        correct.textContent = 'Wrong! -5 points';
        wrongAnswers++;
      };
      choicesList.appendChild(correct);
      setTimeout(function() {
        choicesList.removeChild(correct);
        endScreen();
      }, 1000);
    };
  };
});

function nextQuestion() {
  let li1 = document.getElementById('li1');
  let li2 = document.getElementById('li2');
  let li3 = document.getElementById('li3');
  let li4 = document.getElementById('li4');
  questionTitle.textContent = allQuestions[questionsComplete][0];
  li1.textContent = allQuestions[questionsComplete][1][0];
  li2.textContent = allQuestions[questionsComplete][2][0];
  li3.textContent = allQuestions[questionsComplete][3][0];
  li4.textContent = allQuestions[questionsComplete][4][0];
};

function endScreen() {
  questionDiv.className = 'hide';
  quizEndDiv.className = '';
  finalScore.textContent = (correctAnswers * 10) - (wrongAnswers * 5);
}