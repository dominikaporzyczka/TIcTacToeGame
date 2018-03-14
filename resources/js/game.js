function Game() {
    this.board = document.querySelector('#board');
    this.rows = document.querySelectorAll

    this.init = function() {
        this.gameArray = this.getClearGameArray(3);
        this.prepareBoard(3);
    }

    this.prepareBoard = function(n) {
        let boardContent = document.createDocumentFragment();
        for (let i = 0; i < n; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < n; j++) {
                let cell = document.createElement('td');
                row.appendChild(cell);

                this.addEventListenerForFields(i, j, cell, this.gameArray);
            }
            boardContent.appendChild(row);
        }
        this.board.appendChild(boardContent);
    }

    this.addEventListenerForFields = function(i, j, cell, gameArray) {
        cell.addEventListener('click', function() {
                gameArray[i][j] = 1;
        });
    }

    this.getClearGameArray = function(n) {
        const gameArray = [];

        for(let i = 0; i < n; i++) {
            gameArray[i] = [];
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                gameArray[i][j] = '';
            }
        }

        return gameArray;
    }

}