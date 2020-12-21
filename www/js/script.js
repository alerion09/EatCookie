
document.addEventListener("DOMContentLoaded", appStart)
//ZMIENNE GLOBALNE
var position_0 = 30;
var position_1 = -60;
var position_0_left = 30;
var position_1_left = -60;
var max_size = 10;
var move = 30;
var extra_time = 0;
let points_scored= 0;
var margin_top = 1;
var margin_left = 2;
var artifact_margin_top = 3;
var artifact_margin_left = 4;
var refresh = setInterval(timer, 1000);
var initial_time =8;//ODLICZANIE CZASU
//-------------------------------------------
//FUNKCJA STARTOWA ................................................................................
function appStart()
{
    screen.orientation.lock('portrait'); //BLOKOWANIE EKRANU
    create_handles();
    //POBIERANIE WYMIAROW EKRANU
    var clientWidth = function ()
    {
        return Math.max(window.innerWidth, document.documentElement.clientWidth);  
    };
    var clientHeight = function ()
    {
        return Math.max(window.innerHeight, document.documentElement.clientHeight);
    };
    console.log(clientWidth());
    var screen_width = clientWidth();
    var screen_height = clientHeight();
    //-------------------------------
    var square = document.getElementById('square');     //KWADRAT
    var artifact = document.getElementById('artifact'); //ARTEFAKT
    var points = document.getElementById('points');     //PUNKTY
    points.innerHTML = "Score: " + points_scored;
    //ROZMIAR WYSWIETLACZA - zmiana ustawien i rozmiarow
    if (screen_width > 219 && screen_width <= 319) //od 220 do 319
    {
        move = 20;
        up.style.height = move + "px";
        up.style.width = move + "px";
        down.style.height = move + "px";
        down.style.width = move + "px";
        right.style.height = move + "px";
        right.style.width = move + "px";
        left.style.height = move + "px";
        left.style.width = move + "px";
        right.style.marginLeft = 15 + "px";
        left.style.marginRight = 15 + "px";  
        area.style.height = 200 + "px";
        area.style.width = 200 + "px";
        square.style.height = move + "px";
        square.style.width = move + "px";
        max_size = 200;
        position_0 = 20;
        position_1 = -40;
        position_0_left = 20;
        position_1_left = -40;
        move_artifact();
    }
    else if (screen_width > 319 && screen_width <= 419)      //od 320 do 419 POCZATKOWY
    {
        max_size = 280;
        move_artifact();
    }
    else if (screen_width > 419 && screen_width <= 619) //od 420 do 619
    {
        move = 40;
        up.style.height = move + "px";
        up.style.width = move + "px";
        down.style.height = move + "px";
        down.style.width = move + "px";
        right.style.height = move + "px";
        right.style.width = move + "px";
        left.style.height = move + "px";
        left.style.width = move + "px";
        right.style.marginLeft = 30 + "px";
        left.style.marginRight = 30 + "px";
        area.style.height = 400 + "px";
        area.style.width = 400 + "px";
        square.style.height = move + "px";
        square.style.width = move + "px";
        max_size = 380;
        position_0 = 40;
        position_1 = -80;
        position_0_left = 40;
        position_1_left = -80;
        move_artifact();
    }
    else if (screen_width > 619 ) //od 620 do 819
    {
        move = 60;
        up.style.height = move + "px";
        up.style.width = move + "px";
        down.style.height = move + "px";
        down.style.width = move + "px";
        right.style.height = move + "px";
        right.style.width = move + "px";
        left.style.height = move + "px";
        left.style.width = move + "px";
        right.style.marginLeft = 45 + "px";
        left.style.marginRight = 45 + "px";
        area.style.height = 600 + "px";
        area.style.width = 600 + "px";
        square.style.height = move + "px";
        square.style.width = move + "px";
        max_size = 560;
        position_0 = 60;
        position_1 = -120;
        position_0_left = 60;
        position_1_left = -120;
        move_artifact();
    }
    //----------------------------------------
}
//...................................................................................................
//FUNKCJE.............................................................................................
function create_handles() {
    const down = document.getElementById('down');
    down.addEventListener('click', tap_down, false);
    const up = document.getElementById('up');
    up.addEventListener('click', tap_up, false);
    const right = document.getElementById('right');
    right.addEventListener('click', tap_right, false);
    const left = document.getElementById('left');
    left.addEventListener('click', tap_left, false);
}
function move_artifact()
{
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
function timer()
{
    initial_time = initial_time - 1 + extra_time;
    extra_time = 0;
    if (initial_time == 0)
    {
        clearInterval(refresh);
        saveTempScore();
        show_endgame();
        //document.getElementById('time').innerHTML = "Czas: " + 0;
        //TWORZENIE STRONY KONCOWEJ
        // document.getElementById('container').style.textAlign = "center";
        // if (points_scored <= 0)
        // {
        //     document.getElementById('container').innerHTML = "<div style='font-family: Arial Black'><h1 style='size:30px;'>KONIEC GRY</h1><br><h2 style='margin-bottom:30px;'>Uzyskane punkty: " + points_scored + "</h2>"+
        //    "<div><input style='height:40px;width:120px;margin-right:5px;' id='again' type='image' src='./img/powtorz.png'></input>" +
        //    "<input style='height:40px;width:120px;margin-left:5px;' id='score_table' type='image' src='./img/wyniki.png'></input></div></div>";
        //     document.getElementById('score_table').addEventListener("click", show_score_table, false); // reakcja na przycisk ..wyniki
        //     document.getElementById('again').addEventListener('click', show_index, false); // reakcja na przycisk ..powtorz
        // }
        // else
        // {
        //     document.getElementById('container').innerHTML = "<div style='font-family: Arial Black'><h1 style='size:30px;'>KONIEC GRY</h1><br><h2>Uzyskane punkty: " + points_scored +
        //    "</h2><h2>Podaj nick: </h2><input type='text' id='nick_input' /><input type='button' id='ok_button' value='Ok' /><br><br>" +
        //    "<div><input style='height:40px;width:120px;margin-right:5px;' id='again' type='image' src='./img/powtorz.png'></input>" +
        //    "<input style='height:40px;width:120px;margin-left:5px;' id='score_table' type='image' src='./img/wyniki.png'></input></div></div>";
        //     document.getElementById('score_table').addEventListener("click", show_score_table, false); // reakcja na przycisk ..wyniki
        //     document.getElementById('again').addEventListener('click', show_index, false); // reakcja na przycisk ..powtorz
        //     document.getElementById('ok_button').addEventListener("click", get_nick_name, false); // reakcja na przycisk ..ok 
        //     document.getElementById('ok_button').addEventListener("click", show_score_table, false); // reakcja na przycisk ..ok 
        // }
        // //----------------------------
    }
    document.getElementById('time').innerHTML = "Time: " + initial_time;   
}
//Funkcja wyswietlania wynikow
function show_score_table() 
{
    // document.getElementById('container').innerHTML = "<div style='font-family: Arial Black'><div><h1 style='size:30px;'>WYNIKI</h1></div>" +
    //     "<div id='score_table_bottom'></div><div><input style='height:40px;width:120px;margin-top:30px;' id='again2' type='image' src='./img/powtorz.png'></input></div></div>";
    // document.getElementById('again2').addEventListener('click', show_index, false); // reakcja na przycisk ..powtorz2

    // var high_scores_list = JSON.parse(window.localStorage.getItem("string_high_scores")); //highscore w jsonie
    // function compareScore (a, b) //Funkcja sortująca wyniki
    // {
    //     return b.score - a.score;
    // }
    // high_scores_list.sort(compareScore);
    
    // for (let i = 0; i < 10; i++) //Wyswietlanie listy 10 najlepszych wynikow
    // {
    //     score_table_bottom.innerHTML += high_scores_list[i].nick + " " + high_scores_list[i].score + " pkt." +"<br>";  
    // }
    // console.log(high_scores_list);
}
//--------------------------------------------------------------
//POBIERANIE NICKU
function get_nick_name() 
{
    // var nick_input = document.getElementById('nick_input');
    // var nick = nick_input.value;
    // //JSON
    // var existing_high_scores = JSON.parse(window.localStorage.getItem("string_high_scores")); // przypisanie string_high_scores do nowej zmiennej
    // if (existing_high_scores == null) 
    // {
    //     var string_high_scores = []; // tworzenie tablicy highscore gdy nie istnieje

    //     var score = {
    //         nick: nick,
    //         score: points_scored
    //     };
    //     var stringScore = JSON.stringify(score); // score w stringu
    //     string_high_scores.push(score); //dodanie score do tablicy
    //     var string_high_scores = JSON.stringify(string_high_scores);   // highscore w stringu
    //     window.localStorage.setItem("string_high_scores", string_high_scores); // dodanie highscore do pamieci
    //     console.log(window.localStorage.getItem("string_high_scores")); //wyswietl highscore
    //     document.getElementById('ok_button').removeEventListener("click", get_nick_name, false);
    //     console.log(window.localStorage.getItem("high_scores")); //wyswietl highscore
    // }
    // else 
    // {
    //     var score = {
    //         nick: nick,
    //         score: points_scored
    //     };
    //     var stringScore = JSON.stringify(score); // score w stringu
    //     existing_high_scores.push(score); //dodanie score do tablicy
    //     var string_high_scores = JSON.stringify(existing_high_scores);   // highscore w stringu
    //     window.localStorage.setItem("string_high_scores", string_high_scores); // dodanie highscore do pamieci
    //     document.getElementById('ok_button').removeEventListener("click", get_nick_name, false);
    //     console.log(window.localStorage.getItem("string_high_scores")); //wyswietl highscore
    // }
    
}
//FUNKCJA control_joint FUNKCJI STEROWANIA
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
//-------------------------------------------------------
//............................................................................................................