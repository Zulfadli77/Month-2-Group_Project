let board;
let player = 'O';
let aiPlayer = 'X';
const winIndex = [
  [3, 4, 5], [0, 1, 2], [6, 7, 8],
  [0, 4, 8], [6, 4, 2], [2, 5, 8],
  [1, 4, 7], [0, 3, 6]
];

const box = document.querySelectorAll('.box');
restartgame();

function selectSym(sym){
  player = sym;
  aiPlayer = sym === 'O' ? 'X' :'O';
  board = Array.from(Array(9).keys());
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', turnClick, false);
  }
  if (aiPlayer === 'X') {
    turn(bestSpot(),aiPlayer);
  }
  document.querySelector('.selectSym').style.display = "none";
}

// restart btn function
function restartgame(){
  document.querySelector('.gameOver').style.display = "none";
  document.querySelector('.gameOver .gameOverText').innerText = "";
  document.querySelector('.selectSym').style.display = "block";
  for(var i = 0; i < box.length; i++){
    box[i].innerText = '';
    box[i].style.removeProperty('background-color');
  }
}

// click event for player
function turnClick(square){
  if(typeof board[square.target.id] === 'number'){ 
  // console.log(square.target.id);
  turn(square.target.id, player)
  if(!checkTie()) turn(bestSpot(), aiPlayer);
  }
}

function turn(squareId, player){
  board[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWin = checkWin(board, player)
  if (gameWin) gameEnd(gameWin)
}

// checking winning index connected to function gameEnd
function checkWin(board2, player){
  let play = board2.reduce((a,e,i) =>
  (e === player) ? a.concat(i) : a, []);
  let gameWin = null;
  for(let [index, win] of winIndex.entries()){
    if(win.every(elem => play.indexOf(elem) > -1)){
      gameWin = {index: index, player: player};
      break;
    }
  }
  return gameWin;
}

function gameEnd(gameWin){
  for(let index of winIndex[gameWin.index]){
    document.getElementById(index).style.backgroundColor = 
    gameWin.player == player ? "blue" : "red"
  }
  for(var i = 0; i < box.length; i++){
    box[i].removeEventListener('click', turnClick, false)
  }
  declareWinner(gameWin.player == player ? "You Win!" : "You Lose!");
}

function declareWinner(who){
  document.querySelector(".gameOver").style.display = "block";
  document.querySelector(".gameOver").style.margin = "240px -100px";
  document.querySelector(".gameOver .gameOverText").innerText = who;
}

// AI Player Functions
function emptySquares(){
  return board.filter(s => typeof s == 'number');
}

function bestSpot(){
  return minimax(board, aiPlayer).index;
}

function checkTie(){
  if(emptySquares().length == 0){
    for(var i = 0; i < box.length; i++){
      box[i].style.backgroundColor = "green";
      box[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Draw Game!")
    return true;
  }
  return false;
}


function minimax(newBoard, players) {
  var availSpots = emptySquares(newBoard);
  
  if (checkWin(newBoard, player)) {
    return {score: -10};
  } else if (checkWin(newBoard, aiPlayer)) {
    return {score: 10};
  } else if (availSpots.length === 0) {
    return {score: 0};
  }
  
  var moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;
    
    if (players === aiPlayer)
      move.score = minimax(newBoard, player).score;
    else
       move.score =  minimax(newBoard, aiPlayer).score;
    newBoard[availSpots[i]] = move.index;
    if ((players === aiPlayer && move.score === 10) || (players === player && move.score === -10))
      return move;
    else 
      moves.push(move);
  }
  
  let bestMove, bestScore;
  if (players === aiPlayer) {
    bestScore = -1000;
    for(let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
      bestScore = 1000;
      for(let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  
  return moves[bestMove];
}





