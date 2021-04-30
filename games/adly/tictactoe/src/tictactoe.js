/*
We store our game status element here to allow us to more easily 
use it later on 
*/
const statusDisplay = document.querySelector('.game1status');
/*
Here we declare some variables that we will use to track the 
game state throught the game. 
*/
/*
We will use gameActive to pause the game in case of an end scenario
*/
let gameActive = true;
/*
We will store our current player here, so we know whos turn 
*/
let currentPlayer = "X";
let playerState = "Player 1";

/*
We will store our current game state here, the form of empty strings in an array
 will allow us to easily track played cells and validate the game state later on
*/
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with 
current data every time we need it.
*/
const winningMessage = () => `${playerState} has won!`;

const drawMessage = "Draw!";
const currentPlayerTurn = () => `It's  ${ playerState }'s turn`;

var p1score = 0;
var p2score = 0;



/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();

function handleBoxPlayed(clickedBox, clickedBoxIndex) {
    /*
    We update our internal game state to reflect the played move, 
    as well as update the user interface to reflect the played move
    */
    gameState[clickedBoxIndex] = currentPlayer;
    clickedBox.innerHTML = currentPlayer;
}

function handlePlayerChange() {

}

//game result here. take the win condition from const winningConditions array above to check every click
function handleResultValidation() {
    let roundWon = false;
    //7 being there are 8 winning condition total
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        //in the winning condition array, there are 3 clicks. abc checks if the clicks are done by the same players. e.g. XXX wins, X0X or X''X means continue on
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
            //continue skips one iteration below. meaning if one of the winningcondition is an empty space it will not bother checking if a == b etc. 
            //this is to prevent if all 3 slots are empty it will give a win.
        }
        if (a === b && b === c) {

            roundWon = true;
            break
            //break stops||ends the for loop. without break it will continue checking even though it will be pointless
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();


        if (winningMessage() === "Player 1 has won!") {
            p1score++;
            console.log("Player 1: " + p1score);
            console.log("Player 2: " + p2score);
            document.querySelector('.player1score').innerHTML = "Player 1: " + p1score;
            document.querySelector('.player2score').innerHTML = "Player 2: " + p2score;
        }
        if (winningMessage() === "Player 2 has won!") {
            p2score++;
            console.log("Player 1: " + p1score);
            console.log("Player 2: " + p2score);
            document.querySelector('.player1score').innerHTML = "Player 1: " + p1score;
            document.querySelector('.player2score').innerHTML = "Player 2: " + p2score;
        }

        gameActive = false;
        return;
        
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage;
        gameActive = false;
        return;
    }
    /*
    If we get to here we know that the no one won the game yet, 
    and that there are still moves to be played, so we continue by changing the current player.
    */
    handlePlayerChange();
}

function handlePlayerChange() {
    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "X") {
        playerState = "Player 1";
    } else {
        playerState = "Player 2";
    }
    statusDisplay.innerHTML = currentPlayerTurn();
    
}

function handleBoxClick(clickedBoxEvent) {
    /*
    We will save the clicked html element in a variable for easier further use
    */
    const clickedBox = clickedBoxEvent.target;
    /*
    Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid. 
    Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
    integer(number)
    */
    const clickedBoxIndex = parseInt(
        clickedBox.getAttribute('data-box')
    );
    /* 
    Next up we need to check whether the call has already been played, 
    or if the game is paused. If either of those is true we will simply ignore the click.
    */
    if (gameState[clickedBoxIndex] !== "" || !gameActive) {
        return;
    }
    /* 
    If everything if in order we will proceed with the game flow
    */
    handleBoxPlayed(clickedBox, clickedBoxIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.box')
        .forEach(box => box.innerHTML = "");
}

/*
And finally we add our event listeners to the actual game cells, as well as our 
restart button
*/
document.querySelectorAll('.box').forEach(box => box.addEventListener('click', handleBoxClick));
document.querySelector('.ttt-restart').addEventListener('click', handleRestartGame);
