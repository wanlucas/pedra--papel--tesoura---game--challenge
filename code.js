const rulesHTML = document.querySelector('.rules');
const cBoxHTML = document.querySelector('.choise-box');
const header = document.querySelector('header');
const playingHTML = document.getElementById('playing');

document.querySelector('#rules').addEventListener("click", ()=>{
    rulesHTML.style.animation = 'actived 0.6s forwards';
    document.body.style.setProperty('--op', 0.2);
});
document.getElementById('rules-close').addEventListener('click', ()=>{
    rulesHTML.style.animation = '';
    document.body.style.setProperty('--op', 1);
});

cBoxHTML.querySelectorAll('button').forEach(bt=>{
    bt.addEventListener("click", ()=>{
        setTimeout(()=>{
            cBoxHTML.style.visibility = "hidden";
            playingHTML.style.visibility = "visible";
            updatePlayerChoise(bt.id);
            updateCompChoise();
        },1000)
    });
});

function updatePlayerChoise(choise) {
    playingHTML.querySelector('#player-choise').innerHTML = `
    <div>
    <button class="choise-bt" id="${choise}" aria-label="${choise}"><img src="images/icon-${choise}.svg" alt="${choise}"></button>
    </div>`
};
function updateCompChoise() {
    const choises = ['paper', 'scissors', 'rock'];
    const choise = choises[Math.floor(Math.random() * 2)];
    playingHTML.querySelector('#comp-choise').innerHTML = `
    <div>
    <button class="choise-bt" id="${choise}" aria-label="${choise}"><img src="images/icon-${choise}.svg" alt="${choise}"></button>
    </div>` 
}