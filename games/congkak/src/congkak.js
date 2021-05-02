//width is the number of houses per row
let width = document.getElementById('widthInput').value;
//const width = 4;
document.getElementById("applyWidth").addEventListener("click", function () {
    width = document.getElementById('widthInput').value;
    
    gameStart();
});

gameStart();

function gameStart() {

    const storehouseGrid1 = document.querySelector('.storehousegrid1');
    const storehouseGrid2 = document.querySelector('.storehousegrid2');
    //const houseGrid = document.querySelector('.housegrid');
    const houseGrid1 = document.querySelector('.housegrid1');
    const houseGrid2 = document.querySelector('.housegrid2');

    

    let p2Home = []; //storeHouse, house...,
    let p1Home = []; //houses..., storeHouse,

    //create the 4x4 board
    function createGame() {
        //create storehouse player 2
        let store = document.createElement('div');
        //store.className = "storehouse p1score";
        store.className = "storehouse";
        store.innerHTML = 0;

        storehouseGrid1.appendChild(store);
        p2Home.push(store);

        //create houses TOP via width. gamemode to change width WIP
        for (let i = 0; i < width; i++) {
            let house = document.createElement('div');
            house.className = "house";
            house.innerHTML = 5;

            houseGrid1.appendChild(house);
            p2Home.push(house);
        }

        

        //create houses BOTTOM via width. gamemode to change width WIP
        for (let i = 0; i < width; i++) {
            let house = document.createElement('div');
            house.className = "p1house";
            house.innerHTML = 5;

            houseGrid2.appendChild(house);
            p1Home.push(house);
        }

        //create storehouse player 1
        let store2 = document.createElement('div');
        //store2.className = "storehouse p2score";
        store2.className = "storehouse";
        store2.innerHTML = 0;

        storehouseGrid2.appendChild(store2);
        p1Home.push(store2);

        //checking the array of houseHome array
        /*
        for (let i = 0; i < p1Home.length; i++) {
            let inside = p1Home[i].innerHTML;
            console.log("P1 Slot " + i + " : " + inside)
        }
        */
    }

    function removeGame() {
        let rem1 = document.getElementsByClassName("storehouse");
        while (rem1.length > 0) {
            rem1[0].parentNode.removeChild(rem1[0]);
        }
        let rem3 = document.getElementsByClassName("house");
        while (rem3.length > 0) {
            rem3[0].parentNode.removeChild(rem3[0]);
        }
        let rem4 = document.getElementsByClassName("p1house");
        while (rem4.length > 0) {
            rem4[0].parentNode.removeChild(rem4[0]);
        }
        
    }
    removeGame();
    createGame();

    checkBottomRow();
    //aiThink();
    //setTimeout(aimove, 4500);
    
    let lockClick = false; //prevent player from clicking house during action/AI action.
    //console.log("Starting lockClick: " + lockClick);
    let clickedHouseP1 = document.getElementsByClassName("p1house");

    //testing here
    //p1Home[6].innerHTML = 0;
    //testing here

    //Player's Turn
    for (let i = 0; i < clickedHouseP1.length; i++) {
        clickedHouseP1[i].style.cursor = "pointer";
        clickedHouseP1[i].onclick = function () {
            if (lockClick) {
                console.log("Click is locked: " + lockClick);
                return;
            }
            else {
                lockClick = true;
                clickedHouseP1[i].style.backgroundColor = "#000000";
                let marble = clickedHouseP1[i].innerHTML; //5
                clickedHouseP1[i].innerHTML = 0;

                //check if marble amount passes storehouse
                let beyond = clickedHouseP1.length - i;
                let startp2 = p2Home.length - 1;
                let restartp1 = 0;
                //console.log(startp2);
                //diff is the excess amount
                let diff = marble - beyond;
                //check last spot of marbling
                //console.log("Starting point: " + i);
                //console.log("End point: " + (Number(i) + Number(marble)));
                let marble_at_hand = marble;
                //console.log("Marble at hand: " + marble_at_hand);

                //if there is excess amount,
                if (diff > 0) {
                    for (let j = 1; j <= marble; j++) {
                        
                        if ((i + j) < p1Home.length) {
                            setTimeout(function () {
                                marble_at_hand = (Number(marble) - Number(j))
                                //console.log("Marble at hand: " + marble_at_hand);
                                let chosenOne = Number(p1Home[i + j].innerHTML);
                                p1Home[i + j].style.backgroundColor = "#80bfff";
                                p1Home[i + j].innerHTML = chosenOne + 1;
                            }, 500 * j);

                            setTimeout(function () {
                                p1Home[i + j].style.backgroundColor = "#fff";
                                clickedHouseP1[i].style.backgroundColor = "#fff";
                            }, 550 * j);
                        }
                        else {

                            setTimeout(function () {
                                //console.log("After timeout: " + startp2);
                                marble_at_hand = (Number(marble) - Number(j))
                                //console.log("Marble at hand: " + marble_at_hand);
                                if (startp2 > 0) {
                                    p2Home[startp2].style.backgroundColor = "#80bfff";
                                    let chosenTwo = Number(p2Home[startp2].innerHTML);
                                    p2Home[startp2].innerHTML = chosenTwo + 1;
                                }
                                else {
                                    if (marble_at_hand == 0) {
                                        p1Home[restartp1].style.backgroundColor = "#80bfff";
                                        let chosenThree = Number(p1Home[restartp1].innerHTML);
                                        //console.log("chosenThree is: " + chosenThree)
                                        if (chosenThree == 0) {
                                            p1Home[restartp1].style.backgroundColor = "#80bfff";
                                            p1Home[restartp1].innerHTML = chosenThree + 1;
                                            //steal
                                            p2Home[restartp1 + 1].style.backgroundColor = "#80bfff";
                                            let stealMarble = p2Home[restartp1 + 1].innerHTML;
                                            //console.log(restartp1 + 1);
                                            p2Home[restartp1 + 1].innerHTML = 0;
                                            let currentScore = p1Home[width].innerHTML;
                                            p1Home[width].innerHTML = Number(currentScore) + Number(stealMarble);
                                        }
                                        else {
                                            p1Home[restartp1].style.backgroundColor = "#80bfff";
                                            p1Home[restartp1].innerHTML = chosenThree + 1;
                                            p2Home[restartp1 + 1].style.backgroundColor = "#fff";
                                        }
                                    }
                                    else {
                                        p1Home[restartp1].style.backgroundColor = "#80bfff";
                                        let chosenThree = Number(p1Home[restartp1].innerHTML);
                                        p1Home[restartp1].innerHTML = chosenThree + 1;
                                    }
                                }
                            }, 500 * j);
                            setTimeout(function () {
                                if (startp2 > 0) {
                                    p2Home[startp2].style.backgroundColor = "#fff";
                                    startp2--;
                                    document.getElementById('turntables').innerHTML = "Waiting for Opponent...";
                                }
                                else {
                                    p1Home[restartp1].style.backgroundColor = "#fff";
                                    restartp1++;
                                    document.getElementById('turntables').innerHTML = "Waiting for Opponent...";
                                }
                            }, 550 * j);
                        }

                    }
                    document.getElementById('turntables').innerHTML = "Waiting for Opponent...";
                    
                    checkBottomRow();
                    //setTimeout(aiThink, 5000);
                    setTimeout(checkTopRow, 5000);

                }

                else if (diff == 0) {
                    for (let j = 1; j <= marble; j++) {
                        setTimeout(function () {
                            let chosenOne = Number(p1Home[i + j].innerHTML);
                            p1Home[i + j].style.backgroundColor = "#80bfff";
                            p1Home[i + j].innerHTML = chosenOne + 1;
                        }, 500 * j);

                        //changeback the color (animation)
                        setTimeout(function () {
                            p1Home[i + j].style.backgroundColor = "#fff";
                            clickedHouseP1[i].style.backgroundColor = "#fff";
                            //lockClick = false;
                        }, 550 * j);

                    }
                    lockClick = false;
                    document.getElementById('turntables').innerHTML = "Your Turn"
                    checkBottomRow();
                }

                else {
                    for (let j = 1; j <= marble; j++) {
                        setTimeout(function () {
                            marble_at_hand = (Number(marble) - Number(j));
                            if (marble_at_hand > 0) {
                                let chosenOne = Number(p1Home[i + j].innerHTML);
                                p1Home[i + j].style.backgroundColor = "#80bfff";
                                p1Home[i + j].innerHTML = chosenOne + 1;
                            }
                            else if (marble_at_hand == 0) {
                                let chosenOne = Number(p1Home[i + j].innerHTML);
                                //console.log("ChosenOne is: " + chosenOne)
                                if (chosenOne == 0) {
                                    p1Home[i + j].style.backgroundColor = "#80bfff";
                                    p1Home[i + j].innerHTML = chosenOne + 1;
                                    //steal
                                    p2Home[i + j + 1].style.backgroundColor = "#80bfff";
                                    let stealMarble = p2Home[i + j + 1].innerHTML;
                                    //console.log(i + j + 1);
                                    p2Home[i + j + 1].innerHTML = 0;
                                    let currentScore = p1Home[width].innerHTML;
                                    p1Home[width].innerHTML = Number(currentScore) + Number(stealMarble);
                                }
                                else {
                                    p1Home[i + j].style.backgroundColor = "#80bfff";
                                    p1Home[i + j].innerHTML = chosenOne + 1;
                                    p2Home[i + j + 1].style.backgroundColor = "#fff";
                                }
                            }
                        }, 500 * j);

                        //changeback the color (animation)
                        setTimeout(function () {
                            p1Home[i + j].style.backgroundColor = "#fff";
                            clickedHouseP1[i].style.backgroundColor = "#fff";
                            //lockClick = false;
                        }, 550 * j);

                    }
                    //lockClick = false;
                    document.getElementById('turntables').innerHTML = "Waiting for Opponent...";
                    checkBottomRow();
                    //setTimeout(aiThink, 5000);
                    setTimeout(checkTopRow, 5000);

                }
            };
        }
    }
    

    //A.I Function
    function aiThink() {
        document.getElementById('turntables').innerHTML = "Waiting for Opponent...";
        //animating AI braincells
        for (let aiHouse = 1; aiHouse < p2Home.length; aiHouse++) {
            setTimeout(function () {
                p2Home[aiHouse].style.backgroundColor = "#ff8080";
            }, 50 * aiHouse);
            setTimeout(function () {
                p2Home[aiHouse].style.backgroundColor = "#fff";
            }, 150 * aiHouse);

            setTimeout(function () {
                p2Home[aiHouse].style.backgroundColor = "#ff8080";
            }, 250 * aiHouse);
            setTimeout(function () {
                p2Home[aiHouse].style.backgroundColor = "#fff";
            }, 350 * aiHouse);

            setTimeout(function () {
                p2Home[aiHouse].style.backgroundColor = "#ff8080";
            }, 450 * aiHouse);
            setTimeout(function () {
                p2Home[aiHouse].style.backgroundColor = "#fff";
            }, 550 * aiHouse);
        }
        setTimeout(aimove, 5000);
    }

    function aimove() {
        //console.log(lockClick);
        let rando = Math.floor(Math.random() * (p2Home.length - 1)) + 1; //between 1-7. 0 is storeHouse.
        //console.log("AI clicked: " + rando)
        let p1start = 0;
        
        //if opponent clicked house with 0 marbles in it
        if (p2Home[rando].innerHTML == 0) {
            //console.log("AI clicked house 0")
            aimove();
        }
        else {
            p2Home[rando].style.backgroundColor = "#000000";
            let marble = p2Home[rando].innerHTML;
            let diff = marble - rando;
            p2Home[rando].innerHTML = 0;

            let marble_at_hand = marble;

            
            let p2restart = width;
            //console.log("AI's difference: " + diff)
            if (diff > 0) {
                for (let j = 1; j <= marble; j++) {

                    if ((rando - j) >= 0) {
                        setTimeout(function () {
                            marble_at_hand = Number(marble) - j;
                            let chosenOne = Number(p2Home[rando - j].innerHTML);
                            p2Home[rando - j].style.backgroundColor = "#ff8080";
                            p2Home[rando - j].innerHTML = chosenOne + 1;
                        }, 500 * j);
                        setTimeout(function () {
                            p2Home[rando - j].style.backgroundColor = "#fff";
                            p2Home[rando].style.backgroundColor = "#fff";
                        }, 540 * j);
                    }
                    else {
                            //console.log("After timeout: " + startp2);
                        marble_at_hand = (Number(marble) - Number(j))
                        if (p1start < width) {
                            let newp1start = p1start;
                            p1start++;
                            setTimeout(function () {
                                let chosenTwo = Number(p1Home[newp1start].innerHTML);
                                p1Home[newp1start].style.backgroundColor = "#ff8080";
                                p1Home[newp1start].innerHTML = chosenTwo + 1;
                            }, 500 * j);
                            setTimeout(function () {
                                p1Home[newp1start].style.backgroundColor = "#fff";
                                //p1start++;
                            }, 540 * j);
                        }
                        else {
                            if (marble_at_hand == 0) {
                                //p2Home[p2restart].style.backgroundColor = "#ff8080";
                                let chosenThree = Number(p2Home[p2restart].innerHTML);
                                if (chosenThree == 0) {
                                    setTimeout(function () {
                                        p2Home[p2restart].style.backgroundColor = "#ff8080";
                                        p2Home[p2restart].innerHTML = chosenThree + 1;
                                        //steal
                                        p1Home[p2restart - 1].style.backgroundColor = "#ff8080";
                                        let stealMarble = p1Home[p2restart - 1].innerHTML;
                                        //console.log(restartp1 + 1);
                                        p1Home[p2restart - 1].innerHTML = 0;
                                        let currentScore = p2Home[0].innerHTML;
                                        p1Home[width].innerHTML = Number(currentScore) + Number(stealMarble);
                                    }, 500 * j);
                                    setTimeout(function () {
                                        p2Home[p2restart].style.backgroundColor = "#fff";
                                        //steal
                                        p1Home[p2restart - 1].style.backgroundColor = "#fff";
                                    }, 540 * j);
                                }
                                else {
                                    setTimeout(function () {
                                        /*
                                        p1Home[restartp1].style.backgroundColor = "#ff8080";
                                        p1Home[restartp1].innerHTML = chosenThree + 1;
                                        p2Home[restartp1 + 1].style.backgroundColor = "#fff";
                                        */
                                        p2Home[p2restart].style.backgroundColor = "#ff8080";
                                        p2Home[p2restart].innerHTML = chosenThree + 1;

                                    }, 500 * j);
                                    setTimeout(function () {
                                        p2Home[p2restart].style.backgroundColor = "#fff";

                                    }, 540 * j);
                                }
                            }
                            else {
                                setTimeout(function () {
                                    p2Home[p2restart].style.backgroundColor = "#ff8080";
                                    let chosenThree = Number(p1Home[restartp1].innerHTML);
                                    p2Home[p2restart].innerHTML = chosenThree + 1;

                                }, 500 * j);
                                setTimeout(function () {
                                    p2Home[p2restart].style.backgroundColor = "#fff";

                                }, 540 * j);
                            }
                        }
                    }
                }
                lockClick = false;
                document.getElementById('turntables').innerHTML = "Your Turn";
            }
            else if (diff == 0){
                for (let j = 1; j <= marble; j++) {

                    if ((rando - j) >= 0) {
                        setTimeout(function () {
                            let chosenOne = Number(p2Home[rando - j].innerHTML);
                            p2Home[rando - j].style.backgroundColor = "#ff8080";
                            p2Home[rando - j].innerHTML = chosenOne + 1;
                        }, 500 * j);
                        setTimeout(function () {
                            p2Home[rando - j].style.backgroundColor = "#fff";
                            p2Home[rando].style.backgroundColor = "#fff";
                        }, 550 * j);
                    }
                    else {
                        setTimeout(function () {
                            let chosenTwo = Number(p1Home[p1start].innerHTML);
                            p2Home[p1start].style.backgroundColor = "#ff8080";
                            p2Home[p1start].innerHTML = chosenTwo + 1;
                        }, 500 * j);
                        setTimeout(function () {
                            p2Home[p1start].style.backgroundColor = "#fff";
                            p1start++;
                        }, 550 * j);
                    }
                }
                //setTimeout(aiThink, 5000);
                setTimeout(checkTopRow, 5000);
            }
            
            else {
                for (let j = 1; j <= marble; j++) {
                    setTimeout(function () {
                        marble_at_hand = (Number(marble) - Number(j));
                        if (marble_at_hand > 0) {
                            let chosenOne = Number(p2Home[rando - j].innerHTML);
                            p2Home[rando - j].style.backgroundColor = "#ff8080";
                            p2Home[rando - j].innerHTML = chosenOne + 1;
                        }
                        else if (marble_at_hand == 0) {
                            let chosenOne = Number(p2Home[rando - j].innerHTML);
                            //console.log("ChosenOne is: " + chosenOne)
                            if (chosenOne == 0) {
                                p2Home[rando - j].style.backgroundColor = "#ff8080";
                                p2Home[rando - j].innerHTML = chosenOne + 1;
                                //steal
                                p1Home[rando - j - 1].style.backgroundColor = "#ff8080";
                                let stealMarble = p1Home[rando - j - 1].innerHTML;
                                p1Home[rando - j - 1].innerHTML = 0;
                                let currentScore = p2Home[0].innerHTML;
                                p2Home[0].innerHTML = Number(currentScore) + Number(stealMarble);
                            }
                            else {
                                p2Home[rando - j].style.backgroundColor = "#ff8080";
                                p2Home[rando - j].innerHTML = chosenOne + 1;
                                //p2Home[i + j + 1].style.backgroundColor = "#fff";
                            }
                        }
                    }, 500 * j);

                    //changeback the color (animation)
                    setTimeout(function () {
                        p2Home[rando - j].style.backgroundColor = "#fff";
                        p2Home[rando].style.backgroundColor = "#fff";
                        p1Home[rando - j - 1].style.backgroundColor = "#fff";
                    }, 550 * j);

                }
                lockClick = false;
                document.getElementById('turntables').innerHTML = "Your Turn";
                
            }
            
        }
    }
    

    function checkTopRow() {
        let entryExist = 0;
        for (let i = 1; i < width; i++) {
            if (p2Home[i].innerHTML != 0) {
                entryExist++;
            }
        }

        if (entryExist == 0) {
            //document.getElementById('turntables').innerHTML = "Game End";
            let p1score = p1Home[width].innerHTML;
            let p2score = p2Home[0].innerHTML;
            for (let j = 0; j < width; j++) {
                p1score = Number(p1score) + Number(p1Home[j].innerHTML)
                p1Home[j].innerHTML = 0;
                p1Home[width].innerHTML = p1score;
            }
            if (p1score > p2score) {
                document.getElementById('turntables').innerHTML = "You Win!";
               
            }
            else {
                document.getElementById('turntables').innerHTML = "YOU ARE A LOSER!";
                
            }
        }
        else {
            //console.log("checkTopLine says game continue: " + entryExist);
            aiThink();
        }
    }
    function checkBottomRow() {
        let entryExist = 0;
        for (let i = 0; i < width; i++) {
            if (p1Home[i].innerHTML != 0) {
                entryExist++;
            }
        }

        if (entryExist == 0) {
            //document.getElementById('turntables').innerHTML = "Game End";
            let p1score = p1Home[width].innerHTML;
            let p2score = p2Home[0].innerHTML;
            for (let j = 1; j < width+1; j++) {
                p2score = Number(p2score) + Number(p2Home[j].innerHTML)
                p2Home[j].innerHTML = 0;
                p2Home[0].innerHTML = p2score;
            }
            if (p1score > p2score) {
                document.getElementById('turntables').innerHTML = "You Win!";
                
            }
            else {
                document.getElementById('turntables').innerHTML = "YOU ARE A LOSER!";
                
            }
        }
        else {
            //console.log("checkBottomLine says game continue: " + entryExist);
        }
    }

}

function resetButton() {
    window.location.reload();
}