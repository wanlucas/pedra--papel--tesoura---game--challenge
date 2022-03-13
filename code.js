const rulesHTML = document.querySelector('.rules');
const cBoxHTML = document.querySelector('.choise-box');
const playingHTML = document.getElementById('playing');

var pChoise, compCHoise, score = 0; 

document.querySelector('#rules').addEventListener("click", ()=>{
    rulesHTML.style.animation = 'actived 0.6s forwards';
    document.body.style.setProperty('--op', 0.2);
});
document.getElementById('rules-close').addEventListener('click', ()=>{
    rulesHTML.style.animation = '';
    document.body.style.setProperty('--op', 1);
});

document.querySelectorAll('.choise-box button').forEach(bt=>{
    bt.addEventListener("click", ()=>{
        playingHTML.style.animation = '';
        setTimeout(()=>{
            cBoxHTML.style.visibility = "hidden";
            playingHTML.style.visibility = "visible";
            playingHTML.style.animation = 'moveRight 1s forwards';
            updatePlayerChoise(bt.id);
            updateCompChoise();
            startAnimations();
        },300)
    });
});
document.getElementById('play-again').addEventListener("click",()=> {
    cBoxHTML.style.animation = '';
    cBoxHTML.style.opacity = 0;
    setTimeout(()=> cBoxHTML.style.animation = 'moveUp 0.5s forwards', 40);
    playingHTML.style.visibility = "hidden";
    cBoxHTML.style.visibility = "visible";
});

function updatePlayerChoise(choise) {
    playingHTML.querySelector('#player-choise').innerHTML = `
    <div>
    <button class="choise-bt" id="${choise}" aria-label="${choise}"><img src="images/icon-${choise}.svg" alt="${choise}"></button>
    </div>`
    pChoise = choise;
};
function updateCompChoise() {
    const choises = [ 'rock','paper','scissors'];
    const choise = choises[Math.round(Math.random() * 2)];
    document.querySelector('#comp-choise').innerHTML = `
    <div>
       <button class="choise-bt" id="${choise}" aria-label="${choise}"><img src="images/icon-${choise}.svg" alt="${choise}"></button>
    </div>` 
    compCHoise = choise;
}
function verifyWinner() {
    let tabel = ['rock','paper','scissors'], res;
    if(pChoise == compCHoise) return 0;
    if(tabel.findIndex(e=>e==pChoise) == 0) tabel.push(tabel.shift());
    res = tabel[tabel.findIndex(e=> e==pChoise) - 1] == compCHoise ? 1 : 2;
    score += res == 1 ? 1 : -1;
    return res;
}
function updateScore() { 
     document.getElementById('score').innerText = score;
}
function startAnimations() {
    const btSTL = document.querySelector('#comp-choise button').style, resSTL = document.querySelector('.result').style;
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

