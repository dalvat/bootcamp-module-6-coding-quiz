// defines the element with ID 'highscores' in the 'highscores.html' file.
let highscoresList = document.getElementById('highscores');

// defines a global arrary to store the highscore.
let highscores = [];

// calls the init function.
init();

// the function populates and appends an <li> element within the highscoresList element.
// the function adds 3 parts to the <li> element - 'initials', 'score' and 'time'.
function renderHighscores() {
    let initials = highscores[0];
    let score = highscores[1];
    let time = highscores [2];
    let li = document.createElement('li');
    li.textContent = initials + ' - ' + score + ' points, with ' + time + ' seconds remaining.';
    highscoresList.appendChild(li);
};

// the function retrieves the 3 items stored in localStorage (if there is anything).
// the function adds each item as an element within the highscores array.
// the function calls the renderHighscores function.
function init() {
  let storedHighscore = localStorage.getItem('highscore');
  let storedInitials = localStorage.getItem('initials');
  let storedTime = localStorage.getItem('time-left');
  if (storedHighscore !== null || storedInitials !== null) {
    highscores[0] = storedInitials;
    highscores[1] = storedHighscore;
    highscores[2] = storedTime;
    renderHighscores();
  };
};