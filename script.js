

const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector = document.querySelector('#info');

const startCells = [
    " ", " ", " ", " ", " ", " ", " ", " ", " ", 
]

let go = "circle"
infoDisplay.innerHTML = "Circle goes first"


function createBoard() {
    startCells.forEach((_cell, index) => {                      //! underscore will just tell the code we are not using it
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);
        gameBoard.append(cellElement);
    })
}

createBoard ();

function addGo(e) {                                             //* create a function called addGo with a parameter of (e) - so a o or x will be added if nothing is already there
    const goDisplay = document.createElement('div');            //! within your function create a div, so that there is something for the o or x to go in
    goDisplay.classList.add(go);                                //! your variable goDisplay that contains your created div, then gets a class added to it - circle is saved under variable go
    e.target.append(goDisplay);                                 //! you are then appending the o or x CLASS to goDisplay variable/div
    go = go === "circle" ? "cross" : "circle";                  //! means, if go deeply equals the string circle and that is true, then return cross, otherwise if not, then return circle
    infoDisplay.innerHTML = "It is now " + go + "'s turn."
    e.target.removeEventListener('click', addGo);
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll('.square');
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array => {                            //* for each array that lives in winningCombo, we are grabbing all the sub arrays, and if every single sub array has a first child that also has a class of circle, then it's true a winning combo does exist
        let circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
    
    if (circleWins) {
        infoDisplay.textContent = "Circle Wins!";
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        return;                                                 //! don't forget to return out of it or else the loop will run throughout and return false even if true
    }

    })

    winningCombos.forEach(array => {                            //* for each array that lives in winningCombo, we are grabbing all the sub arrays, and if every single sub array has a first child that also has a class of circle, then it's true a winning combo does exist
        let crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));
    
    if (crossWins) {
        infoDisplay.textContent = "Cross Wins!";
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
        return;                                                 //! don't forget to return out of it or else the loop will run throughout and return false even if true
    }

    })

    
}
