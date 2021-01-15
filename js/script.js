document.addEventListener('DOMContentLoaded', appStart)
//------GLOBAL VARIABLES----
let max_size;
let move;
let extra_time = 0;
let points_scored = 0;
let refresh = setInterval(timer, 1000);
let initial_time = 5;
//-------------------------
function appStart()             //FIRST FUNCTION STARTING AFTER DOM LOADING
{
    const down = document.getElementById('down');
    down.addEventListener('click', tap_down, false);
    const up = document.getElementById('up');
    up.addEventListener('click', tap_up, false);
    const right = document.getElementById('right');
    right.addEventListener('click', tap_right, false);
    const left = document.getElementById('left');
    left.addEventListener('click', tap_left, false);  
    const points = document.getElementById('points');     
    points.innerHTML = 'Score: ' + points_scored;
    const area = document.getElementById('area');
    const areaWidth = area.clientWidth;

    countPosition(areaWidth);
    const character1 = new Character (move, move, 0, 0);
    character1.createDiv('area', 'char1', 'char');
    console.log(character1);
    const loot1 = new Loot (move, move, 0, 0, 5, 2);
    loot1.generateRandomPosition();
    loot1.createDiv('area', 'lt1', 'loot');
    
    function tap_down() 
    {
        if (character1.top_position < max_size - move)
        {   
            character1.removeDiv('char1');
            character1.top_position = character1.top_position + move;
            character1.createDiv('area', 'char1', 'char');
            makeCollision();
        } 
    }
    function tap_up()
    {
        if (character1.top_position >= move)
        {   
            character1.removeDiv('char1');
            character1.top_position = character1.top_position - move;
            character1.createDiv('area', 'char1', 'char');
            makeCollision();
        }  
    }
    function tap_right()
    {
        if (character1.left_position < max_size - move)
        {   
            character1.removeDiv('char1');
            character1.left_position = character1.left_position + move;
            character1.createDiv('area', 'char1', 'char');
            makeCollision();
        }    
    }
    function tap_left()
    {
        if (character1.left_position >= move)
        {   
            character1.removeDiv('char1');
            character1.left_position = character1.left_position - move;
            character1.createDiv('area', 'char1', 'char');
            makeCollision();
        }    
    }
    function makeCollision()
    {
        if (character1.top_position === loot1.top_position && character1.left_position === loot1.left_position)
        {   
            const extra_time_div = document.getElementById('extra_time');
            loot1.removeDiv('lt1');
            points_scored = points_scored + loot1.value;
            extra_time = extra_time + loot1.time;
            extra_time_div.innerHTML = `+${loot1.time} sec`;
            setTimeout(function () {
                extra_time_div.innerHTML = '';
            }, 1500);
            loot1.generateRandomPosition();
            while (character1.top_position === loot1.top_position && character1.left_position === loot1.left_position) 
            {
                loot1.generateRandomPosition();
            }
            loot1.createDiv('area', 'lt1', 'loot');
        }
        points.innerHTML = 'Score: ' + points_scored;
    }
}
class Character
{
    constructor(width, height, left_position, top_position)
    {
        this.width = width;
        this.height = height;
        this.left_position = left_position;
        this.top_position = top_position;
    }
    createDiv(parent_id, div_id, div_class) //CREATE DIV ELEMENT, first arg is parent id and second arg is id of new div
    {
        let div = document.createElement('DIV');
        div.id = div_id;
        div.style.width = `${this.width}px`;
        div.style.height = `${this.height}px`;
        div.style.marginLeft = `${this.left_position}px`;
        div.style.marginTop = `${this.top_position}px`;
        div.className = div_class;
        //div.style.position = 'absolute';
        // div.style.backgroundImage = `url(${this.image_url})`;
        // div.style.imageRendering = 'pixelated';
       // div.style.backgroundRepeat = 'no-repeat';
       // div.style.backgroundSize = '100%';
        let parent = document.getElementById(parent_id);
        parent.appendChild(div);
    }
    removeDiv(div_id)
    {
        let div = document.getElementById(div_id);
        div.remove();
    }
    generateRandomPosition()
    {
        let random1 = (Math.floor((Math.random()*9 + 1)) * this.width);
        let random2 = (Math.floor((Math.random()*9 + 1)) * this.width);
        this.top_position = random1;
        this.left_position = random2;
    }
}
class Loot extends Character
{
    constructor(width, height, left_position, top_position, value, time)
    {
       super(width, height, left_position, top_position);
       this.value = value;
       this.time = time;
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