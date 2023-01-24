let countdown = document.getElementById('time');
let timerDiv = document.getElementById('timer')
let startDiv = document.getElementById('start-screen');
let startButton = document.getElementById('start');
let questionDiv = document.getElementById('questions');
let questionTitle = document.getElementById('question-title');
let questionChoices = document.getElementById('choices');
let quizEndDiv = document.getElementById('end-screen');
let endTitle = document.getElementById('end-title');
let endMessage = document.getElementById('end-message');
let endInput = document.getElementById('end-input');
let finalScore = document.getElementById('final-score');
let scoreInitials = document.getElementById('initials');
let scoreSubmit = document.getElementById('submit');
let choicesList = document.getElementById('choices-list');
let li1 = document.getElementById('li1');
let li2 = document.getElementById('li2');
let li3 = document.getElementById('li3');
let li4 = document.getElementById('li4');

let correctAnswers = 0;
let wrongAnswers = 0;
let timeLeft = 29;
let timePenalty = false;

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

// define global array to store the picked questions.
let pickedQuestions = pickQuestions();

// function to split picked questions into separate arrays.
function questionParts(number) {
  let question = pickedQuestions[number][0][0];
  let choice1 = pickedQuestions[number][1];
  let choice2 = pickedQuestions[number][2];
  let choice3 = pickedQuestions[number][3];
  let choice4 = pickedQuestions[number][4];
  let parts = [question, choice1, choice2, choice3, choice4]
  return parts
};

// define global array for each of the 5 picked questions.
question1 = questionParts(0);
question2 = questionParts(1);
question3 = questionParts(2);
question4 = questionParts(3);
question5 = questionParts(4);

// define global array for all picked questions including only the parts needed for subsequent code.
let allQuestions = [question1, question2, question3, question4, question5];

// event listener for start button to initiate quiz.
// the functions sets the question title element to show the first question from the all questions array.
// the function creates <li> elements and a <button> element within each <li> element for each answer
// the funciton allocates unique IDs to each <button> and creates attribute to show which answer isRight.
// the function adds the textContent of the 4 answers to each of the 4 <button> elements.
// the function appends each <button> element to the corresponding <li> element.
// the function appends each <li> item to the choicesList <ol> element.
// the function starts the timer running.
startButton.addEventListener('click', function() {
  startDiv.className = 'hide';
  questionDiv.className = 'questions';
  questionTitle.textContent = question1[0];
  let choicesList = document.createElement('ol');
  choicesList.id = 'choices-list';
  let li1 = document.createElement('li');
  let li2 = document.createElement('li');
  let li3 = document.createElement('li');
  let li4 = document.createElement('li');
  let item1 = document.createElement('button');
  let item2 = document.createElement('button');
  let item3 = document.createElement('button');
  let item4 = document.createElement('button');
  item1.id = 'li1';
  item2.id = 'li2';
  item3.id = 'li3';
  item4.id = 'li4';
  item1.textContent = question1[1][0];
  item2.textContent = question1[2][0];
  item3.textContent = question1[3][0];
  item4.textContent = question1[4][0];
  item1.setAttribute('isRight', question1[1][1]);
  item2.setAttribute('isRight', question1[2][1]);
  item3.setAttribute('isRight', question1[3][1]);
  item4.setAttribute('isRight', question1[4][1]);
  questionChoices.appendChild(choicesList);
  choicesList.appendChild(li1);
  choicesList.appendChild(li2);
  choicesList.appendChild(li3);
  choicesList.appendChild(li4);
  li1.appendChild(item1);
  li2.appendChild(item2);
  li3.appendChild(item3);
  li4.appendChild(item4);
  startTimer();
});

// the function uses the timeLeft variable to start a timer at 30 seconds and count down to '0'.
// if the questionDiv class is changed to 'hide', then the timer is stopped. This allows the time remaining to be stored to the highscores.
// if timeLeft is greater than '0' then the counter continues to count down.
// if the timer reaches '0' and the questionDiv class is not 'hide', i.e. the quiz is not completed, this initiates the playerLost function.
function startTimer(timer) {
  timerDiv.className = "timer";
  countdown.textContent = "30";
  timer = setInterval(function() {
    if (questionDiv.className === 'hide') {
      clearInterval(timer);
    } else if (timeLeft > 0) {
      countdown.textContent = timeLeft;
      timeLeft--;
    } else if (timeLeft === 0) {
      countdown.textContent = "0";
      playerLost();
      clearInterval(timer);
    };
  }, 1000);
};

// define global array to store a count of how many questions have been answered.
let questionsComplete = 0;

