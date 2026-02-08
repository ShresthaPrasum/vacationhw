let grid_num = [1,2,3,4,5,6,7,8,null]

const countdisplay = document.querySelector("#move-count")

const shuffleBtn = document.getElementById('shuffleBtn')
const resetBtn = document.getElementById('resetBtn')

let moveCount = 0

//Used AI FOR THIS FUNCTION, DUE TO UNSOLVABLE PUZZLE, I DID NOT KNOW HOW TO MAKE IT SOLVE IT 
function shuffle(){
    let emptyIndex = grid_num.indexOf(null)
    
    for(let i = 0; i < 200; i++){
        let neighbours = getSurrounding(emptyIndex)
        let randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)]
        
        let temp = grid_num[emptyIndex]
        grid_num[emptyIndex] = grid_num[randomNeighbour]
        grid_num[randomNeighbour] = temp
        
        emptyIndex = randomNeighbour
    }
}

shuffle()

function getSurrounding(index){
    let neighbours = []
    let row = Math.floor(index / 3)
    let col = index % 3
    
    
    if (row > 0) neighbours.push(index - 3)
    
    if (row < 2) neighbours.push(index + 3)
    
    if (col > 0) neighbours.push(index - 1)
    
    if (col < 2) neighbours.push(index + 1)
    
    return neighbours

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

    let neighbours = getSurrounding(emptyIndex)

    if(neighbours.includes(i)){
        swap(emptyIndex, i)
        moveCount += 1
        countdisplay.innerText = moveCount
        checkwin()
    }
}

function swap(i,j){
    let temp = grid_num[i]
    grid_num[i] = grid_num[j]
    grid_num[j] = temp
    updateBoard()
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
            moveCount = 0
            countdisplay.innerText = moveCount
            shuffle()
            updateBoard()
        }, 500)
    }

}

resetBtn.addEventListener('click', function(){
    grid_num = [1, 2, 3, 4, 5, 6, 7, 8, null]
    moveCount = 0
    countdisplay.innerText = moveCount
    updateBoard()
})

shuffleBtn.addEventListener('click', function(){
    shuffle()
    moveCount = 0
    countdisplay.innerText = moveCount
    updateBoard()
})

function updateBoard(){
    let container = document.querySelector(".puzzle-grid")
    container.innerHTML = ""
    render()
}

render()


