var tempScore = window.sessionStorage.getItem('tempScore'); //Get current score from session storage
document.addEventListener("DOMContentLoaded", appStart)
function appStart()
{
    const scoreInfo = document.querySelector('.score');
    const newGameButton = document.querySelector('.button_new_game');
    const highscoresButton = document.querySelector('.button_highscores');
    const goButton = document.querySelector('.button_go');
    scoreInfo.innerHTML = "SCORE: " + tempScore;
    newGameButton.addEventListener('click', show_index, false);
    highscoresButton.addEventListener('click', show_highscores, false);
    goButton.addEventListener('click', saveCurrentScore, false);    
}
function show_index()
{
    window.location.href = 'index.html';
}
function show_highscores()
{
    window.location.href = 'highscores.html';
}
function saveCurrentScore()         //Save current nick and score to local storage
{   
    const inputNick = document.getElementById('input_nick');
    const inputNickValue = inputNick.value;
    const userScore =              //Create userScore object
    {
        nick: inputNickValue,
        score: tempScore
    };
    const existHighscoresString = window.localStorage.getItem("highscores");
    if (existHighscoresString)
    {   
        const existHighscoresObject = JSON.parse(existHighscoresString);
        existHighscoresObject.push(userScore);
        const newHighscoresString = JSON.stringify(existHighscoresObject);
        window.localStorage.setItem("highscores", newHighscoresString);
        
        console.log(window.localStorage.getItem("highscores"));
    }
    else
    {   const highscoresArray = [];           //Create highScroes Array
        highscoresArray.push(userScore);         // Throw userScore Object into Array
        const stringHighscoresArray = JSON.stringify(highscoresArray);
        window.localStorage.setItem("highscores", stringHighscoresArray);
        console.log(window.localStorage.getItem("highscores"));
    }
}