// //This function is executed when a player wins
// const winFunction = (letter) => {
//     disableButtons();
//     if (letter == "X") {
//         msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
//     } else {
//         msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
//     }
//   };
//   //Function for draw
//   const drawFunction = () => {
//     disableButtons();
//     msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
//   };
//   //New Game
//   newgameBtn.addEventListener("click", () => {
//     count = 0;
//     enableButtons();
//   });
//   restartBtn.addEventListener("click", () => {
//     count = 0;
//     enableButtons();
//   });
//   //Win Logic
//   const winChecker = () => {
//     //Loop through all win patterns
//     for (let i of winningPattern) {
//         let [element1, element2, element3] = [
//             btnRef[i[0]].innerText,
//             btnRef[i[1]].innerText,
//             btnRef[i[2]].innerText,
//         ];
//         //Check if elements are filled
//         //If 3 empty elements are same and would give win as would
//         if (element1 != "" && (element2 != "") & (element3 != "")) {
//             if (element1 == element2 && element2 == element3) {
//                 //If all 3 buttons have same values then pass the value to winFunction
//                 winFunction(element1);
//             }
//         }
//     }
//   };
//   //Display X/O on click
//   btnRef.forEach((element) => {
//     element.addEventListener("click", () => {
//         if (xTurn) {
//             xTurn = false;
//             //Display X
//             element.innerText = "X";
//             element.disabled = true;
//         } else {
//             xTurn = true;
//             //Display Y
//             element.innerText = "O";
//             element.disabled = true;
//         }
//         //Increment count on each click
//         count += 1;
//         if (count == 9) {
//             drawFunction();
//         }
//         //Check for win on every click
//         winChecker();
//     });
//   });
//   //Enable Buttons and disable popup on page load
//   window.onload = enableButtons;



const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector = document.querySelector('#info');

const startCells = [
    " ", " ", " ", " ", " ", " ", " ", " ", " ", 
]

let go = "circle"
infoDisplay.textContent = "Circle goes first"


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
    infoDisplay.textContent = "it is now " + go + " 's go."
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
