document.addEventListener("DOMContentLoaded", appStart)

//ZMIENNE GLOBALNE
var position_0 = 30;
var position_1 = -60;
var position_0_left = 30;
var position_1_left = -60;
var max_size = 10;
var ruch = 30;
var dodatek = 0;
var zdobyte_punkty = 0;
var odl_od_gory = 1;
var odl_od_lewej = 2;
var artefakt_odl_od_gory = 3;
var artefakt_odl_od_lewej = 4;
var strzalka_size = 30;
var odswiezanie = setInterval(timer, 1000);
var odliczany_czas = 8;//ODLICZANIE CZASU
//-------------------------------------------

//FUNKCJA STARTOWA ................................................................................
function appStart()
{
    
    //BLOKOWANIE EKRANU
    screen.orientation.lock('portrait');
    
    create_uchwyty();
    

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

    //KWADRAT
    var kwadrat = document.getElementById('kwadrat');

    //ARTEFAKT
    var artefakt = document.getElementById('artefakt');

    //PUNKTY
    var punkty = document.getElementById('punkty');
    punkty.innerHTML = "Punkty: " + zdobyte_punkty;

    //ROZMIAR WYSWIETLACZA - zmiana ustawien i rozmiarow
    if (screen_width > 219 && screen_width <= 319) //od 220 do 319
    {
        ruch = 20;
        up.style.height = ruch + "px";
        up.style.width = ruch + "px";
        down.style.height = ruch + "px";
        down.style.width = ruch + "px";
        right.style.height = ruch + "px";
        right.style.width = ruch + "px";
        left.style.height = ruch + "px";
        left.style.width = ruch + "px";

        right.style.marginLeft = 15 + "px";
        left.style.marginRight = 15 + "px";  
        
        area.style.height = 200 + "px";
        area.style.width = 200 + "px";
        kwadrat.style.height = ruch + "px";
        kwadrat.style.width = ruch + "px";
        max_size = 200;
        position_0 = 20;
        position_1 = -40;
        position_0_left = 20;
        position_1_left = -40;
        artefaktowa();
    }
    else if (screen_width > 319 && screen_width <= 419)      //od 320 do 419 POCZATKOWY
    {
        max_size = 280;
        artefaktowa();
    }
    else if (screen_width > 419 && screen_width <= 619) //od 420 do 619
    {
        ruch = 40;
        up.style.height = ruch + "px";
        up.style.width = ruch + "px";
        down.style.height = ruch + "px";
        down.style.width = ruch + "px";
        right.style.height = ruch + "px";
        right.style.width = ruch + "px";
        left.style.height = ruch + "px";
        left.style.width = ruch + "px";

        right.style.marginLeft = 30 + "px";
        left.style.marginRight = 30 + "px";

        
        area.style.height = 400 + "px";
        area.style.width = 400 + "px";
        kwadrat.style.height = ruch + "px";
        kwadrat.style.width = ruch + "px";
        max_size = 380;
        position_0 = 40;
        position_1 = -80;
        position_0_left = 40;
        position_1_left = -80;
        artefaktowa();
    }
    else if (screen_width > 619 ) //od 620 do 819
    {
        ruch = 60;
        up.style.height = ruch + "px";
        up.style.width = ruch + "px";
        down.style.height = ruch + "px";
        down.style.width = ruch + "px";
        right.style.height = ruch + "px";
        right.style.width = ruch + "px";
        left.style.height = ruch + "px";
        left.style.width = ruch + "px";

        right.style.marginLeft = 45 + "px";
        left.style.marginRight = 45 + "px";
        
        area.style.height = 600 + "px";
        area.style.width = 600 + "px";
        kwadrat.style.height = ruch + "px";
        kwadrat.style.width = ruch + "px";
        max_size = 560;
        position_0 = 60;
        position_1 = -120;
        position_0_left = 60;
        position_1_left = -120;
        artefaktowa();
    }
    //----------------------------------------
}
//...................................................................................................

