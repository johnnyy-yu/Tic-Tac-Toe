window.onload = () => {
    document.querySelector("input").focus();
    document.querySelector(".reset").addEventListener("click", gameBoard.resetBoard)
};

const gameBoard = (() => {
    let boardArray = new Array(9).fill("");

    const _create = (() => {
        let board = document.querySelector(".board");
    
        for (let i = 0; i < 9; i++) {
            const boxes = document.createElement("div");
            boxes.className = "boxes"
            boxes.id = i;
            boxes.textContent = boardArray[i];
            board.appendChild(boxes);
        }
    })();

    const addClickEvent = () => {
        let allBoxes = document.querySelectorAll(".boxes");
    
        for (const boxes of allBoxes) {
            boxes.addEventListener("click", (event) => {
                if (!boxes.textContent) {
                    _updateBoardArray(event.target.id);
                    _updateBoard(event.target.id);
                    game.nextTurn()
                    game.winConditions(boardArray);
                }
            })
        }
    };
    
    const _updateBoardArray = (ArrayIndex) => {
        boardArray[ArrayIndex] = game.currentSign();
        console.log(boardArray);
    };

    const _updateBoard = (boxID) => {
        document.getElementById(boxID).textContent = game.currentSign();
    };

    const _cleanBoard = () => {
        let boxes = document.getElementsByClassName("boxes");

        for (let i = 0; i < boxes.length; i++ ) {
            boxes[i].textContent = "";
        }
    };

    const _resetBoardArray = () => {
        boardArray = new Array(9).fill("");
    };

    const resetBoard = () => {
        if (players.playerOne.name !== "") {
            _cleanBoard();
            _resetBoardArray();
            game.resetGame();
            display.beginMessage();
        }
    };

    return {
        boardArray,
        addClickEvent,
        resetBoard,
    };
})();

const players = (() => {
    const playerOne = (() => {
        let name = "";
        const sign = "X"

        return {name, sign}
    })();

    const playerTwo = (() => {
        let name = "";
        const sign = "O"

        return {name, sign}
    })();

    return {
        playerOne,
        playerTwo,
    }
})();

const game = (() => {
    let currentTurn = players.playerOne;

    const resetGame = () => {
        currentTurn = players.playerOne
    }

    const nextTurn = () => {
        if (currentTurn == players.playerOne) {
            currentTurn = players.playerTwo;
        } else {
            currentTurn = players.playerOne;
        }
    };

    const currentSign = () => {
        return currentTurn.sign
    };

    const winConditions = (array) => {
        let winnerPlayerOne = players.playerOne.name +  " has won!";
        let winnerPlayerTwo = players.playerTwo.name +  " has won!";
        const player1Win = (value) => value === "X";
        const player2Win = (value) => value === "O";

        const _tie = (() => {
            if (!array.includes("")) {
                display.displayText("Tie Game! Go Again!")
            }
        })();

        const _rows = (() => {
            const row1 = array.slice(0, 3);
            const row2 = array.slice(3, 6);
            const row3 = array.slice(6);

            if (row1.every(player1Win) || row2.every(player1Win) || row3.every(player1Win)) {
                display.displayText(winnerPlayerOne);
            }

            if (row1.every(player2Win) || row2.every(player2Win) || row3.every(player2Win)) {
                display.displayText(winnerPlayerTwo);
            }
        })();

        const _columns = (() => {
            const column1 = [array[0], array[3], array[6]];
            const column2 = [array[1], array[4], array[7]];
            const column3 = [array[2], array[5], array[8]];

            if (column1.every(player1Win) || column2.every(player1Win) || column3.every(player1Win)) {
                display.displayText(winnerPlayerOne);
            };

            if (column1.every(player2Win) || column2.every(player2Win) || column3.every(player2Win)) {
                display.displayText(winnerPlayerTwo);
            };
        })();

        const _diagonals = (() => {
            const diagonal1 = [array[0], array[4], array[8]];
            const diagonal2 = [array[2], array[4], array[6]];

            if (diagonal1.every(player1Win) || diagonal2.every(player1Win)) {
                display.displayText(winnerPlayerOne);
            }

            if (diagonal1.every(player2Win) || diagonal2.every(player2Win)) {
                display.displayText(winnerPlayerTwo);
            }
        })();
    }

    return {
        resetGame,
        nextTurn,
        currentSign,
        winConditions
    };
})();

const display = (() => {
    const displayContainer = document.querySelector(".display");

    const _getPlayerNames = (() => {
        const playerOne = (() => {
            const input = document.createElement("input")
            displayContainer.innerText = "Player 1, please enter your name:";
            input.type = "text";
            input.addEventListener("keyup", (e) => {
                if (e.key === "Enter") {
                    players.playerOne.name = input.value
                    _clearDisplay();
                    playerTwo();
                }
            })
            displayContainer.appendChild(input);
        })();

        const playerTwo = () => {
            const input = document.createElement("input")
            displayContainer.innerText = "Player 2, please enter your name:";
            input.type = "text";
            input.autofocus = true;
            input.addEventListener("keyup", (e) => {
                if (e.key === "Enter") {
                    players.playerTwo.name = input.value
                    _clearDisplay();
                    beginMessage();
                    gameBoard.addClickEvent();
                }
            })
            displayContainer.appendChild(input);
        }
    })();

    const beginMessage = () => {
        displayContainer.innerText = "Begin!"
    }

    const displayText = (text) => {
        displayContainer.innerText = text;
    }

    const _clearDisplay = () => {
        displayContainer.innerText = "";
    }

    return {beginMessage, displayText}
})();