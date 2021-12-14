const gameBoard = (() => {
    let boardArray = ["","","","","","","","",""];

    const _create = (() => {
        let board = document.querySelector(".board");
        let i = 0;
    
        for (let row = 0; row < 3; row++) {
            let div = document.createElement("div");
            div.className = "row" + row;
            for (let boxes = 0; boxes < 3; boxes++) {
                let box = document.createElement("div")
                box.className = "boxes"
                box.id = i;
                box.textContent = boardArray[i];
                div.appendChild(box);
                i++;
            }
            board.appendChild(div);
        }
    })();

    const _addClickEvent = (() => {
        let allBoxes = document.querySelectorAll(".boxes");
        console.log(allBoxes)
    
        for (const boxes of allBoxes) {
            boxes.addEventListener("click", (event) => {
                _appendBoardArray(event.target.id);
                _updateBoard(event.target.id);
                game.winConditions(boardArray);
            })
        }
    })();
    
    const _appendBoardArray = (ArrayIndex) => {
        if (boardArray[ArrayIndex]) {
            _warning();
        } else {
            boardArray[ArrayIndex] = game.currentMove();
            console.log(boardArray);
        }
    };

    const _warning = () => {
        window.alert("This spot is taken! Try again!")
    };

    const _updateBoard = (boxID) => {
        document.getElementById(boxID).textContent = boardArray[boxID];
    };

    const _cleanBoard = () => {
        let boxes = document.getElementsByClassName("boxes");

        for (let i = 0; i < boxes.length; i++ ) {
            boxes[i].textContent = "";
        }
    };

    const _resetBoardArray = () => {
        boardArray = ["","","","","","","","",""];
    };

    const resetBoard = () => {
        _cleanBoard();
        _resetBoardArray();
    };

    return {
        boardArray,
        resetBoard,
    };
})();

const player = (() => {
    let playerOneName = "";
    const playerOneSign = "X";

    let playerTwoName = ""
    const playerTwoSign = "O";

    return {
        playerOneSign,
        playerTwoSign
    }
})();

const game = (() => {
    let _currentTurn = "playerOne";

    const _nextTurn = () => {
        if (_currentTurn == "playerOne") {
            _currentTurn = "playerTwo";
        } else {
            _currentTurn = "playerOne";
        }
    };

    const currentMove = () => {
        if (_currentTurn == "playerOne") {
            _nextTurn();
            return player.playerOneSign;
        } else {
            _nextTurn();
            return player.playerTwoSign;
        }
    };

    const winConditions = (array) => {
        if (array[0] == array[1] && array[1] == array[2] && array[1] != "") {
            if (array[1] == "X") {
                return window.alert(player.playerOneName +  "has won!");
            } else {
                return player.playerTwoName + "has won!";
            }
        } else if (array[3] == array[4] && array[4] == array[5] && array[4] != "") {
            if (array[4] == "X") {
                return player.playerOneName +  "has won!";
            } else {
                return player.playerTwoName + "has won!";
            }
        } else if (array[6] == array[7] && array[7] == array[8] && array[7] != "") {
            if (array[7] == "X") {
                return player.playerOneName +  "has won!";
            } else {
                return player.playerTwoName + "has won!";
            }
        } else if (array[0] == array[4] && array[4] == array[8] && array[4] != "") {
            if (array[4] == "X") {
                return player.playerOneName +  "has won!";
            } else {
                return player.playerTwoName + "has won!";
            }
        } else if (array[2] == array[4] && array[4] == array[6] && array[4] != "") {
            if (array[4] == "X") {
                return player.playerOneName +  "has won!";
            } else {
                return player.playerTwoName + "has won!";
            }
        } else if (!array.includes("")) {
            return "Tie Game!"
        }
    }

    return {
        currentMove,
        winConditions
    };
})();