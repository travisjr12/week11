/*gets all the elements withing the cell class and stores them within the cell same as the 
same as the statusText amd restartBtn but with their id */
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
/* sequence for winning vs losing the game*/
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*shows the options available on the gameboard, the player x, and if the game is active or not to further stop or continue cell clicks */
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
/* intitiates the game */
initializeGame();
/*adds event click listeners to the game when clicked on cells/restart buttons
currentPlayers turn whether X or O and running is true to say the game is active */
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}/*function after the cells been clicked
if it sees that the cells been clicked or if the games active
  updateCell the cells to see if the conditions match for a winner*/
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}/* function to update cells on board whether X or O
function changePlayer switches players 
then indicates what players turn it is*/
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
/*for loops the checkWinner function on conditions of winning the game
if cellA-cellC are in the order of conditions continue or break to declare winner
if won stop running
else continue to next player */
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
/*restart function to first player being X */
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}