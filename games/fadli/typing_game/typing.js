window.addEventListener('load', init);

// Globals
let time = 90;

let words = ['Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked .If Peter Piper picked a peck of pickled peppers. Where’s the peck of pickled peppers Peter Piper picked ?',
'Betty Botter bought some butter. But she said the butter’s bitter If I put it in my batter, it will make my batter bitter. But a bit of better butter will make my batter better. So ‘twas better Betty Botter bought a bit of better butter',
'How much wood would a woodchuck chuck if a woodchuck could chuck wood? He would chuck, he would, as much as he could, and chuck as much wood as a woodchuck would if a woodchuck could chuck wood.',
'Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn’t very fuzzy, was he ?',
'Peter Piper picked a peck of pickled peppers. Did Peter Piper pick a peck of pickled peppers? If Peter Piper picked a peck of pickled peppers, where’s the peck of pickled peppers Peter Piper picked?',
'When a doctor doctors a doctor, does the doctor doing the doctoring doctor as the doctor being doctored wants to be doctored or does the doctor doing the doctoring doctor as he wants to doctor?',
'Through three cheese trees, three free fleas flew. While these fleas flew, freezy breeze blew. Freezy breeze made these three trees freeze. Freezy trees made these trees’ cheese freeze. That’s what made these three free fleas sneeze.',
'How many berries could a bare berry carry, if a bare berry could carry berries? Well, they can’t carry berries (which could make you very wary) but a bare berry carried is more scary!',
'How many cookies could a good cook cook If a good cook could cook cookies? A good cook could cook as much cookies as a good cook who could cook cookies.',
'How much ground would a groundhog hog, if a groundhog could hog ground? A groundhog would hog all the ground he could hog if a groundhog could hog ground.',
'Susie works in a shoeshine shop. Where she shines, she sits, and where she sits, she shines.',
'There was a fisherman named Fisher who fished for some fish in a fissure. Till a fish with a grin, pulled the fisherman in. Now they’re fishing the fissure for Fisher.']


//DOM elements

let wordOutput = document.querySelector(".word_output");  //quote

let wordInput = document.querySelector(".word_input");  //input_area

let message = document.querySelector(".message");

let countTime = document.querySelector(".show_time");

let restartBtn = document.querySelector(".restart_btn");

//cpm, wpm, errors, accuracy, score section
let accuracy_text = document.querySelector(".show_accuracy");
let error_text = document.querySelector(".show_errors");
let cpm_text = document.querySelector(".show_cpm");
let wpm_text = document.querySelector(".show_wpm");
let scores_text = document.querySelector(".show_score");

let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
let scores_group = document.querySelector(".score");
  
//
let timeLeft = time;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_word = "";
let wordNo = 0;
let score = 0;
let timer = null;
let thePlayer;

//initialize game

function  init(){
	
	//start matching on word input
	wordInput.addEventListener('input', startMatch);

}


// list the highest score 
let numHighScores = 10;
let High_Scores = 'highScores';

let highScoreString = localStorage.getItem(High_Scores);
let highScores = JSON.parse(highScoreString) || [];

let lowestScore = highScores[numHighScores - 1]?.score ?? 0;

function checkHighScores(score){
	let highScores = JSON.parse(localStorage.getItem(High_Scores)) ||[];
	let lowestScore = highScores[numHighScores -1]?.score ?? 0;

	if (score > lowestScore){
		savehighScore(score, highScores); //TODO
		showHighScores(); //TODO
	}
}

function gameOver(){
	// Other game over logic

	checkHighScores(account.score);
}

// The array of the words
function matchWords() {
	wordOutput.textContent = null;
	current_word = words[wordNo];
	
	// separate each character and make an element 
	// out of each of them to individually style them
	current_word.split('').forEach(char => {
	  const charSpan = document.createElement('span')
	  charSpan.innerText = char;
	  wordOutput.appendChild(charSpan)
	})
	
	// roll over to the first texts
	if (wordNo < words.length -1)
	  wordNo++;
	else
	  wordNo = 0;
  }


