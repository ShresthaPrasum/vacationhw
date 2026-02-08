const time = document.querySelector('#time-count');
const score = document.querySelector('#score');
const moles = document.querySelectorAll('.mole');
const board = document.querySelector('.board');

const user_time = document.querySelector('#time');
const user_mode = document.querySelector('#difficulty');

const startBtn = document.querySelector('.btn')

let game = false;
let mole_interval = null;
let a = null;
let b = null;

// Used AI FOR THIS SOUND EFFECT GENERATION
const hitSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj==');
const missSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBg==');

function playHitSound() {
    hitSound.currentTime = 0;
    hitSound.play().catch(() => {});
}

function playMissSound() {
    missSound.currentTime = 0;
    missSound.play().catch(() => {});
}

function getUserInput() {
    let time_selected = Number(user_time.value);
    let mode = user_mode.value;
    return { time_selected, mode };
}

function getMoleInfo(mode){
    if(mode === 'easy'){
        mole_interval = 999;

    }
    else if(mode === 'medium'){
        mole_interval = 666;
    }
    else{
        mole_interval = 333;
    }  
}

function startGame() {
    const { time_selected, mode } = getUserInput();
    let scoreCount = 0;
    let timeLeft = time_selected;

    startBtn.style.display = 'none';

    game = true
    getMoleInfo(mode)
    board.innerHTML = '';

    for(let i=0;i<25;i++){
        let div = document.createElement('div');
        div.classList.add('hole');
        board.appendChild(div);
        div.addEventListener('click', () => {
            if(game && div.classList.contains('mole')){
                scoreCount++;
                score.innerHTML = scoreCount;
                div.classList.remove('mole');                playHitSound();
            }
            else if(game && !div.classList.contains('mole')){
                playMissSound();            }
        });
    }
    
    a = setInterval(() => {
        if(timeLeft > 0){
            timeLeft--;
            time.innerHTML = timeLeft;
        }
        else{
            endgame(scoreCount);
        }
    },1000);

    const holes = document.querySelectorAll('.hole')

    b = setInterval(() => {
        holes.forEach(hole => {
            hole.classList.remove('mole')
        });

        const rand_hole = holes[Math.floor(Math.random()*holes.length)]
        rand_hole.classList.add('mole');

    }, mole_interval);
        
}

function endgame(scoreCount){
    game = false;
    clearInterval(a);
    clearInterval(b);
    alert(`Game Over! Your score is ${scoreCount}`)
    board.innerHTML = ''
    time.textContent = '0s'
    score.textContent = '0'
    startBtn.style.display = 'block';
}

startBtn.addEventListener('click', startGame)




