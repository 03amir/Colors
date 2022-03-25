//letting the user know hoe to play
alert(
  "This is a colour guessing game , you have to guess the color based on the givee RGB(red,green,blue) value....in rgb (225,225,225)=WHITE  and (0,0,0)=BLACK...rest is upon you :("
);

//getting all the eliment which will need

const cards = document.getElementById("cards");

const easyMode = document.getElementById("easyMode");

const hardMode = document.getElementById("hardMode");

const targetedColor = document.getElementById("targetedColor");

const pick = document.getElementById("pick");

const tryLefts = document.getElementById("tryLefts");

const tryDiv = document.getElementById("tryDiv");

let tryLeftCount = 2; // for the easy mode which is predefined for the first time

tryLefts.innerHTML = tryLeftCount; // displaying how much try left

let colors = []; //for storing the genetaed colours

let targetedText;

let randomList = [];

let num; // will define how much colours we will generate
easyMode.addEventListener("click", easy);
hardMode.addEventListener("click", hard);

//generating random RGB value based upon difficulty level and storing them in the colors array
function generateColors(nm) {
  for (let i = 0; i < nm; i++) {
    for (let i = 0; i < 1; i++) {
      const rgb1 = Math.floor(Math.random() * 255);
      const rgb2 = Math.floor(Math.random() * 255);
      const rgb3 = Math.floor(Math.random() * 255);

      const newColor = {
        rgb1,
        rgb2,
        rgb3,
      };

      colors.push(newColor);
    }
  }
}

generateColors(3);

//creating a array of random number depending upon generated color length

function arrange() {
  for (let i = 0; i < colors.length; i++) {
    num = Math.floor(Math.random() * colors.length);

    while (randomList.includes(num)) {
      num = Math.floor(Math.random() * colors.length);
    }
    randomList.push(num);
  }
}
arrange();

// setting and showing the rgb value, which the player have to choose
function setColorText() {
  targetedText = `rgb(${colors[0].rgb1}, ${colors[0].rgb2}, ${colors[0].rgb3})`;
  targetedColor.innerHTML = targetedText;
}

setColorText();

//creating the cards with colors
function createCard() {
  for (let i = 0; i < colors.length; i = i + 1) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.addEventListener("click", clickhandlr);
    cardDiv.style.backgroundColor = `rgb(${colors[randomList[i]].rgb1},${
      colors[randomList[i]].rgb2
    },${colors[randomList[i]].rgb3})`;
    cards.appendChild(cardDiv);
  }
}

createCard();

//handling the clicks
function clickhandlr() {
  //if user not won
  if (!targetedColor.innerHTML.includes("YOU WIN")) {
    tryLeftCount = tryLeftCount - 1;
  }

  //checking if user win
  if (this.style.backgroundColor == targetedText) {
    let childs = cards.children;

    pick.innerHTML = "";
    targetedColor.innerHTML = "YOU WIN";

    tryDiv.opacity = 0;

    //seting all the card with the same color that has given  to player to choose
    Array.prototype.forEach.call(childs, (child) => {
      child.style.opacity = 1;
      child.style.backgroundColor = this.style.backgroundColor;
    });
  } else {
    //if it is not the right card
    
    this.style.opacity = 0;
    
  }
  tryLefts.innerHTML = tryLeftCount; 
  //checking how many try left
  chechTryLeft();
  
}

function chechTryLeft() {
  if (tryLeftCount === 0) {
    let childs = cards.children;
    //if all tries over then disabling the click event
    Array.prototype.forEach.call(childs, (child) => {
      child.removeEventListener("click", clickhandlr);
    });
  }

  //if user also lose the last chance
  if (tryLeftCount === 0 && !mainColor.innerHTML.includes("YOU WIN")) {
    pick.innerHTML = "";
    mainColor.innerHTML = "YOU LOOSE";
  }
}



//clearing previous all the values and setting new game for easy mode
function easy() {
  colors = [];
  randomList = [];
  tryDiv.opacity = 1;
  removeAllCards()
  generateColors(3);
  arrange();
  createCard();
  setColorText();
  pick.innerHTML = "Pick The Color";
  tryLeftCount = 2;
  tryLefts.innerHTML = tryLeftCount;
}

//clearing previous all the values and setting new game for hard mode
function hard() {
  colors = [];
  randomList = [];
  tryDiv.opacity = 1;
  removeAllCards()
  generateColors(6);
  arrange();
  createCard();
  setColorText();
  pick.innerHTML = "Pick The Color";
  tryLeftCount = 3;
  tryLefts.innerHTML = tryLeftCount;
}

//for removing all the card of previoius game
function removeAllCards() {
  while (cards.firstChild) {
    cards.removeChild(cards.lastChild);
  }
}
