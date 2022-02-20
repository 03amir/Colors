const cards = document.getElementById("cards");

const playAgain = document.getElementById("playAgain");

const hardMode = document.getElementById("hardMode");

const mainColor = document.getElementById("mainColor");

const pick = document.getElementById("pick");

let tryLeft = 2;

const trylefts = document.getElementById("trylefts");
const trydiv = document.getElementById("trydiv");

trylefts.innerHTML= tryLeft;



let colors = [];

let targetText;

let usedColor = [];

let num;

function generateColors(nm) {
  for (let i = 0; i < nm; i++) {
    for (let i = 0; i < 1; i++) {
      const rgb1 = Math.floor(Math.random() * 255);
      const rgb2 = Math.floor(Math.random() * 255);
      const rgb3 = Math.floor(Math.random() * 255);

      const colo = {
        rgb1,
        rgb2,
        rgb3,
      };

      colors.push(colo);
    }
  }

  
}

generateColors(3);

playAgain.addEventListener("click", generateAll);
hardMode.addEventListener("click", hard);

function generateAll() {
  colors = [];
 usedColor = [];
 trydiv.opacity=1;
  removeAll();
  generateColors(3);
  arrange();
  createCard();
  setcolortext();
  console.log("hi");
  pick.innerHTML="Pick The Color";
  
  tryLeft=2;
  trylefts.innerHTML= tryLeft;
}

function hard() {
  colors = [];
  usedColor = [];
  trydiv.opacity=1;
  removeAll();
  generateColors(6);
  arrange();
  createCard();
  setcolortext();
  console.log("hi");
  pick.innerHTML="Pick The Color";
 
  tryLeft=3;
  trylefts.innerHTML= tryLeft;
}

function removeAll() {
  while (cards.firstChild) {
    cards.removeChild(cards.lastChild);
  }
}

function setcolortext() {
  targetText = `rgb(${colors[0].rgb1}, ${colors[0].rgb2}, ${colors[0].rgb3})`;
  mainColor.innerHTML = targetText;
}

setcolortext();

function arrange(){

for (let i = 0; i < colors.length; i++) {
  num = Math.floor(Math.random() * colors.length);
 
  while (usedColor.includes(num)) {
    num = Math.floor(Math.random() * colors.length);
  }
  usedColor.push(num);
}}
arrange()


console.log(Math.floor(Math.random() * colors.length));

console.log(usedColor);

function createCard() {
  for (let i = 0; i < colors.length; i = i + 1) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.addEventListener("click", clickhandlr);
    cardDiv.style.backgroundColor = `rgb(${colors[usedColor[i]].rgb1},${colors[usedColor[i]].rgb2},${colors[usedColor[i]].rgb3})`;
    cards.appendChild(cardDiv);
    
  }
}

createCard();

function clickhandlr() {

  if(!mainColor.innerHTML.includes("YOU WIN")){
    tryLeft=tryLeft-1;

  }

 
  
  if (this.style.backgroundColor == targetText) {
    let childs = cards.children;
    
   // tryLeft=tryLeft;
    
    pick.innerHTML=""
    mainColor.innerHTML= "YOU WIN";
   
    trydiv.opacity=0;

   // let index = 0;

    Array.prototype.forEach.call(childs, (child) => {
     // child.innerHTML = winner[index];
     child.style.opacity = 1;
      child.style.backgroundColor = this.style.backgroundColor;
     // index++;
    });
  } else {
    this.style.opacity = 0;
   
  }

  

 
  console.log(tryLeft + " tryleft");
  chechtry();
  trylefts.innerHTML=tryLeft
  
}


function chechtry(){
  if (tryLeft===0){

    
    console.log("left the tries")
    let childs = cards.children;

   

    Array.prototype.forEach.call(childs, (child) => {
     
       child.removeEventListener("click", clickhandlr);
      // index++;
     });

  }
  if(tryLeft===0 && !mainColor.innerHTML.includes("YOU WIN")){

    pick.innerHTML=""
    mainColor.innerHTML= "YOU LOOSE";

  }

 
}

