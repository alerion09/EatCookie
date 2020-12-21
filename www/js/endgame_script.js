document.addEventListener("DOMContentLoaded", appStart)
function appStart()
{
    const tempScore = window.sessionStorage.getItem('tempScore')
    const scoreInfo = document.querySelector('.score');
    const newGameButton = document.querySelector('.button_new_game');
    const highscoresButton = document.querySelector('.button_highscores')
    scoreInfo.innerHTML = "SCORE: " + tempScore;
    newGameButton.addEventListener('click', show_index, false);
    highscoresButton.addEventListener('click', show_highscores, false);
    
}
function show_index()
{
    window.location.href = 'index.html';
}
function show_highscores()
{
    window.location.href = 'highscores.html';
}