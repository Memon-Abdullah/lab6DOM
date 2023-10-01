let player_text = document.getElementById('text');
let restart = document.getElementById('reset');
let boxes = Array.from(document.getElementsByClassName('box'));

let winner = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
let x_text = "X";
let o_text = "O";

let currentPlayer = x_text;
let sides = Array(9).fill(null);

// console.log(sides);

const gameStart = () =>{
    boxes.forEach(box => box.addEventListener('click',boxClicked))
}

function boxClicked(e){
    const id = e.target.id;

    if(!sides[id]){
        sides[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerWon() != false){
            player_text =  `${currentPlayer} has won!!`;
            let winning_block = playerWon();
            winning_block.map(box => boxes[box].style.backgroundColor=winner);
            return;
        
        }    
        currentPlayer = currentPlayer == x_text ? o_text : x_text;
    }
}
const winPossibilities = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
function playerWon(){
    for (const i of winPossibilities) {

        let [a,b,c] = i;
        if(sides[a] && (sides[a])== (sides[b] && sides[a] == sides[c])) {
            return [a,b,c];
        }
    }
    return false;
}
restart.addEventListener('click',restartF);

function restartF(){
    sides.fill(null);

    boxes.forEach( box =>{
        box.innerText = '';
    })

    currentPlayer = x_text;
}

gameStart();