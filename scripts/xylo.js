//key action
document.body.addEventListener("keydown", keyDown);
function keyDown(event) {
  //Q
  if (event.keyCode == 81) {
   const do1 = new Audio("sound/do1.mp3"); 
   do1.play();
  }
  //W
  if (event.keyCode == 87) {
   const re = new Audio("sound/re1.mp3");
   re.play();
  }
  //E
  if (event.keyCode == 69) {
   const mi = new Audio("sound/mi1.mp3");
   mi.play();
  }
  //R
  if (event.keyCode == 82) {
   const fa = new Audio("sound/fa1.mp3");
   fa.play();
  }
  //T
  if (event.keyCode == 84) {
   const sol = new Audio("sound/sol1.mp3");
   sol.play();
  }
  //Y
  if (event.keyCode == 89) {
   const la = new Audio("sound/la1.mp3");
   la.play();
  }
  //U
  if (event.keyCode == 85) {
   const ti = new Audio("sound/si1.mp3");
   ti.play();
  }
  //I
  if (event.keyCode == 73) {
   const do2 = new Audio("sound/do2.mp3");
   do2.play();
  }
}

//click action
function do1Btn(){
  const do1 = new Audio("sound/do1.mp3"); 
  do1.play();
}

function reBtn(){
  const re = new Audio("sound/re1.mp3");
  re.play();
}

function miBtn(){
  const mi = new Audio("sound/mi1.mp3");
  mi.play();
}

function faBtn(){
  const fa = new Audio("sound/fa1.mp3");
  fa.play();
}

function solBtn(){
  const sol = new Audio("sound/sol1.mp3");
  sol.play();
}

function laBtn(){
  const la = new Audio("sound/la1.mp3");
  la.play();
}

function tiBtn(){
  const ti = new Audio("sound/si1.mp3");
  ti.play();
}

function do2Btn(){
  const do2 = new Audio("sound/do2.mp3");
  do2.play();
}