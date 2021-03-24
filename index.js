let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $result = document.querySelector('#result');
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $gameTime = document.querySelector('#game-time');
let score = 0;
let isGameStarted = false;


$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);
$start.addEventListener('click', startGame);


function show(elem) {
	elem.classList.remove('hide');
}

function hide(elem) {
	elem.classList.add('hide');
}

function handleBoxClick(event) {
	if (!isGameStarted) {
		return
	}

	if (event.target.dataset.box) {
		renderBox();
		score++;
	};
}


function startGame() {
	score = 0;
	isGameStarted = true;
	$start.classList.add('hide');
	$game.style.backgroundColor = '#fff';
	show($timeHeader);
	hide($resultHeader);
	$gameTime.setAttribute('disabled', true);
	setGameTime();
	let timeInterval = parseInt($gameTime.value);

	let interval = setInterval(function () {

		if (timeInterval > 0) {
			timeInterval = (timeInterval - 0.1).toFixed(1);
			$time.textContent = timeInterval;
		} else {
			clearInterval(interval);
			endGame();
		}
	}, 100);

	renderBox();
}

function endGame() {
	isGameStarted = false;
	show($start);
	$game.style.backgroundColor = "#ccc";
	$game.innerHTML = '';
	hide($timeHeader);
	show($resultHeader);
	$result.textContent = score;
	$gameTime.removeAttribute('disabled');
}

function setGameTime() {
	$time.textContent = +$gameTime.value;
	show($timeHeader);
	hide($resultHeader);
}

function renderBox() {
	$game.innerHTML = '';
	let box = document.createElement('div');
	let boxSize = getRandom(30, 100);
	let redColor = getRandom(0, 257);
	let greenColor = getRandom(0, 257);
	let blueColor = getRandom(0, 257);

	let boxColor = 'rgb(' + redColor + ',' + greenColor + ',' + blueColor + ')';


	// размеры и позиция элемента $game
	let $gameSize = $game.getBoundingClientRect();

	// максимальные значения top, left для внутреннего квадрата (элемент box)
	let topMax = $gameSize.height - boxSize;
	let leftMax = $gameSize.width - boxSize;

	box.style.width = box.style.height = boxSize + 'px';
	box.style.position = 'absolute';
	box.style.backgroundColor = boxColor;

	// помещаем элемент  box в элемент $game 1способ
	// $game.insertAdjacentElement('afterbegin', box);
	// 2способ
	$game.append(box);

	// задаём случайные значения top  и left
	box.style.top = getRandom(0, topMax) + 'px';
	box.style.left = getRandom(0, leftMax) + 'px';
	box.style.cursor = 'pointer';
	box.setAttribute('data-box', 'true');

}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}