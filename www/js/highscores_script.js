document.addEventListener("DOMContentLoaded", appStart)
function appStart()
{
    const newGameButton = document.querySelector('.button_new_game');
    newGameButton.addEventListener('click', show_index, false);
}
function show_index()
{
    document.location.href = 'index.html';
}