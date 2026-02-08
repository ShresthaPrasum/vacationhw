const time = document.querySelector('#time-count');
const score = document.querySelector('#score');
const moles = document.querySelectorAll('.mole');
const board = document.querySelector('.board');

const user_time = document.querySelector('#time');
const user_mode = document.querySelector('#difficulty');

function getUserInput() {
    let time = user_time.value;
    let mode = user_mode.value;
    return { time, mode };
}

function startGame() {
    const { time, mode } = getUserInput();
    let scoreCount = 0;
    let timeLeft = time;
    score.textContent = `Score: ${scoreCount}`;
    time.textContent = `Time: ${timeLeft}s`;

    for(let i=0;i<25;i++){
        let div = document.createElement('div');
        div.classList.add('hole');
        board.appendChild(div);
    }

}

startGame()




