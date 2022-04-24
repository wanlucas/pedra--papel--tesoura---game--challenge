const rulesHTML = document.querySelector('.rules');
const cBoxHTML = document.querySelector('.choice-box');
const playingHTML = document.getElementById('playing');

var pChoice, compCHoise, score = 0; 

document.querySelector('#rules').addEventListener("click", ()=>{
    rulesHTML.style.animation = 'active 0.6s forwards';
    document.body.style.setProperty('--op', 0.2);
});
document.getElementById('rules-close').addEventListener('click', ()=>{
    rulesHTML.style.animation = '';
    document.body.style.setProperty('--op', 1);
});

document.querySelectorAll('.choice-box button').forEach(bt=>{
    bt.addEventListener("click", ()=>{
        playingHTML.style.animation = '';
        setTimeout(()=>{
            cBoxHTML.style.visibility = "hidden";
            playingHTML.style.visibility = "visible";
            playingHTML.style.animation = 'moveRight 1s forwards';
            updatePlayerChoice(bt.id);
            updateCompChoice();
            startAnimations();
        },300)
    });
});
document.getElementById('play-again').addEventListener("click",()=> {
    cBoxHTML.style.animation = '';
    cBoxHTML.style.opacity = 0;
    setTimeout(()=> cBoxHTML.style.animation = ' moveLeft 0.5s forwards', 40);
    playingHTML.style.visibility = "hidden";
    cBoxHTML.style.visibility = "visible";
});

function updatePlayerChoice(choice) {
    playingHTML.querySelector('#player-choice').innerHTML = `
    <div>
    <button class="choice-bt" id="${choice}" aria-label="${choice}"><img src="images/icon-${choise}.svg" alt="${choise}"></button>
    </div>`
    pChoice = choice;
};
function updateCompChoice() {
    const choices = [ 'rock','paper','scissors'];
    const choice = choices[Math.round(Math.random() * 2)];
    document.querySelector('#comp-choice').innerHTML = `
    <div>
      <button class="choice-bt" id="${choice}" aria-label="${choice}"><img src="images/icon-${choise}.svg" alt="${choise}"></button>
    </div>` 
    compCHoise = choice;
}
function verifyWinner() {
    let tabel = ['rock','paper','scissors'], res;
    if(pChoice == compCHoise) return 0;
    if(tabel.findIndex(e=>e==pChoice) == 0) tabel.push(tabel.shift());
    res = tabel[tabel.findIndex(e=> e==pChoice) - 1] == compCHoise ? 1 : 2;
    score += res == 1 ? 1 : -1;
    return res;
}
function updateScore() { 
    document.getElementById('score').innerText = score;
}
function startAnimations() {
    const btSTL = document.querySelector('#comp-choice button').style, resSTL = document.querySelector('.result').style;
    const resultHTML = document.getElementById('result'), result = verifyWinner();
    if(result == 0) resultHTML.innerText = 'DRAW'
    else resultHTML.innerText = result == 1  ? 'YOU WIN': "YOU LOSE";
    btSTL.animation = '';
    resSTL.animation = '';
    setTimeout(()=> {
        btSTL.animation = 'flip 1s 1s forwards';
        resSTL.animation = 'fade 1.5s 2s forwards';
    },40);
    setTimeout(()=>updateScore(),2000);
}

