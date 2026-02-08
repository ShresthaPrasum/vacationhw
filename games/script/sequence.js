let colors =["red", "blue", "green", "yellow"]

let gameSeq = []
let userSeq = []

let isStarted = false
let level = 0
let score = 0;

let allButtons = document.querySelectorAll(".btn")

const clicksound = document.querySelector("#audio")

const scoreDis = document.querySelector("#current-score")
const levelTitle = document.querySelector("#level-title")

document.addEventListener("keydown", function(){
    if(!isStarted){
        startTheGame()
    }
})

document.addEventListener("click", function(){
    if(!isStarted){
        startTheGame()
    }
})

function startTheGame(){
    isStarted = true
    level = 0
    levelTitle.innerText = "Level "+level
    nextLevel()
}


function checkResult(){
    let i = userSeq.length - 1

    if(gameSeq[i]=== userSeq[i]){
        if(userSeq.length === gameSeq.length){
            setTimeout(function(){
                nextLevel()
            },1000)
            score += 1;
            scoreDis.innerText = score;
        }
    }
    else{
        levelTitle.innerHTML = "Game Over! Press Any Key to Restart"

        document.body.classList.add("game-over")

        setTimeout(function() {
            document.body.classList.remove("game-over")
        },377)

        setTimeout(function(){
            isStarted = false
            level = 0
            gameSeq = []
            userSeq = []
            score = 0;
            scoreDis.innerText = score;
        }, 1777)
    }
}

for(let i=0;i<allButtons.length;i++){
    allButtons[i].addEventListener("click",function(){
        if(!isStarted) {
            return
        }

        let id = allButtons[i].id;
        userSeq.push(id)

        flash(id)
        checkResult()
    })
}

//Used AI FOR THIS FUNCTION, I DID NOT KNOW HOW TO MAKE IT SOUND GOOD

function playTone(frequency, duration = 150) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}


function nextLevel(){
    userSeq = []

    level++

    levelTitle.innerText = "Level "+level
    let rand = Math.floor(Math.random() * 4)
    let randomColor = colors[rand]

    gameSeq.push(randomColor);

    setTimeout(function(){
        flash(randomColor)
    },500)
}

function flash(color){
    let btn = document.querySelector("#"+color)

    btn.classList.add("active");

    setTimeout(function(){
        btn.classList.remove("active")
    },200)
    const frequencies = {
        red: 261.63,   
        blue: 329.63,  
        green: 392,    
        yellow: 523.25 
    }
    playTone(frequencies[color]);
}