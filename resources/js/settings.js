function Settings() {
    this.colorsPlayer1 = document.querySelectorAll('input[name="color-player1"]');
    this.colorsPlayer2 = document.querySelectorAll('input[name="color-player2"]');
    this.symbolCircle = document.querySelector('.symbol-circle');
    this.symbolCross = document.querySelector('.symbol-cross');
    this.btnPlay = document.querySelector('.btn-play');

    this.init = function () {
        this.setUpColorPicker(this.colorsPlayer1, this.symbolCircle);
        this.setUpColorPicker(this.colorsPlayer2, this.symbolCross);
        let player1, player2;
        const me = this;

        this.btnPlay.addEventListener('click', function() {
            const settingField = document.querySelector('.main');
            const boardContainer = document.querySelector('#board-container');
            settingField.classList.add('disable');
            boardContainer.classList.add('enable');

            player1 = me.getPlayer1();
            player2 = me.getPlayer2();

            const game = new Game(player1, player2);
            game.init();
        });
    }

    this.setUpColorPicker = function (colorsForPlayer, symbol) {
        for (let i = 0; i < colorsForPlayer.length; i++) {
            colorsForPlayer[i].addEventListener('change', function () {
                symbol.style.color = `${colorsForPlayer[i].value}`;
            });
        }
    }

    this.getPlayer1 = function () {
        const color = this.getValueFromRadio(this.colorsPlayer1);

        return new Player(color, '<i class="far fa-circle"></i>');
    }

    this.getPlayer2 = function () {
        const color = this.getValueFromRadio(this.colorsPlayer2);

        return new Player(color, '<i class="fas fa-times"></i>');
    }

    this.getValueFromRadio = function (radios) {
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
    }
}