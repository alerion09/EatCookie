document.addEventListener("DOMContentLoaded", appStart)
//ZMIENNE GLOBALNE
var position_0;
var position_1;
var position_0_left;
var position_1_left;
var max_size;
var move;
var extra_time = 0;
let points_scored = 0;
var margin_top = 1;
var margin_left = 2;
var artifact_margin_top = 3;
var artifact_margin_left = 4;
var refresh = setInterval(timer, 1000);
var initial_time = 5;//ODLICZANIE CZASU
//-------------------------------------------
//FUNKCJA STARTOWA ................................................................................
function appStart()
{
    screen.orientation.lock('portrait'); //BLOKOWANIE EKRANU
    const down = document.getElementById('down');
    down.addEventListener('click', tap_down, false);
    const up = document.getElementById('up');
    up.addEventListener('click', tap_up, false);
    const right = document.getElementById('right');
    right.addEventListener('click', tap_right, false);
    const left = document.getElementById('left');
    left.addEventListener('click', tap_left, false);
    const square = document.getElementById('square');     
    const points = document.getElementById('points');     
    points.innerHTML = "Score: " + points_scored;
    const area = document.getElementById('area');
    const areaWidth = area.clientWidth;
    countPosition(areaWidth);
    move_artifact();
}
//...................................................................................................
//FUNKCJE.............................................................................................
function countPosition(width)
{
    move = width/10;
    max_size = width;
    position_0 = width/10;
    position_1 = -((width/10)*2);
    position_0_left = width/10;
    position_1_left = -((width/10)*2);
}
function move_artifact()
{   
    const artifact = document.getElementById('artifact'); //ARTEFAKT
    artifact.style.height = move + "px";
    artifact.style.width = move + "px";
    artifact_margin_top = (Math.floor((Math.random() * 9) + 1))* move;
    artifact_margin_left = (Math.floor((Math.random() * 9) + 1)) * move;
    
    if (artifact_margin_top == margin_top && artifact_margin_left == margin_left)
    {
        move_artifact();
    } else
    artifact.style.marginLeft = artifact_margin_left + 'px';
    artifact.style.marginTop = artifact_margin_top + 'px';
}
function timer()
{
    initial_time = initial_time - 1 + extra_time;
    extra_time = 0;
    if (initial_time == 0)
    {
        clearInterval(refresh);
        saveTempScore();
        show_endgame();
    }
    document.getElementById('time').innerHTML = "Time: " + initial_time;   
}
function control_joint()
{
    margin_top = (position_0 - move);
    margin_left = (position_0_left - move);
    if (artifact_margin_top == margin_top && artifact_margin_left == margin_left)
    {
        points_scored = points_scored + 5;
        extra_time = extra_time + 2;
        document.getElementById('extra_time').innerHTML = "+2 sec";
        setTimeout(function () {
            document.getElementById('extra_time').innerHTML = "";
        }, 1500);
        //LICZBA LOSOWA
        var random1 = Math.floor((Math.random() * 9) + 1);
        var random2 = Math.floor((Math.random() * 9) + 1);
        console.log("random1: " + random1);
        console.log("random2: " + random2);
        //---------------------------------------------
        artifact_margin_left = random1 * move;
        artifact_margin_top = random2 * move;
        if (artifact_margin_top == margin_top && artifact_margin_left == margin_left)
        {
            artifact_margin_left = random1 * move;
            artifact_margin_top = random2 * move;
        } else

        artifact.style.marginLeft = (artifact_margin_left) + 'px';
        artifact.style.marginTop = (artifact_margin_top) + 'px';
    }
    points.innerHTML = "Score: " + points_scored;
}
//FUNKCJE STEROWANIA
function tap_down()
{
    if (position_0 < max_size)
    {
        square.style.marginTop = position_0 + "px";
        position_0 = position_0 + move;
        control_joint();
    } 
}
function tap_up()
{
    if (position_0 > move)
    {
        square.style.marginTop = position_0 + position_1 + "px";
        position_0 = position_0 - move;
        control_joint();
    }  
}
function tap_right()
{
    if (position_0_left < max_size)
    {
        square.style.marginLeft = position_0_left + "px";
        position_0_left = position_0_left + move;
        control_joint();
    }    
}
function tap_left()
{
    if (position_0_left > move)
    {
        square.style.marginLeft = position_0_left + position_1_left + "px";
        position_0_left = position_0_left - move;
        control_joint();
    }    
}
function show_index()           //Open Main View 
{
    window.location.href = 'index.html';
}
function show_endgame()         //Open Endgame View 
{
    window.location.href = 'endgame.html';
}
function saveTempScore()        //Save current score to session memory 
{
    window.sessionStorage.setItem('tempScore', points_scored);
}
//-------------------------------------------------------
//............................................................................................................