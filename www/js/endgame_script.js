var tempScore = window.sessionStorage.getItem('tempScore'); //Get current score from session storage
document.addEventListener("DOMContentLoaded", appStart)
function appStart()
{
    const scoreInfo = document.querySelector('.score');
    const newGameButton = document.querySelector('.button_new_game');
    const highscoresButton = document.querySelector('.button_highscores');
    const goButton = document.querySelector('.button_go');
    scoreInfo.innerHTML = "YOUR SCORE: " + tempScore;
    newGameButton.addEventListener('click', show_index, false);
    highscoresButton.addEventListener('click', show_highscores, false);
    goButton.addEventListener('click', saveCurrentScoreIfHighscore, false);    
}
function show_index()
{
    window.location.href = 'index.html';
}
function show_highscores()
{
    window.location.href = 'highscores.html';
}
function saveCurrentScoreIfHighscore()         //Save current nick and score to local storage
{   
    const inputNick = document.getElementById('input_nick');
    const inputNickValue = inputNick.value;
    const userScore =              //Create userScore object
    {
        nick: inputNickValue,
        score: tempScore
    };
    const existHighscoresString = window.localStorage.getItem("highscores");    //Get highscores file from local storage
    if (existHighscoresString)                                                  //If highscores file exist then do..
    {   
        const existHighscoresObject = JSON.parse(existHighscoresString);        //Parse highscores to object
        const sortedHighscores = sortHighscores(existHighscoresObject);         //Sort highscores
        if (sortedHighscores.length >= 10)
        {   
            let numScore = parseInt(userScore.score);
            let numLowestScore = parseInt(sortedHighscores[9].score);
            if (numScore <= numLowestScore)                                     //If current score is lower then lowest score do..
            {
                console.log("Score jest za maly");
            }
            else
            {
                sortedHighscores.push(userScore);                                       //Throw score to highscores
                const updatedSortedHighscores = sortHighscores(sortedHighscores);       //Sort highscores
                updatedSortedHighscores.splice(10,1);                                   //Remove 11 element of highscores
                const stringSplicedSortedH = JSON.stringify(updatedSortedHighscores);   //Stringify highscores
                window.localStorage.setItem("highscores", stringSplicedSortedH);        //Save highscores to local storage
            }    
        }
        else
        {
            sortedHighscores.push(userScore);                                       //Throw new user score to highscores array
            const updatedSortedHighscores = sortHighscores(sortedHighscores);       //Sort highscores                          
            const highscoresString = JSON.stringify(updatedSortedHighscores);       //Stringify updated highscores
            window.localStorage.setItem("highscores", highscoresString);         //Save updated hoghscores to local storage
        }
    }
    else                                                                    //If highscores file not exist then do..
    {   const highscoresArray = [];                                         //Create highscores Array
        highscoresArray.push(userScore);                                    //Throw userScore Object into Array
        const stringHighscoresArray = JSON.stringify(highscoresArray);      //Stringify highscores array
        window.localStorage.setItem("highscores", stringHighscoresArray);   //Save highscores to local storage
        //console.log(window.localStorage.getItem("highscores"));
    }
     console.log(JSON.parse(window.localStorage.getItem("highscores")));
}
function sortHighscores(hs)                                         //Throw highscores object in argument and return sorted highscores
{                    
    return (hs.sort(function (a,b){return b.score - a.score;}));
}