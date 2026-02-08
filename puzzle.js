let grid_num = [1,2,3,4,5,6,7,8,null]

const moveCountDis = document.querySelector("#move-count")

const shuffleBtn = document.getElementById('shuffleBtn')
const resetBtn = document.getElementById('resetBtn')

let moveCount = 0;

function shuffle(){
    let emptyIndex = grid_num.indexOf(null)

    for(let i=0;i<150;i++){
        let j = Math.floor(Math.random()*grid_num.length);
        let temp = grid_num[i]
        grid_num[i] = grid_num[j]
        grid_num[j] = temp
    }
}
shuffle();

function getNeighbours(index){
    let neighbours = []
    let row = Math.floor(index / 3);
    let col = index % 3;
    
    // Up
    if (row > 0) neighbours.push(index - 3);
    // Down
    if (row < 2) neighbours.push(index + 3);
    // Left
    if (col > 0) neighbours.push(index - 1);
    // Right
    if (col < 2) neighbours.push(index + 1);
    
    return neighbours;

}

function render(){
    let container = document.querySelector(".puzzle-grid")

    for(let i=0;i<grid_num.length;i++){
        let div = document.createElement('div')

        if(grid_num[i] != null){
            div.innerText = grid_num[i]

            div.classList.add('tile')

            div.setAttribute("data-index", i)

            container.appendChild(div)

            div.addEventListener("click", clickHandler)
        }
        else{
            div.classList.add('empty-tile')
            container.appendChild(div)
        }     
    }
}


    
function clickHandler(e){
    let i = Number(e.target.getAttribute("data-index"))
    let emptyIndex = grid_num.indexOf(null)

    let neighbours = getNeighbours(emptyIndex)

    if(neighbours.includes(i)){
        swap(emptyIndex, i)
        moveCount += 1;
        moveCountDis.innerText = moveCount;
        checkwin();
    }
}

function swap(i,j){
    let temp = grid_num[i]
    grid_num[i] = grid_num[j]
    grid_num[j] = temp
    updateUI()
}

function checkwin(){
    let isWon = true
    for(let i=0;i<grid_num.length-1;i++){
        if(grid_num[i] !== i+1){
            isWon = false
            break
        }   
    }
    if(isWon && grid_num[8] === null){
        setTimeout(function(){
            alert("Congratulations! You solved the puzzle in "+moveCount+" moves.")
            moveCount = 0;
            moveCountDis.innerText = moveCount;
            shuffle();
            updateUI();
        }, 500);
    }

}

resetBtn.addEventListener('click', function(){
    grid_num = [1, 2, 3, 4, 5, 6, 7, 8, null]
    moveCount = 0;
    document.querySelector("#move-count").innerText = moveCount;
    updateUI()
});

shuffleBtn.addEventListener('click', function(){
    shuffle();
    moveCount = 0;
    document.querySelector("#move-count").innerText = moveCount;
    updateUI()
});

function updateUI(){
    let container = document.querySelector(".puzzle-grid")
    container.innerHTML = ""
    render()
}

render()


