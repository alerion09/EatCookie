document.addEventListener('DOMContentLoaded', appStart)
//------GLOBAL VARIABLES----
let position_0;
let position_1;
let position_0_left;
let position_1_left;
let max_size;
let move;
let extra_time = 0;
let points_scored = 0;
let margin_top;
let margin_left;
let artifact_margin_top;
let artifact_margin_left;
let refresh = setInterval(timer, 1000);
let initial_time = 60;
//-------------------------
function appStart()             //FIRST FUNCTION STARTING AFTER DOM LOADING
{
    screen.orientation.lock('portrait'); 
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
    points.innerHTML = 'Score: ' + points_scored;
    const area = document.getElementById('area');
    const areaWidth = area.clientWidth;
    countPosition(areaWidth);
    move_artifact();
    // const loot1 = new Loot (move, move, 30, 30, 5);
    // console.log(loot1);
    // loot1.createDiv('area', 'loot1');
}
class Loot
{
    constructor(width, height, left_position, top_position, value)
    {
        this.width = width;
        this.height = height;
        this.left_position = left_position;
        this.top_position = top_position;
        this.value = value;
    }
    createDiv(parent_id, div_id) //CREATE DIV ELEMENT, first arg is parent id and second arg is id of new div
    {
        let div = document.createElement('DIV');
        div.id = div_id;
        div.style.width = `${this.width}px`;
        div.style.height = `${this.height}px`;
        div.style.marginLeft = `${this.left_position}px`;
        div.style.marginTop = `${this.top_position}px`;
        div.className = 'loot';
        div.style.position = 'absolute';
        div.style.backgroundColor = "black";
        let parent = document.getElementById(parent_id);
        parent.appendChild(div);
    }
}
function countPosition(width) // FUNCTION RESPONSIBLE FOR COUNT VALUE FOR GLOBAL VARIABLES
{
    move = width/10;
    max_size = width;
    position_0 = width/10;
    position_1 = -((width/10)*2);
    position_0_left = width/10;
    position_1_left = -((width/10)*2);
}
function timer()    //FUNCTION COUNTDOWN TO END GAME
{
    initial_time = initial_time - 1 + extra_time;
    extra_time = 0;
    if (initial_time === 0)
    {
        clearInterval(refresh);
        saveTempScore();
        show_endgame();
    }
    document.getElementById('time').innerHTML = 'Time: ' + initial_time;   
}
//--------------CONTROLS FUNCTIONS-----------------------------
function tap_down() 
{
    if (position_0 < max_size)
    {
        console.log(position_0);
        square.style.marginTop = position_0 + 'px';
        position_0 = position_0 + move;
        control_joint();
    } 
    console.log(position_0);
}
function tap_up()
{
    if (position_0 > move)
    {
        square.style.marginTop = position_0 + position_1 + 'px';
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
        square.style.marginLeft = position_0_left + position_1_left + 'px';
        position_0_left = position_0_left - move;
        control_joint();
    }    
}
function control_joint()
{
    margin_top = (position_0 - move);
    margin_left = (position_0_left - move);
    if (artifact_margin_top === margin_top && artifact_margin_left === margin_left)
    {
        points_scored = points_scored + 5;
        extra_time = extra_time + 2;
        document.getElementById('extra_time').innerHTML = '+2 sec';
        setTimeout(function () {
            document.getElementById('extra_time').innerHTML = '';
        }, 1500);
        let random1 = Math.floor((Math.random() * 9) + 1);
        let random2 = Math.floor((Math.random() * 9) + 1);
        console.log('random1: ' + random1);
        console.log('random2: ' + random2);
        artifact_margin_left = random1 * move;
        artifact_margin_top = random2 * move;
        if (artifact_margin_top === margin_top && artifact_margin_left === margin_left)
        {
            artifact_margin_left = random1 * move;
            artifact_margin_top = random2 * move;
        } else

        artifact.style.marginLeft = (artifact_margin_left) + 'px';
        artifact.style.marginTop = (artifact_margin_top) + 'px';
    }
    points.innerHTML = 'Score: ' + points_scored;
}
//-----------------------------------------------------------
function move_artifact()                //FUNCTION RESPONSIBLE FOR CHANGE ARTIFACT POSITION
{   
    const artifact = document.getElementById('artifact'); 
    artifact.style.height = move + 'px';
    artifact.style.width = move + 'px';
    artifact_margin_top = (Math.floor((Math.random() * 9) + 1))* move;
    artifact_margin_left = (Math.floor((Math.random() * 9) + 1)) * move;
    
    if (artifact_margin_top === margin_top && artifact_margin_left === margin_left)
    {
        move_artifact();
    } else
    artifact.style.marginLeft = artifact_margin_left + 'px';
    artifact.style.marginTop = artifact_margin_top + 'px';
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