// event listener for questionChoices <div> for when any answer button is clicked.
// if the element click is of type <button> and the number of questions answered is less than 4 the questionsComplete variable is incremented by '1'.
// if the clicked answer button's isRight attribute is 'true' then the message is displayed and correctAnswers is incremented by '1'.
// else (if isRight is 'false') the message is displayed, wrongAnswers is incremented by 1 and '5' is taken off of the timeLeft variable.
// either message is displayed by adding a new <li> item at the bottom of the ordered list and this disappears after 1 second.
// the nextQuestion function is then called.
// if questionsComplete variable equals '4' then this is the last (fifth) question and after the answer is chosen the endScreen function is called.
questionChoices.addEventListener("click", function(event) {
  let element = event.target;
  choicesList = document.getElementById('choices-list')
  if (element.matches('button')) {
    if (questionsComplete < 4) {
      questionsComplete++;
      let isTrue = element.getAttribute('isRight');
      let correct = document.createElement("p");
      if (isTrue === 'true') {
        correct.textContent = 'Correct! + 10 points';
        correctAnswers++;
      } else {
        correct.textContent = 'Wrong! - 5 seconds and - 5 points';
        wrongAnswers++;
        timeLeft = (timeLeft - 5);
      };
      choicesList.appendChild(correct);
      setTimeout(function() {
        choicesList.removeChild(correct);
        nextQuestion();
      }, 1000);
    } else if (questionsComplete === 4) {
      questionsComplete++;
      let isTrue = element.getAttribute('isRight');
      let correct = document.createElement("p");
      if (isTrue === 'true') {
        correct.textContent = 'Correct! + 10 points';
        correctAnswers++;
      } else {
        correct.textContent = 'Wrong! - 5 seconds and - 5 points';
        wrongAnswers++;
        timeLeft = (timeLeft - 5);
      };
      choicesList.appendChild(correct);
      setTimeout(function() {
        choicesList.removeChild(correct);
        endScreen();
      }, 1000);
    };
  };
});

// the function updates the textContent of the questionTitle with the subsequent question from the allQuestions array.
// the function updates the textContent and isRight attribute of each of the <li> <button> elements from the same array.
function nextQuestion() {
  questionTitle.textContent = allQuestions[questionsComplete][0];
  let li1 = document.getElementById('li1');
  let li2 = document.getElementById('li2');
  let li3 = document.getElementById('li3');
  let li4 = document.getElementById('li4');
  li1.setAttribute('isRight', allQuestions[questionsComplete][1][1]);
  li2.setAttribute('isRight', allQuestions[questionsComplete][2][1]);
  li3.setAttribute('isRight', allQuestions[questionsComplete][3][1]);
  li4.setAttribute('isRight', allQuestions[questionsComplete][4][1]);
  li1.textContent = allQuestions[questionsComplete][1][0];
  li2.textContent = allQuestions[questionsComplete][2][0];
  li3.textContent = allQuestions[questionsComplete][3][0];
  li4.textContent = allQuestions[questionsComplete][4][0];
};

// the function calculates the score using the correctAnswers and wrongAnswers variables.
// as shown above each correct answer is worth +10 points, each wrong answer is worth -5 points.
function calculateScore() {
calculate = (correctAnswers * 10) - (wrongAnswers * 5);
return calculate;
};

// the function hides the questionDiv and unhides the quizEndDiv.
// the function displays adds the score from the calculateScore function to the textContent of the finalScore element.
// the function appends a retry message and button incase the user wants to try the quiz again.
function endScreen() {
  questionDiv.className = 'hide';
  quizEndDiv.className = '';
  calculateScore();
  finalScore.textContent = calculateScore();
  let retryMessage = document.createElement('p');
  let retryLink = document.createElement('a');
  let retryButton = document.createElement('button');
  retryMessage.textContent = 'Click retry if you want to start again.';
  retryLink.setAttribute('href', 'retry.html');
  retryButton.textContent = "Retry";
  quizEndDiv.appendChild(retryMessage);
  quizEndDiv.appendChild(retryLink);
  retryLink.appendChild(retryButton);
};

// the function hides the questionDiv and unhides the quizEndDiv.
// the function hides all of the usual parts of the quizEndDiv.
// the function instead appends 3 new elemnts (<h2>, <p> and <a>) to show the user lost and asks if they want to retry the quiz.
function playerLost() {
  questionDiv.className = 'hide';
  endInput.className = 'hide';
  timerDiv.className = 'hide';
  endTitle.className = 'hide';
  endMessage.className = 'hide';
  quizEndDiv.className = '';
  let lostTitle = document.createElement('h2');
  let lostMessage = document.createElement('p');
  let retryLink = document.createElement('a');
  let retryButton = document.createElement('button');
  lostTitle.textContent = 'You ran out of time!';
  lostMessage.textContent = 'Click retry to start again.';
  retryLink.setAttribute('href', 'retry.html');
  retryButton.textContent = "Retry";
  quizEndDiv.appendChild(lostTitle);
  quizEndDiv.appendChild(lostMessage);
  quizEndDiv.appendChild(retryLink);
  retryLink.appendChild(retryButton);
};

// event listener for when the submit <button> is clicked.
// the function calls the storeHighScores functions and resets the input field.
scoreSubmit.addEventListener("click", function(event) {
  storeHighscoreList();
  scoreInitials.value = '';
});

// the function gets the 'initials' value from the above event listener.
// the function gets the score from the calculateScore function.
// the function gets the timeRemaining from the timeLeft variable.
// all 3 items are stored in localStorage to be used in the 'highscores.html' file.
function storeHighscoreList() {
  initials = scoreInitials.value;
  score = calculateScore();
  timeRemaining = timeLeft;
  localStorage.setItem('highscore', score);
  localStorage.setItem('initials', initials);
  localStorage.setItem('time-left', timeRemaining);
};