const cardData = [
    { id: 1, symbol: '☠️' },
    { id: 2, symbol: '☠️' },
    { id: 3, symbol: '❤️' },
    { id: 4, symbol: '🤣' },
    { id: 5, symbol: '🙏' },
    { id: 6, symbol: '❤️' },
    { id: 7, symbol: '🙏' },
    { id: 8, symbol: '🤣' }
];

const data = {
    flipped_card:[],
    matched_card:[],
    matched:[],
    moves:0,
    matches:0
}

function shuffleCards() {
    const shuffledCards = [...cardData].sort(()=> Math.random() - 0.5);
    return shuffledCards;
}

function creatingCard(){
    const shuffledCards = shuffleCards();
    const board = document.querySelector('.game-board')
    for(let i=0;i<8;i++){
        let div = document.createElement('div');
        board.append(div);
        div.classList = 'card'
        let p = document.createElement('p');
        div.append(p);
        p.innerHTML = '?';
    }
}

creatingCard()