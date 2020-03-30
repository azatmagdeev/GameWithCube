const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');

const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $timesForGame = document.querySelector('#game-time');

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxGame)
$timesForGame.addEventListener('input', setGameTime);
function show($el){
    $el.classList.remove('hide');
};
function hide($el){
    $el.classList.add('hide');
};

function startGame(){
    score = 0;
    setGameTime();
    $timesForGame.setAttribute('disabled', 'true');
    isGameStarted = true;
    $game.style.backgroundColor = 'white';
    hide($start);
    let interval = setInterval(function(){
        let time = parseFloat($time.textContent)
        if(time <= 0){
            clearInterval(interval)
            endGame();
        }else{
            $time.textContent = (time - 0.1).toFixed(1);
        }
        
    }, 100)
    renderBox();
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
function sendGameScore(){
    $result.textContent = score.toString();
}
function setGameTime(){
    var time = +$timesForGame.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}
function endGame(){
    isGameStarted = false;
    $timesForGame.removeAttribute('disabled');

    sendGameScore();
    show($start);
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    hide($timeHeader);
    show($resultHeader); 
    
}
function renderBox(){
    let boxSize = getRandom(30,100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.width - boxSize;
    let maxLeft = gameSize.height - boxSize;
    
    $game.innerHTML='';
    let box = document.createElement('div');
    box.style.height = box.style.width = boxSize+'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = getRandomColor().toString();
    box.style.top = getRandom(0,maxTop) + 'px'; 
    box.style.left = getRandom(0, maxLeft)+'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement("afterbegin", box);
}
function handleBoxGame(event){
    if(!isGameStarted){
        return
    }
    if(event.target.dataset.box){
        score++;
        renderBox();
    }
    
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}