//  This is to show what the text you type inside the box is the same in the arrays, which show error type too. 
function showWord() {
  
	// get current input text and split it
	show_input = wordInput.value;
	show_input_array = show_input.split('');
	
	// increment total characters typed
	characterTyped++;
	
	errors = 0;
	
	wordsSpanArray = wordOutput.querySelectorAll('span');
	wordsSpanArray.forEach((char, index) => {
	  let typedChar = show_input_array[index]
	
	  // character not currently typed
	  if (typedChar == null) {
		char.classList.remove('correct_char');
		char.classList.remove('incorrect_char');
	
		// correct character
	  } else if (typedChar === char.innerText) {
		char.classList.add('correct_char');
		char.classList.remove('incorrect_char');
	
		// incorrect character
	  } else {
		char.classList.add('incorrect_char');
		char.classList.remove('correct_char');
	
		// increment number of errors
		errors++;
	  }
	});
	
	// display the number of errors
	error_text.textContent = total_errors + errors;
	
	// update accuracy text
	let correctCharacters = (characterTyped - (total_errors + errors));
	let accuracyVal = ((correctCharacters / characterTyped) * 100);
	accuracy_text.textContent = Math.round(accuracyVal);
	
	 // if current text is completely typed
  // irrespective of errors
  if (show_input.length == current_word.length) {
    matchWords();
  
    // update total errors
    total_errors += errors;
  
    // clear the input area
    wordInput.value = "";
  }
}

function startGame() {

	resetValues()
	startMatch();
	matchWords();
	
	// clear old and start a new timer
	clearInterval(timer);
	timer = setInterval(updateTimer, 1000);

}

function startMatch(){
	if(matchWords && showWord === score){
		time = timeLeft + 2;
		showWord(words);
		wordInput.value = '';
		errors ="";
		//increment
		score+=0;
	}
	
	// if score is -1, display 0
	if (score === -1){
		scores_text.innerText = 0;
	} else{
		scores_text.innerText = score++;
	}
} 
	
// reset all the values
	function resetValues() {
	timeLeft = time;
	timeElapsed = 0;
	errors = 0;
	total_errors = 0;
	accuracy = 0;
	characterTyped = 0;
	wordNo = 0;
	score = 0;
	wordInput.disabled = false;
	
	wordInput.value = "";
	wordOutput.textContent = 'Click on area below to start typing.';
	accuracy_text.textContent = 0;
	countTime.textContent= timeLeft;
	error_text.textContent = 0;
	scores_text.textContent = 0;
	restartBtn.style.display = "none";
	cpm_group.style.display = "none";
	wpm_group.style.display = "none";
	scores_group.style.display = "none";
	}


	function updateTimer() {
	if (timeLeft > 0) {
		// decrease the current time left
		timeLeft--;
		
		timeElapsed++;

		// update the timer text
		countTime.innerText= timeLeft;
	}	
	else if (timeLeft === 0){
		// game is over
		finishGame();
	}
	countTime.innerText = timeLeft;
}

  function finishGame() {
	// stop the timer
	clearInterval(timer);
	
	// disable the input area
	wordInput.disabled = true;
	
	// show finishing text
	wordOutput.textContent = "Click on restart to start a new game.";
	
	// display restart button
	restartBtn.style.display = "inline-block";
	restartBtn.style.alignItems = "center";
	
	// calculate cpm and wpm
	cpm = Math.round(((characterTyped / timeElapsed) * 60));
	wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
	
	// update cpm and wpm text
	cpm_text.textContent = cpm;
	wpm_text.textContent = wpm;
	scores_text.textContent = score;
	
	// display the cpm and wpm
	cpm_group.style.display = "block";
	wpm_group.style.display = "block";
	scores_group.style.display = "block";
  }
