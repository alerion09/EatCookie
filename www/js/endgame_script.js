var tempScore = window.sessionStorage.getItem('tempScore'); //Get current score from session storage
document.addEventListener("DOMContentLoaded", appStart)
function appStart()
{   
    screen.orientation.lock('portrait');
    const scoreInfo = document.querySelector('.score');
    const newGameButton = document.querySelector('.button_new_game');
    const highscoresButton = document.querySelector('.button_highscores');
    scoreInfo.innerHTML = "YOUR SCORE: " + tempScore;
    newGameButton.addEventListener('click', show_index, false);
    highscoresButton.addEventListener('click', show_highscores, false);
    checkIfGetHighscore();    
}
function show_index()
{
    window.location.href = 'index.html';
}
function show_highscores()
{
    window.location.href = 'highscores.html';
}
function checkIfGetHighscore()
{
    const existHighscoresString = window.localStorage.getItem("highscores");
    const goButton = document.querySelector('.button_go');
    const inputNick = document.getElementById('input_nick');
    const divContainer = document.querySelector('.container');
    const sectionNick = document.querySelector('.section_nick');
    let numScore = parseInt(tempScore);
    if (numScore === 0)                                             //(A) If score equal '0' then disable button and input field
    {
        goButton.disabled = true;
        inputNick.disabled = true;
        divContainer.removeChild(sectionNick);
    }
    else if (existHighscoresString == null && numScore !== 0)       //(A) If highscores don't exist and score not equal '0' and 
    {                                                               //when click 'Go' button then 
        goButton.addEventListener('click', function(){
            const inputNickValue = inputNick.value;                 //Get input nick name
            const player = new Score (inputNickValue, tempScore);   //Create new Score object 'player'
            player.createHighscores();                              //Use Score method to create highscores file
            player.pushScoreToHighScores(player);                   //Use Score method to throw current score in to highscores file
            show_highscores();                   
        }, false);
    }
    else                                                                    //(A) If score is not equal 0 and highscores file already exist then
    {
        const existHighscoresObject = JSON.parse(existHighscoresString);        //Parse highscores to object
        if (existHighscoresObject.length >= 10)                                  //(B) If highscores array has already 10 records then
        {
            let numLowestScore = parseInt(existHighscoresObject[9].score);
            if (numScore <= numLowestScore)                                  //(C) If current score is lower then lowest high score then
            {                                                                // disable 'Go' button and input field
                goButton.disabled = true;
                inputNick.disabled = true;
                divContainer.removeChild(sectionNick);
            }
            else                                                                //(C) If highscore has 10 records and current score is 
            {                                                                   // higher then lowest score then
                goButton.addEventListener('click', function(){
                    const inputNickValue = inputNick.value;
                    const player = new Score (inputNickValue, tempScore);                   //Create new Score object 'player'
                    player.pushScoreToHighScores(player);                                   //Use Score method to throw current score in to highscores file
                    player.sortHighScores();                                                //Use Score method to sort highscores file
                    player.removeLastScore();
                    show_highscores();                                               //Use Score method to remove highscores last record 
                },false);
            }
        }
        else                                                                                    //(B) If highscore has less then 10 records and
        {                                                                                       // click 'Go' button then 
            goButton.addEventListener('click', function(){
                const inputNickValue = inputNick.value;                                         
                const player = new Score (inputNickValue, tempScore);                           // create Score object 'player'
                player.pushScoreToHighScores(player);                                           // use Score method to throw current score in to highscores file
                player.sortHighScores();
                show_highscores();                                                        // use Score method to sort highscores
            }, false);
        }
    }
}
class Score 
{
    constructor (nick, score)
    {
        this.nick = nick;
        this.score = score;
    }
    createHighscores()                                                          // Method - Create empty array and save to local storage 
    {                                                                           // under the name 'highscores'
        const highscoresArray = [];                                         
        const stringHighscoresArray = JSON.stringify(highscoresArray);      
        window.localStorage.setItem("highscores", stringHighscoresArray);
    }
    pushScoreToHighScores(obj)                                                              // Method - get 'highscores' and push current score to them
    {                                                                                       // then save 'highscores' to local storage
        const objHighScores = JSON.parse(window.localStorage.getItem("highscores"));
        objHighScores.push(obj);
        const stringHighScores = JSON.stringify(objHighScores);
        window.localStorage.setItem("highscores", stringHighScores);
    }
    sortHighScores()                                                                             // Method - get 'highscores' and sort, then save 
    {                                                                                            // 'highscores' to local storage
        const objHighScores = JSON.parse(window.localStorage.getItem("highscores"));    
        const sortedHighScores = objHighScores.sort(function (a,b){return b.score - a.score;});
        const stringSortedHighScores = JSON.stringify(sortedHighScores);
        window.localStorage.setItem("highscores", stringSortedHighScores);
    }
    removeLastScore()                                                                               // Method - get 'highscores' and remove last score
    {                                                                                               // then save 'highscores' to local storage
        const objHighScores = JSON.parse(window.localStorage.getItem("highscores"));
        objHighScores.splice(10,1);
        const stringSplicedHighScores = JSON.stringify(objHighScores);
        window.localStorage.setItem("highscores", stringSplicedHighScores);
    }
}
