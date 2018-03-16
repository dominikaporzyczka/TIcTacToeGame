/**
 * @description Generates game board and sets game logic
 * 
 * @param {any} player1 
 * @param {any} player2 
 */
function Game(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = document.querySelector('#board');
    this.isPlayer1Turn = true;
    this.message = document.querySelector('#message');

    /** Initialization */
    this.init = function () {
        this.gameArray = this.getClearGameArray(3);
        this.prepareBoard(3);
    }

    /** Generates game board */
    this.prepareBoard = function (n) {
        let boardContent = document.createDocumentFragment();
        for (let i = 0; i < n; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < n; j++) {
                let cell = document.createElement('td');
                row.appendChild(cell);

                this.addEventListenerForField(i, j, cell);
            }
            boardContent.appendChild(row);
        }
        this.board.innerHTML = '';
        this.board.appendChild(boardContent);
    }

    /** Adds event listener for cell and checks game status */
    this.addEventListenerForField = function (i, j, cell) {
        let me = this;
        const cellClickHandler = function () {
            if (me.isPlayer1Turn) {
                me.gameArray[i][j] = 1;
                this.innerHTML = me.player1.symbol;
                this.style.color = me.player1.color;
            }
            else {
                me.gameArray[i][j] = -1;
                this.innerHTML = me.player2.symbol;
                this.style.color = me.player2.color;
            }
            me.isPlayer1Turn = !me.isPlayer1Turn;
            /* Disable message on the top of the board */
            me.message.classList.add('disable');

            const gameStatus = me.getGameStatus(me.gameArray);
            /* If game is over */
            if (gameStatus === 0 || gameStatus === 1 || gameStatus === -1) {
                const container = document.querySelector('.container');
                const winMessage = document.querySelector('.winner-message p');
                setTimeout(() => {
                    container.classList.add('end-game');
                }, 100);
                if (gameStatus === 1) {
                    winMessage.textContent = 'Player 1 won!'
                }
                else if (gameStatus === -1) {
                    winMessage.textContent = 'Player 2 won!'
                }
                else {
                    winMessage.textContent = 'Draw! :)'
                }
            }
            cell.removeEventListener('click', cellClickHandler);
        };

        cell.addEventListener('click', cellClickHandler);
    }

    /** Gets game status and returns
     * null when the game is not over
     * 0 when draw
     * 1 when player1 win
     * -1 when player2 win
     */
    this.getGameStatus = function (array) {
        const arrLen = array.length;

        let firstDiagonalSum = 0;
        let secondDiagonalSum = 0;

        for (let i = 0; i < arrLen; i++) {
            let rowSum = 0;
            let colSum = 0;

            for (let j = 0; j < arrLen; j++) {
                rowSum += array[i][j];
                colSum += array[j][i];
            }

            if (rowSum !== 0 && rowSum % arrLen === 0) {
                return rowSum / arrLen;
            }

            if (colSum !== 0 && colSum % arrLen === 0) {
                return colSum / arrLen;
            }

            firstDiagonalSum += array[i][i];
            secondDiagonalSum += array[i][arrLen - 1 - i];
        }

        if (firstDiagonalSum !== 0 && firstDiagonalSum % arrLen === 0) {
            return firstDiagonalSum / arrLen;
        }

        if (secondDiagonalSum !== 0 && secondDiagonalSum % arrLen === 0) {
            return secondDiagonalSum / arrLen;
        }

        for (let i = 0; i < arrLen; i++) {
            for (let j = 0; j < arrLen; j++) {
                if (array[i][j] === null) {
                    return null;
                }
            }
        }

        return 0;
    }

    /** Prepares empty array corresponding with game board */
    this.getClearGameArray = function (n) {
        const gameArray = [];

        for (let i = 0; i < n; i++) {
            gameArray[i] = [];
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                gameArray[i][j] = null;
            }
        }

        return gameArray;
    }

}