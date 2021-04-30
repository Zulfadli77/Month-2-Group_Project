document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const flagsLeft = document.querySelector('#flags-left')
    const result = document.querySelector('#result')
    // to make it 100 div element of squares(width * width)
    let width = 10 
    let bombAmount = 15
    let flags = 0
    let squares = []
    let isGameOver = false
  


    //creating the minesweeper board
    function createBoard() {
      flagsLeft.innerHTML = bombAmount
  
      // shuffling the array index with random bombs positioning
      const bombsArray = Array(bombAmount).fill('bomb') // fill array with bombAmount
      const emptyArray = Array(width * width - bombAmount).fill('valid') // algorhythm to fill empty square aside from bomb
      const gameArray = emptyArray.concat(bombsArray) //empty squares box joining with squares box of bomb
      const shuffledArray = gameArray.sort(() => Math.random() -0.5) // shuffle both empty and bombed arrays
  
      // looping and creating the div element with id in it 100 times for the board with array of squares
      for(let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        square.setAttribute('id', i) //setting each square of div with id
        square.classList.add(shuffledArray[i]) //adding the div square with value of shuffled of array values(emptied and bomb of arrays value)
        grid.appendChild(square)
        squares.push(square)
  
        // listening normal click event on each squares
        square.addEventListener('click', function(e) {
          click(square)
        })
  
        //cntrl and left click
        square.oncontextmenu = function(e) {
          e.preventDefault()
          addFlag(square)
        }
      }
  
      //add numbers
      for (let i = 0; i < squares.length; i++) {
        let total = 0
        const isLeftEdge = (i % width === 0)
        const isRightEdge = (i % width === width -1)
  
        if (squares[i].classList.contains('valid')) {
          if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
          if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++
          if (i > 10 && squares[i - width].classList.contains('bomb')) total ++
          if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++
          if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++
          if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++
          if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++
          if (i < 89 && squares[i +width].classList.contains('bomb')) total ++
          squares[i].setAttribute('data', total)
        }
      }
    }
    createBoard()
  
    //add Flag with RIGHT click to check the bomb is there on that position
    function addFlag(square) {
      if (isGameOver) return
      if (!square.classList.contains('checked') && (flags < bombAmount)) {
        if (!square.classList.contains('flag')) {
          square.classList.add('flag')
          square.innerHTML = ' 🚩'
          flags ++
          flagsLeft.innerHTML = bombAmount- flags
          checkForWin()
        } else {
          square.classList.remove('flag')
          square.innerHTML = ''
          flags --
          flagsLeft.innerHTML = bombAmount- flags
        }
      }
    }
  
    //clicking on square actions to check the square
    function click(square) {
      let currentId = square.id
      if (isGameOver) return
      if (square.classList.contains('checked') || square.classList.contains('flag')) return
      if (square.classList.contains('bomb')) {
        gameOver(square)
      } else {
        let total = square.getAttribute('data')
        if (total != 0) {
          square.classList.add('checked')
          if (total == 1) square.classList.add('one')
          if (total == 2) square.classList.add('two')
          if (total == 3) square.classList.add('three')
          if (total == 4) square.classList.add('four')
          square.innerHTML = total
          return
        }
        checkSquare(square, currentId)
      }
      square.classList.add('checked')
    }
  
  
    //check neighbouring squares once square is clicked
    function checkSquare(square, currentId) {
      const isLeftEdge = (currentId % width === 0)
      const isRightEdge = (currentId % width === width -1)
  
      setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId > 9 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1 -width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId > 10) {
          const newId = squares[parseInt(currentId -width)].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId > 11 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1 -width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 98 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 90 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1 +width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 88 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1 +width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 89) {
          const newId = squares[parseInt(currentId) +width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
      }, 10)
    }
  
    //game over
    function gameOver(square) {
      result.innerHTML = 'Game Over!'
      isGameOver = true
  
      //show ALL the bombs
      squares.forEach(square => {
        if (square.classList.contains('bomb')) {
          square.innerHTML = '💣'
          square.classList.remove('bomb')
          square.classList.add('checked')
        }
      })
    }
  
    //check for win
    function checkForWin() {
      //simplified win argument
    let matches = 0
  
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
          matches ++
        }
        if (matches === bombAmount) {
          result.innerHTML = 'YOU WIN!'
          isGameOver = true
        }
      }
    }
  })

  function resetbtn(){
    window.location.reload();
  }
