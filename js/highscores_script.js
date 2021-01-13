document.addEventListener("DOMContentLoaded", appStart)
function appStart()
{   
    screen.orientation.lock('portrait');
    const newGameButton = document.querySelector('.button_new_game');
    newGameButton.addEventListener('click', show_index, false);
    createHighScoresTable();
}
function show_index()
{
    document.location.href = 'index.html';
}
function createHighScoresTable()
{
    const highScoresTbody = document.querySelector('.highScores_tbody');
    const objHighScores = JSON.parse(window.localStorage.getItem('highscores'));
    let i;
    for (i = 0; objHighScores.length != i; i++)
    {
        highScoresTbody.innerHTML+= `<tr><td>${objHighScores[i].nick}</td><td>${objHighScores[i].score}</td></tr>`;
    }
}