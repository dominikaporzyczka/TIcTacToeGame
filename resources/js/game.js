function Game(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = document.querySelector('#board');
    this.isPlayer1Turn = true;
    this.message = document.querySelector('#message');

    this.init = function () {
        this.gameArray = this.getClearGameArray(3);
        this.prepareBoard(3);
    }

    this.prepareBoard = function (n) {
        let boardContent = document.createDocumentFragment();
        let player = true;
        for (let i = 0; i < n; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < n; j++) {
                let cell = document.createElement('td');
                row.appendChild(cell);

                this.addEventListenerForField(i, j, cell);
            }
            boardContent.appendChild(row);
        }
        this.board.appendChild(boardContent);
    }

    this.addEventListenerForField = function (i, j, cell) {
        let me = this;
        const cellClickHandler = function () {
            if (me.isPlayer1Turn) {
                me.gameArray[i][j] = 1;
                this.innerHTML = me.player1.symbol;
                this.style.color = me.player1.color;
            }
            else {
                me.gameArray[i][j] = 2;
                this.innerHTML = me.player2.symbol;
                this.style.color = me.player2.color;
            }
            me.isPlayer1Turn = !me.isPlayer1Turn;
            me.message.classList.add('disable');

            cell.removeEventListener('click', cellClickHandler);
        };

        cell.addEventListener('click', cellClickHandler);
    }

    this.getClearGameArray = function (n) {
        const gameArray = [];

        for (let i = 0; i < n; i++) {
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