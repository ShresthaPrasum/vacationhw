const theme = {
    emoji : [
        { id: 1, symbol: '☠️' },
        { id: 1, symbol: '☠️' },
        { id: 2, symbol: '❤️' },
        { id: 2, symbol: '❤️' },
        { id: 3, symbol: '🤣' },
        { id: 3, symbol: '🤣' },
        { id: 4, symbol: '🙏' },
        { id: 4, symbol: '🙏' },
        { id: 5, symbol: '👻' },
        { id: 5, symbol: '👻' },
        { id: 6, symbol: '🎃' },
        { id: 6, symbol: '🎃' },
    
    ],
    number: [
        { id: 1, symbol: '1' },
        { id: 1, symbol: '1' },
        { id: 2, symbol: '2' },
        { id: 2, symbol: '2' },
        { id: 3, symbol: '3' },
        { id: 3, symbol: '3' },
        { id: 4, symbol: '4' },
        { id: 4, symbol: '4' },
        { id: 5, symbol: '5' },
        { id: 5, symbol: '5' },
        { id: 6, symbol: '6' },
        { id: 6, symbol: '6' },
    ],
    alphabet: [
        { id: 1, symbol: 'A' },
        { id: 1, symbol: 'A' },
        { id: 2, symbol: 'B' },
        { id: 2, symbol: 'B' },
        { id: 3, symbol: 'C' },
        { id: 3, symbol: 'C' },
        { id: 4, symbol: 'D' },
        { id: 4, symbol: 'D' },
        { id: 5, symbol: 'E' },
        { id: 5, symbol: 'E' },
        { id: 6, symbol: 'F' },
        { id: 6, symbol: 'F' },
    ]
}

const themeElements = document.querySelectorAll('.theme h1');

let selectedTheme = 'emoji';

themeElements.forEach(element=>{
    element.addEventListener('click',()=>{
        selectedTheme = element.getAttribute('data-theme');
        console.log('Selected theme:', selectedTheme);
        
        data.fcard = [];
        data.matched = [];
        data.moves = 0;
        data.matches = 0;
        
        data.shuffledCards = shuffleCards();      

        document.querySelector('.container').style.display = 'block';
        document.querySelector('.theme').style.display = 'none';    

        const board = document.querySelector('.game-board');
        board.innerHTML = '';
        
        document.querySelector('#moves').innerHTML = '0';
        document.querySelector('#matches').innerHTML = '0';
        
        creatingCard();
    });
});

const data = {
    shuffledCards: shuffleCards(),
    fcard:[],
    matched:[],
    moves:0,
    matches:0
}
const move = document.querySelector('#moves');
const match = document.querySelector('#matches');

let isChecking = false;

function shuffleCards() {
    const shuffledCards = [...theme[selectedTheme]].sort(()=> Math.random() - 0.5);
    return shuffledCards;
}

function creatingCard(){
    
    const board = document.querySelector('.game-board')
    for(let i=0;i<theme[selectedTheme].length;i++){
        let div = document.createElement('div');
        board.append(div);
        div.classList = 'card'

        let div1 = document.createElement('div');
        div1.classList = 'card-front'
        div.append(div1)

        let div2 = document.createElement('div');
        div2.classList = 'card-back'
        div.append(div2)

        let p = document.createElement('p');
        div1.append(p);
        p.innerHTML = '?';

        let p1 = document.createElement('p');
        div2.append(p1);
        p1.innerHTML = data.shuffledCards[i].symbol;

        div.addEventListener('click',()=>{
        
            if(data.fcard.length === 2 && isChecking){
                return;
            }
            div.classList.add('rotated');
            data.fcard.push(data.shuffledCards[i]);

                if(data.fcard.length === 2){
                
                data.moves++;
                move.innerHTML = `${data.moves}`;
                if(data.fcard[0].id === data.fcard[1].id){
                    data.matched.push(data.fcard[0],data.fcard[1]);
                    for(let i=0;i<2;i++){
                        const cards = document.querySelectorAll('.card');
                        cards.forEach(card =>{
                            if(card.querySelector('.card-back p').innerHTML === data.fcard[i].symbol){
                                card.classList.add('matched');
                            }
                        });
                    }
                    data.fcard = [];
                    data.matches++;
                    

                    match.innerHTML = `${data.matches}`;

                    if(data.matched.length === theme[selectedTheme].length){
                        setTimeout(()=>{
                            alert(`Congratulations! You won the game in ${data.moves} moves!`);
                        },500)
                    }
                    

                }else{
                    isChecking = true;
                    setTimeout(()=>{
                        const cards = document.querySelectorAll('.card');
                        cards.forEach(card => {
                            if(!card.classList.contains('matched')){
                                card.classList.remove('rotated');
                            }
                        });
                        data.fcard = [];
                        isChecking = false;
                    },600)
                }
            }
        });
    }
}

creatingCard();

document.querySelector('.restart-btn').addEventListener('click',()=>{
    greatReset();
})

function greatReset(){
    data.fcard = [];
    data.matched = []
    data.moves = 0
    data.matches = 0
    isChecking = false
    data.shuffledCards = shuffleCards();

    const board = document.querySelector('.game-board');
    board.innerHTML = ""

    creatingCard()

    match.innerHTML = '0'
    move.innerHTML = '0'

}