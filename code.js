const cBoxHTML = document.querySelector('.choice-box');
const playingHTML = document.getElementById('playing');

var score = 0;

function startGame(choice) {
	const playerChoice = choice;
	const houseChoice = updateHouseChoice();
	const result = verifyWinner(playerChoice, houseChoice);

	createChoiceButton('#player-choice', playerChoice);
	createChoiceButton('#comp-choice', houseChoice);

	setTimeout(() => {
		cBoxHTML.style.visibility = "hidden";
		playingHTML.style.visibility = "visible";
		startAnimations(result);
	}, 300);
};

function createChoiceButton(local, type) {
	document.querySelector(`${local}`).innerHTML = `
  	<div>
    	<button class="choice-bt" id="${type}" aria-label="${type}">
	      <img src="images/icon-${type}.svg" alt="${type}">
		  </button>
  	</div>`
};

function updateHouseChoice() {
	const alternatives = ['rock', 'paper', 'scissors'];

	return alternatives[Math.round(Math.random() * (alternatives.length - 1))];
}

function verifyWinner(playerChoice, houseChoice) {
	const alternatives = ['rock', 'paper', 'scissors'];
	let result;

	if (alternatives.findIndex((e) => e == playerChoice) == 0)
		alternatives.push(alternatives.shift());

	if (playerChoice == houseChoice) result = 'Draw';
	else {
		result = alternatives[
			alternatives.findIndex((a) => a == playerChoice) - 1
		] == houseChoice ? 'You win' : 'You lose';
	};

	if(result !== 'Draw') score += result == 'You win' ? 1 : -1;

	return result;
};

function startAnimations(result) {
	const houseButton = document.querySelector('#comp-choice button');
	const resultButton = document.querySelector('.result');
	const resultHTML = document.getElementById('result');

	resultHTML.innerText = result;

	addAnimation(playingHTML, 'moveRight 1s forwards');
	addAnimation(houseButton, 'flip 1s 1s forwards');
	addAnimation(resultButton, 'fade 1.5s 2s forwards');

	setTimeout(() => document.getElementById('score').innerText = score, 2000);
}

function playAgain() {
	addAnimation(cBoxHTML, 'moveLeft 0.5s forwards');
	cBoxHTML.style.opacity = 0;

	playingHTML.style.visibility = "hidden";
	cBoxHTML.style.visibility = "visible";
}

function addAnimation(element, animation) {
	element.style.animation = '';
	setTimeout(() => element.style.animation = animation, 50);
}

function createInputEvents() {
	const rulesHTML = document.querySelector('.rules');

	document.querySelector('#rules').addEventListener("click", () => {
		rulesHTML.style.animation = 'active 0.6s forwards';
	});

	document.getElementById('rules-close').addEventListener('click', () => {
		rulesHTML.style.animation = '';
	});

	document.querySelectorAll('.choice-box button').forEach(bt => {
		bt.addEventListener("click", () => startGame(bt.id));
	});

	document.getElementById('play-again').addEventListener("click", () => {
		playAgain();
	});
};

addEventListener('load', () => {
	createInputEvents();
});