//FUNKCJE.............................................................................................
//UCHWYTY DO PRZYCISKOW STEROWANIA
function create_uchwyty() {
    var down = document.getElementById('down');
    down.addEventListener('click', tap_down, false);

    var up = document.getElementById('up');
    up.addEventListener('click', tap_up, false);

    var right = document.getElementById('right');
    right.addEventListener('click', tap_right, false);

    var left = document.getElementById('left');
    left.addEventListener('click', tap_left, false);
}
//----------------------------------------------

 //FUNKCJA ARTEFAKTU
    function artefaktowa()
    {
        artefakt.style.height = ruch + "px";
        artefakt.style.width = ruch + "px";
        artefakt_odl_od_gory = (Math.floor((Math.random() * 9) + 1))* ruch;
        artefakt_odl_od_lewej = (Math.floor((Math.random() * 9) + 1)) * ruch;
        
        if (artefakt_odl_od_gory == odl_od_gory && artefakt_odl_od_lewej == odl_od_lewej)
        {
            artefaktowa();
        } else
        artefakt.style.marginLeft = artefakt_odl_od_lewej + 'px';
        artefakt.style.marginTop = artefakt_odl_od_gory + 'px';
    }
//----------------------------------------------------
//Funkcja respownu strony
function pokaz()
{
    window.location.href = 'index.html';
}
//--------------------------------------
//Funkcja czasu
function timer()
{
    odliczany_czas = odliczany_czas - 1 + dodatek;
    dodatek = 0;
    if (odliczany_czas == 0)
    {
        clearInterval(odswiezanie);
        document.getElementById('czas').innerHTML = "Czas: " + 0;

        //TWORZENIE STRONY KONCOWEJ
        document.getElementById('container').style.textAlign = "center";
        if (zdobyte_punkty <= 0)
        {
            document.getElementById('container').innerHTML = "<div style='font-family: Arial Black'><h1 style='size:30px;'>KONIEC GRY</h1><br><h2 style='margin-bottom:30px;'>Uzyskane punkty: " + zdobyte_punkty + "</h2>"+
           "<div><input style='height:40px;width:120px;margin-right:5px;' id='jeszcze_raz' type='image' src='./img/powtorz.png'></input>" +
           "<input style='height:40px;width:120px;margin-left:5px;' id='wyniki' type='image' src='./img/wyniki.png'></input></div></div>";
            document.getElementById('wyniki').addEventListener("click", wyswietl_wyniki, false); // reakcja na przycisk ..wyniki
            document.getElementById('jeszcze_raz').addEventListener('click', pokaz, false); // reakcja na przycisk ..powtorz
        }
        else
        {
            document.getElementById('container').innerHTML = "<div style='font-family: Arial Black'><h1 style='size:30px;'>KONIEC GRY</h1><br><h2>Uzyskane punkty: " + zdobyte_punkty +
           "</h2><h2>Podaj nick: </h2><input type='text' id='pole' /><input type='button' id='ok' value='Ok' /><br><br>" +
           "<div><input style='height:40px;width:120px;margin-right:5px;' id='jeszcze_raz' type='image' src='./img/powtorz.png'></input>" +
           "<input style='height:40px;width:120px;margin-left:5px;' id='wyniki' type='image' src='./img/wyniki.png'></input></div></div>";
            document.getElementById('wyniki').addEventListener("click", wyswietl_wyniki, false); // reakcja na przycisk ..wyniki
            document.getElementById('jeszcze_raz').addEventListener('click', pokaz, false); // reakcja na przycisk ..powtorz
            document.getElementById('ok').addEventListener("click", pobierz_nick, false); // reakcja na przycisk ..ok 
            document.getElementById('ok').addEventListener("click", wyswietl_wyniki, false); // reakcja na przycisk ..ok 
        }
        //----------------------------
    }
    document.getElementById('czas').innerHTML = "Czas: " + odliczany_czas;   
}
//----------------------------------------------------------------

//Funkcja wyswietlania wynikow
function wyswietl_wyniki() 
{
    document.getElementById('container').innerHTML = "<div style='font-family: Arial Black'><div><h1 style='size:30px;'>WYNIKI</h1></div>" +
        "<div id='wyniki_dol'></div><div><input style='height:40px;width:120px;margin-top:30px;' id='jeszcze_raz2' type='image' src='./img/powtorz.png'></input></div></div>";
    document.getElementById('jeszcze_raz2').addEventListener('click', pokaz, false); // reakcja na przycisk ..powtorz2

    var lista = JSON.parse(window.localStorage.getItem("highScores")); //highscore w jsonie
    function compareScore (a, b) //Funkcja sortująca wyniki
    {
        return b.score - a.score;
    }
    lista.sort(compareScore);
    
    for (let i = 0; i < 10; i++) //Wyswietlanie listy 10 najlepszych wynikow
    {
        wyniki_dol.innerHTML += lista[i].nick + " " + lista[i].score + " pkt." +"<br>";  
    }
    console.log(lista);
}
//--------------------------------------------------------------

