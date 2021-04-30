document.addEventListener('DOMContentLoaded', () => {

    const gridEntry = document.querySelector('.grid');
    const scoreEntry = document.querySelector('.score');

    //width is the number of box per row
    const width = 4;
    //cellHome is an array for a row
    let cellHome = [];
    //score is the final score
    let score = 0;

    //create the 4x4 board
    function createGame() {
        for (let i = 0; i < width * width; i++) {
            let cell = document.createElement('div');
            cell.className = "cell-block";
            cell.innerHTML = 0;

            gridEntry.appendChild(cell);
            cellHome.push(cell);
        }
        
        genNum();
        genNum();
    }
    createGame();
    loadHighScore();
    styleNum();

    //generate number randomly
    //WILL RETURN WARNING ERROR IN CONSOLE IF NO EMPTY SPACE BUT GAME ISNT OVER. IT IS ON PURPOSE
    function genNum() {
        //generate a random number between 0 to 15 (amount of cells)
        let rando = Math.floor(Math.random() * cellHome.length);

        //search for highest num in current game
        let choiceNum = Math.floor(Math.random() * 2);
        let highestNum = 0;
        for (let i = 0; i < width * width; i++) {
            
            if (Number(cellHome[i].innerHTML) > highestNum) {
                highestNum = Number(cellHome[i].innerHTML);
            }
        }
        //insert new number (2/4/8) into an empty cell
        if (highestNum < 20) {
            if (cellHome[rando].innerHTML == 0) {
                cellHome[rando].innerHTML = 2;
            }
            else {
                genNum();
            }
        }
        else if (highestNum < 70) {
            if (cellHome[rando].innerHTML == 0) {
                if (choiceNum < 1) {
                    cellHome[rando].innerHTML = 2;
                }
                else {
                    cellHome[rando].innerHTML = 4;
                }
                
            }
            else {
                genNum();
            }

        }
        else {
            if (cellHome[rando].innerHTML == 0) {
                if (choiceNum < 1) {
                    cellHome[rando].innerHTML = 4;
                }
                else {
                    cellHome[rando].innerHTML = 8;
                }
            }
            else {
                genNum();
            }

        }
        //if the cell number is occupied, repeat until you get an empty cell number/game over?
        //else {
            //genNum();
        //}
    }

    //generate second number only if it finds an empty space via random number. if it gets a filled space, do nothing. 
    //WILL RETURN WARNING ERROR IN CONSOLE IF NO EMPTY SPACE BUT GAME ISNT OVER. IT IS ON PURPOSE
    function genSecondNum() {
        //generate a random number between 0 to 15 (amount of cells)
        let rando = Math.floor(Math.random() * cellHome.length);

        //search for highest num in current game
        let choiceNum = Math.floor(Math.random() * 2);
        let highestNum = 0;
        for (let i = 0; i < width * width; i++) {

            if (Number(cellHome[i].innerHTML) > highestNum) {
                highestNum = Number(cellHome[i].innerHTML);
            }
        }
        //insert new number (2/4/8) into an empty cell
        if (cellHome[rando].innerHTML == 0) {
            if (highestNum < 20) {
                cellHome[rando].innerHTML = 2;
            }
            else if (highestNum < 70) {
                if (choiceNum < 1) {
                    cellHome[rando].innerHTML = 2;
                }
                else {
                    cellHome[rando].innerHTML = 4;
                }

            }
            else {
                if (choiceNum < 1) {
                    cellHome[rando].innerHTML = 4;
                }
                else {
                    cellHome[rando].innerHTML = 8;
                }
            }
        }
        
    }

    function styleNum() {
        for (let i = 0; i < width * width; i++) {
            if (cellHome[i].innerHTML == 0) {
                cellHome[i].style.backgroundColor = "#476b6b";
                cellHome[i].style.color = "#476b6b";
            }
            else if (cellHome[i].innerHTML == 2) {
                cellHome[i].style.backgroundColor = "#75a3a3";
                cellHome[i].style.color = "#996600";
            } 
            else if (cellHome[i].innerHTML == 4) {
                cellHome[i].style.backgroundColor = "#75a3a3";
                cellHome[i].style.color = "#996600";
            } 
            else if (cellHome[i].innerHTML == 8) {
                cellHome[i].style.backgroundColor = "#75a3a3";
                cellHome[i].style.color = "#996600";
            } 
            else if (cellHome[i].innerHTML == 16) {
                cellHome[i].style.backgroundColor = "#94b8b8";
                cellHome[i].style.color = "#996600";
            } 
            else if (cellHome[i].innerHTML == 32) {
                cellHome[i].style.backgroundColor = "#94b8b8";
                cellHome[i].style.color = "#664400";
            } 
            else if (cellHome[i].innerHTML == 64) {
                cellHome[i].style.backgroundColor = "#94b8b8";
                cellHome[i].style.color = "#664400";
            } 
            else if (cellHome[i].innerHTML == 128) {
                cellHome[i].style.backgroundColor = "#b3cccc";
                cellHome[i].style.color = "#664400";
            } 
            else if (cellHome[i].innerHTML == 256) {
                cellHome[i].style.backgroundColor = "#b3cccc";
                cellHome[i].style.color = "#664400";
            } 
            else if (cellHome[i].innerHTML == 512) {
                cellHome[i].style.backgroundColor = "#b3cccc";
                cellHome[i].style.color = "#cc3300";
            } 
            else if (cellHome[i].innerHTML == 1024) {
                cellHome[i].style.backgroundColor = "#d1e0e0";
                cellHome[i].style.color = "#ff0000";
            } 
            else if (cellHome[i].innerHTML == 2048) {
                cellHome[i].style.color = "#ff0000";
                cellHome[i].style.backgroundColor = "#000";
            } 
        }
    }

    function clickR() {
        for (let i = 0; i < width * width; i++) {
            //if the remainder/modulus is zero -- cell block 0/4/8/12 (leftmost cell), to divide the array into fours
            if (i % 4 === 0) {
                let firstCell = cellHome[i].innerHTML;
                let secondCell = cellHome[i+1].innerHTML;
                let thirdCell = cellHome[i+2].innerHTML;
                let fourthCell = cellHome[i + 3].innerHTML;
                let arrayRow = [Number(firstCell), Number(secondCell), Number(thirdCell), Number(fourthCell)];
                //console.log("1.The array is: " + arrayRow);

                //in the arrayRow, remove any zeroes(zeroes are generated from empty strings)
                let filteredArray = arrayRow.filter(num => num);
                //console.log("2. The existing number " + filteredArray);

                //check how many empty cell blocks. the Array.length should be 4, minus with filled number will result in how many cell block is empty.
                let missing = 4 - filteredArray.length;

                //generate new array with 0(will be empty strings), then put it in the left side --> e.g. (0, 0, 0, 2) -- since 2 will be pushed to the right
                let emptyCell = Array(missing).fill(0);
                //console.log("3. The new array generated minus any existing number in the row: " + emptyCell);

                // concat/combine the new array with the number at the right side. starts with the zero(emptyCell), concatinated with number so the number gets to be on the right
                // will be reversed if on clickL().
                let genNewArray = emptyCell.concat(filteredArray);
                //console.log("4. The new array: " + genNewArray);

                //generate the new array into the display. genNewArray[] is the new array, so input one by one into the existing cellHome[].
                cellHome[i].innerHTML = genNewArray[0];
                cellHome[i+1].innerHTML = genNewArray[1];
                cellHome[i+2].innerHTML = genNewArray[2];
                cellHome[i+3].innerHTML = genNewArray[3];

            }
        }
    }
    
    function clickL() {
        for (let i = 0; i < width * width; i++) {

            if (i % 4 === 0) {
                let firstCell = cellHome[i].innerHTML;
                let secondCell = cellHome[i + 1].innerHTML;
                let thirdCell = cellHome[i + 2].innerHTML;
                let fourthCell = cellHome[i + 3].innerHTML;
                let arrayRow = [Number(firstCell), Number(secondCell), Number(thirdCell), Number(fourthCell)];

                let filteredArray = arrayRow.filter(num => num);

                let missing = 4 - filteredArray.length;

                let emptyCell = Array(missing).fill(0);

                // filteredArray(number), and concat the zeroes on its right side
                let genNewArray = filteredArray.concat(emptyCell);

                cellHome[i].innerHTML = genNewArray[0];
                cellHome[i + 1].innerHTML = genNewArray[1];
                cellHome[i + 2].innerHTML = genNewArray[2];
                cellHome[i + 3].innerHTML = genNewArray[3];

            }
        }
    }

    function clickUp() {
        for (let i = 0; i < width; i++) {


            let firstCell = cellHome[i].innerHTML;
            let secondCell = cellHome[i + width].innerHTML;
            let thirdCell = cellHome[i + width * 2].innerHTML;
            let fourthCell = cellHome[i + width * 3].innerHTML;
            let arrayCol = [Number(firstCell), Number(secondCell), Number(thirdCell), Number(fourthCell)];

            let filteredArray = arrayCol.filter(num => num);

            let missing = 4 - filteredArray.length;

            let emptyCell = Array(missing).fill(0);

            let genNewArray = filteredArray.concat(emptyCell);

            cellHome[i].innerHTML = genNewArray[0];
            cellHome[i + width].innerHTML = genNewArray[1];
            cellHome[i + width * 2].innerHTML = genNewArray[2];
            cellHome[i + width * 3].innerHTML = genNewArray[3];


        }
    }

    function clickDown() {
        for (let i = 0; i < width; i++) {


            let firstCell = cellHome[i].innerHTML;
            let secondCell = cellHome[i + width].innerHTML;
            let thirdCell = cellHome[i + width*2].innerHTML;
            let fourthCell = cellHome[i + width*3].innerHTML;
            let arrayCol = [Number(firstCell), Number(secondCell), Number(thirdCell), Number(fourthCell)];

            let filteredArray = arrayCol.filter(num => num);

            let missing = 4 - filteredArray.length;

            let emptyCell = Array(missing).fill(0);

            let genNewArray = emptyCell.concat(filteredArray);

            cellHome[i].innerHTML = genNewArray[0];
            cellHome[i + width].innerHTML = genNewArray[1];
            cellHome[i + width*2].innerHTML = genNewArray[2];
            cellHome[i + width*3].innerHTML = genNewArray[3];


        }
    }

    //row being left-to-right numbers. use on clickR and clickL, shouldnt be used on clickUp clickDown
    function combineNumberRow() {
        for (let i = 0; i < width * width - 1; i++) {
            if (cellHome[i].innerHTML === cellHome[i + 1].innerHTML) {
                let newNum = Number(cellHome[i].innerHTML) + Number(cellHome[i + 1].innerHTML);
                // right/left-side gets new number
                cellHome[i + 1].innerHTML = newNum;
                cellHome[i].innerHTML = 0;
                score += newNum;
                scoreEntry.innerHTML = score;

                winCheck();
            }
        }
    }

    function combineNumberRowTwo() {
        for (let i = 0; i < width * width - 1; i++) {
            if (cellHome[i].innerHTML === cellHome[i + 1].innerHTML) {
                let newNum = Number(cellHome[i + 1].innerHTML) + Number(cellHome[i].innerHTML);
                // right/left-side gets new number
                cellHome[i].innerHTML = newNum;
                cellHome[i + 1].innerHTML = 0;
                score += newNum;
                scoreEntry.innerHTML = score;

                winCheck();
            }
        }
    }

    function combineNumberCol() {
        for (let i = 0; i < width * width - width; i++) {
            if (cellHome[i].innerHTML === cellHome[i + width].innerHTML) {
                let newNum = Number(cellHome[i].innerHTML) + Number(cellHome[i + width].innerHTML);
                // up/down-side gets new number
                cellHome[i + width].innerHTML = newNum;
                cellHome[i].innerHTML = 0;
                score += newNum;
                scoreEntry.innerHTML = score;

                winCheck();
            }
        }
    }

    function combineNumberColTwo() {
        for (let i = 0; i < width * width - width; i++) {
            if (cellHome[i].innerHTML === cellHome[i + width].innerHTML) {
                let newNum = Number(cellHome[i + width].innerHTML) + Number(cellHome[i].innerHTML);
                // up/down-side gets new number
                cellHome[i].innerHTML = newNum;
                cellHome[i + width].innerHTML = 0;
                score += newNum;
                scoreEntry.innerHTML = score;

                winCheck();
            }
        }
    }

    

    function tap(tapped) {
        if (tapped.keyCode === 39) {
            tapRight();
        }
        else if (tapped.keyCode === 37) {
            tapLeft();
        }
        else if (tapped.keyCode === 38) {
            tapUp();
        }
        else if (tapped.keyCode === 40) {
            tapDown();
        }
    }

    function tapLeft() {
        clickL();
        combineNumberRow();
        clickL();
        genNum();
        genSecondNum();
        styleNum();
        loseCheck();
    }
    function tapRight() {
        clickR();
        combineNumberRowTwo();
        clickR();
        genNum();
        genSecondNum();
        styleNum();
        loseCheck();
    }
    function tapUp() {
        clickUp();
        combineNumberCol();
        clickUp();
        genNum();
        genSecondNum();
        styleNum();
        loseCheck();
    }
    function tapDown() {
        clickDown();
        combineNumberColTwo();
        clickDown();
        genNum();
        genSecondNum();
        styleNum();
        loseCheck();
    }
    
    document.addEventListener('keyup', tap);

    function winCheck() {
        for (let i = 0; i < cellHome.length; i++) {
            if (cellHome[i] == 2048) {
                overlayMessage = "You win!";
                checkHighScore(score);
                document.removeEventListener('keyup', tap);
            }
        }
        //console.log("Check win");
    }

    function loseCheck() {
        let emptySpace = 0;
        let sameNumRow = 0;
        let sameNumCol = 0;
        //check if there are empty spaces or not
        for (let i = 0; i < cellHome.length; i++) {
            if (cellHome[i].innerHTML == 0) {
                emptySpace++;
            }
        }
        //check if no same number next to each other row
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let firstCell = cellHome[i].innerHTML;
                let secondCell = cellHome[i + 1].innerHTML;
                let thirdCell = cellHome[i + 2].innerHTML;
                let fourthCell = cellHome[i + 3].innerHTML;

                if (firstCell == secondCell || secondCell == thirdCell || thirdCell == fourthCell) {
                    sameNumRow++;
                }
            }
        }
        //check if no same number next to each other column
        for (let i = 0; i < width; i++) {
            let firstCell = cellHome[i].innerHTML;
            let secondCell = cellHome[i + width].innerHTML;
            let thirdCell = cellHome[i + width * 2].innerHTML;
            let fourthCell = cellHome[i + width * 3].innerHTML;

            if (firstCell == secondCell || secondCell == thirdCell || thirdCell == fourthCell) {
                sameNumCol++;
            }
        }

        let sameNum = sameNumRow + sameNumCol;

        if (emptySpace === 0 && sameNum === 0) {
            //overlayMessage = "Game Over";
            console.log("Check lose somehow you lose, because there are " + emptySpace + "empty space, or because there are " + sameNumRow + " row " + sameNumCol + " same number next to each other");
            let whatState = document.createElement('h3');
            whatState.innerHTML = "GAME OVER";
            checkHighScore(score);
            document.getElementById('gameState').appendChild(whatState);
            document.removeEventListener('keyup', tap);
        }
        
        console.log("Havent lost yet, cos' " + emptySpace + "empty space, or because there are " + sameNumRow + " row " + sameNumCol + " same number next to each other");
    }

    //SCORING WIP

    const highScoreLimit = 10;
    function loadHighScore() {

        //clear the highscore list
        document.getElementById('hsList').innerHTML = '';

        //load the highscore list
        let myScores = JSON.parse(localStorage.getItem('myScores')) || [];
        let highScoreList = document.getElementById('hsList');

        for (let i = 0; i < myScores.length; i++) {

            let highScoreListItem = document.createElement('li');
            highScoreListItem.innerHTML = myScores[i].name + "     (Score: " + myScores[i].score + ")";
            highScoreList.appendChild(highScoreListItem);
        }
    }

    function checkHighScore(score) {
        let myScores = JSON.parse(localStorage.getItem('myScores')) || [];
        let lowestScore = myScores[highScoreLimit - 1]?.score ?? 0;

        if (score > lowestScore) {
            let name = prompt('You got a highscore! Please enter your credit card number:');
            let newScore = { score, name };
            saveHighScore(newScore, myScores);
            loadHighScore();
        }
    }

    function saveHighScore(score, myScores) {
        myScores.push(score);
        myScores.sort((a, b) => b.score - a.score);
        myScores.splice(highScoreLimit);

        localStorage.setItem('myScores', JSON.stringify(myScores));
        
    }

    /*function clearHighScore() {
        let getSave = localStorage.getItem('myScores');
        var parsedSaveFile = JSON.parse(getSave);

        parsedSaveFile.splice(0, getSave.length);
        let myScores = JSON.stringify(parsedSaveFile);
        localStorage.setItem('myScores', myScores);
        loadHighScore();
    } */

    document.getElementById('clearButton').onclick = function clearHighScore() {
        let getSave = localStorage.getItem('myScores');
        let parsedSaveFile = JSON.parse(getSave);

        parsedSaveFile.splice(0, getSave.length);
        let myScores = JSON.stringify(parsedSaveFile);
        localStorage.setItem('myScores', myScores);
        loadHighScore();
    }
    
})



function resetButton() {
    window.location.reload();
}