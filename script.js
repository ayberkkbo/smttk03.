const wordlisturl="wordlist.txt";
let userWord="";
const letters = 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.Delete.u.v.w.x.y.z.Enter'.split('.');
const gameBoard = document.querySelector(".gameboard");
const infoText = document.querySelector(".info-text");
const scorePage = document.querySelector(".main .wrapper .score-page");
const page = document.querySelector(".page");
const keys = document.querySelector(".keys");
const howToplay = document.querySelector(".howtoplay-div");
const animation = document.querySelector(".animation");
const howToPlayWindow = document.querySelector(".main .howtoplay");
const creatorBtn = document.querySelector(".creator-btn");
const languages=document.querySelectorAll(".language-icon");


const setLanguage=thislang=>{
  let text=document.getElementById("coming-soon");
  languages.forEach(lang=>lang.classList.remove("active"));
  thislang.classList.add("active");
  if(thislang.getAttribute("id")=="tr"){
    text.classList.add("active");
    setTimeout(()=>{
      text.classList.remove("active");
      document.getElementById("tr").classList.remove("active");
      document.getElementById("en").classList.add("active");
    },2000);
  }
} 

languages.forEach(lang=>{
  lang.addEventListener("click",()=>{setLanguage(lang)})
})

let hiddenTimer=0;
let word = "hello";
let row = 0
let col = 0
let cellSize = 55;
let cellGap=20;
let isWin=false;
let currentIndex = col + row * word.length;
let wordExistController=false;
const timer = ms => new Promise(res => setTimeout(res, ms))
infoText.innerHTML = "Type the word and press enter";
page.style.opacity=1;

howToplay.addEventListener("click",()=>{
  howToplay.classList.toggle("clicked");
  howToPlayWindow.classList.toggle("active");
  howToPlayWindow.classList.remove("first");
  if(howToPlayWindow.classList.contains("active")){
    gameBoard.style.opacity=0.05;
    keys.style.opacity=0.1;  
  }
  else{
    gameBoard.style.opacity=1;
      keys.style.opacity=0.9;
  }
})



async function getWordList(){
  const response = await fetch(wordlisturl);
  const data = await response.text();
  return data.split("\n");
}

async function getRandomWord(){
  const response = await fetch(wordlisturl);
  let data = await response.text();
  data=data.split("\n");
  return data[Math.floor(Math.random()*data.length)];
}
getRandomWord().then(data=>{
  word=data
  console.log("word:"+word);
  gameBoard.style.width = `${(cellSize*word.length)+cellGap*(word.length-2)}px`;
  gameBoard.style.gap=`${cellGap/2}px`;
  createBoard();
  
});





function createBoard(){
  for(let i=0;i<6*word.length;i++){
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id",i);
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    gameBoard.appendChild(cell);
    if(i<letters.length){
      let key = document.createElement("div");
      key.classList.add(letters[i].toLowerCase());
      key.classList.add("key");
      key.innerHTML = letters[i];
      keys.appendChild(key);
      key.addEventListener("click",()=>{
        clickedKey(letters[i]);
      })
    }
    
  }
}




async function clickedKey(letter){
  if(!isWin){
    currentIndex=col+row*word.length;
  if(letter=="Delete" || letter=="Backspace"){
    if(col>0) {
    gameBoard.children[currentIndex-1].innerHTML = "";
    col--;
    }
  }
  else if (letter=="Enter"){
    if(col==word.length){
      userWord="";
      for(let i=currentIndex-word.length;i<currentIndex;i++){
        userWord+=gameBoard.children[i].innerHTML.toLowerCase();
      }
      isWordExist(userWord).then(await timer(400))
      if(wordExistController){
        row++;
        col=0;
        userWord="";
        infoText.style.opacity=0;
        for(let i=currentIndex-word.length;i<currentIndex;i++){
          userWord+=gameBoard.children[i].innerHTML.toLowerCase();
        }
        if(row>5){
          checkWord(word,userWord);
          await timer(300);
          gameOver();
        }
        else checkWord(word,userWord);
      }
      else{
        infoText.style.opacity=0;
        await timer(300);
        infoText.innerHTML = "Word cannot be found in dictionary";
        infoText.style.color = "#e80000";
        await timer(80);
        infoText.style.opacity=1;
      }
    }
  }
  
  else if(col<word.length && letters.includes(letter)){
    gameBoard.children[currentIndex].innerHTML = letter.toUpperCase();
    col++;
    }
  }
}



async function checkWord(word,userWord){ 
  isWin=true;  
  let wordLetters=word.split("");
  let userWordLetters=userWord.split("");
    for(let i=0;i<wordLetters.length;i++){
      await timer(300);
      if(wordLetters.includes(userWordLetters[i])){
        if(wordLetters[i]==userWordLetters[i]){
          gameBoard.children[(row-1)*word.length+i].classList.add("green")
        }
        else{
          gameBoard.children[(row-1)*word.length+i].classList.add("yellow");
          isWin=false;
        }
      }
      
      else{
        gameBoard.children[(row-1)*word.length+i].classList.add("red");;
        document.querySelector(`.key.${userWordLetters[i]}`).classList.add("doesnt-exist")
        isWin=false;
      }
    }

    if(isWin){
      await timer(200);
      animation.innerHTML ='<lottie-player src="https://lottie.host/2d384c56-8b9b-47eb-85bd-d2bf89be3621/wIhCk7laDz.json" background="transparent" speed="1" style="width: 500px; height: 500px" direction="1" mode="normal" autoplay></lottie-player>';
      await timer(1000);
      setScoreWindow("show");
      document.querySelector(".score-page p").innerHTML = `You got in ${row} attempts`;
      gameBoard.style.opacity=0.05;
      keys.style.opacity=0.1;
      let btn = document.createElement("button");
      btn.innerHTML = "Play Again";
      btn.classList.add("play-again");
      scorePage.appendChild(btn);
      btn.addEventListener("click",()=>{
        location.reload();
      })
    }
  }

async function isWordExist(w){
  getWordList().then(data=>{ 
  if(data.includes(w)){
    wordExistController=true
  }
  else{
    wordExistController=false;
  }
  })
}


function setScoreWindow(showOrHide){
  scorePage.classList.add("active");
  if(showOrHide=="hide") {
    scorePage.classList.remove("show");
    scorePage.classList.add("hide");
  }
  else if(showOrHide=="show"){
    scorePage.classList.remove("hide");
    scorePage.classList.add("show");
  }
}



document.addEventListener("keydown",(e)=>{
  clickedKey(e.key);
})

async function gameOver(){
  await timer(1000);
      setScoreWindow("show");
      scorePage.classList.add("lost");
      document.querySelector(".score-page p").innerHTML = `You lost the game. The word was <br> "${word}"`;
      gameBoard.style.opacity=0.05;
      keys.style.opacity=0.1;
      let btn = document.createElement("button");
      btn.innerHTML = "Play Again";
      btn.classList.add("play-again");
      scorePage.appendChild(btn);
      btn.addEventListener("click",()=>{
        location.reload();
      })
}


creatorBtn.addEventListener("click",()=>{
  if(hiddenTimer>8){
    creatorBtn.innerHTML =word
  }
  else{
    hiddenTimer++;
  }
})