//POBIERANIE NICKU
function pobierz_nick() {
    var pole = document.getElementById('pole');
    var nick = pole.value;
    //JSON
    var istniejacyHighScores = JSON.parse(window.localStorage.getItem("highScores")); // przypisanie highscores do nowej zmiennej
    if (istniejacyHighScores == null) {
        var highScores = []; // tworzenie tablicy highscore gdy nie istnieje

        var score = {
            nick: nick,
            score: zdobyte_punkty
        };

        var stringScore = JSON.stringify(score); // score w stringu

        highScores.push(score); //dodanie score do tablicy

        var stringHighScore = JSON.stringify(highScores);   // highscore w stringu
        window.localStorage.setItem("highScores", stringHighScore); // dodanie highscore do pamieci

        console.log(window.localStorage.getItem("highScores")); //wyswietl highscore
        document.getElementById('ok').removeEventListener("click", pobierz_nick, false);
        console.log(window.localStorage.getItem("highScores")); //wyswietl highscore
    }
    else 
    {
        var score = {
            nick: nick,
            score: zdobyte_punkty
        };

        var stringScore = JSON.stringify(score); // score w stringu

        istniejacyHighScores.push(score); //dodanie score do tablicy

        var stringHighScore = JSON.stringify(istniejacyHighScores);   // highscore w stringu
        window.localStorage.setItem("highScores", stringHighScore); // dodanie highscore do pamieci
        document.getElementById('ok').removeEventListener("click", pobierz_nick, false);
        console.log(window.localStorage.getItem("highScores")); //wyswietl highscore
    }
    
}
//FUNKCJA WSPOLNA FUNKCJI STEROWANIA
function wspolna()
{
    odl_od_gory = (position_0 - ruch);
    odl_od_lewej = (position_0_left - ruch);

    if (artefakt_odl_od_gory == odl_od_gory && artefakt_odl_od_lewej == odl_od_lewej)
    {
        zdobyte_punkty = zdobyte_punkty + 5;
        dodatek = dodatek + 2;
        document.getElementById('dodatkowy_czas').innerHTML = "+2 sek";
        setTimeout(function () {
            document.getElementById('dodatkowy_czas').innerHTML = "";
        }, 1500);

        //LICZBA LOSOWA
        var losowa1 = Math.floor((Math.random() * 9) + 1);
        var losowa2 = Math.floor((Math.random() * 9) + 1);
        console.log("losowa1: " + losowa1);
        console.log("losowa2: " + losowa2);
        //---------------------------------------------
        
        artefakt_odl_od_lewej = losowa1 * ruch;
        artefakt_odl_od_gory = losowa2 * ruch;
        if (artefakt_odl_od_gory == odl_od_gory && artefakt_odl_od_lewej == odl_od_lewej)
        {
            artefakt_odl_od_lewej = losowa1 * ruch;
            artefakt_odl_od_gory = losowa2 * ruch;
        } else

        artefakt.style.marginLeft = (artefakt_odl_od_lewej) + 'px';
        artefakt.style.marginTop = (artefakt_odl_od_gory) + 'px';
    }
    punkty.innerHTML = "Punkty: " + zdobyte_punkty;
}
//FUNKCJE STEROWANIA
function tap_down()
{
    if (position_0 < max_size)
    {
        kwadrat.style.marginTop = position_0 + "px";
        position_0 = position_0 + ruch;
        wspolna();
    } 
}
function tap_up()
{
    if (position_0 > ruch)
    {
        kwadrat.style.marginTop = position_0 + position_1 + "px";
        position_0 = position_0 - ruch;
        wspolna();
    }  
}
function tap_right()
{
    if (position_0_left < max_size)
    {
        kwadrat.style.marginLeft = position_0_left + "px";
        position_0_left = position_0_left + ruch;
        wspolna();
    }    
}
function tap_left()
{
    if (position_0_left > ruch)
    {
        kwadrat.style.marginLeft = position_0_left + position_1_left + "px";
        position_0_left = position_0_left - ruch;
        wspolna();
    }    
}
//-------------------------------------------------------
//............................................................................................................