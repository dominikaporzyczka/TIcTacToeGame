/**
 * @description Game settings and game initialization
 * 
 */
function Settings() {
    this.colorsPlayer1 = document.querySelectorAll('input[name="color-player1"]');
    this.colorsPlayer2 = document.querySelectorAll('input[name="color-player2"]');
    this.symbolCircle = document.querySelector('.symbol-circle');
    this.symbolCross = document.querySelector('.symbol-cross');
    this.btnPlay = document.querySelectorAll('.btn-play');

    /** Game itialization */
    this.init = function () {
        this.setUpColorPicker(this.colorsPlayer1, this.symbolCircle);
        this.setUpColorPicker(this.colorsPlayer2, this.symbolCross);
        let player1, player2;

        for (let i = 0; i < this.btnPlay.length; i++){
            this.btnPlay[i].addEventListener('click', () => {
                const container = document.querySelector('.container');
                container.classList.add('active-game');
                container.classList.remove('end-game');
                
                player1 = this.getPlayer1();
                player2 = this.getPlayer2();
    
                const game = new Game(player1, player2);
                game.init();
            });
        }
    }

    /** Sets color of symbol */
    this.setUpColorPicker = function (colorsForPlayer, symbol) {
        for (let i = 0; i < colorsForPlayer.length; i++) {
            colorsForPlayer[i].addEventListener('change', function () {
                symbol.style.color = `${colorsForPlayer[i].value}`;
            });
        }
    }

    /** Gets data for player1 */
    this.getPlayer1 = function () {
        const color = this.getValueFromRadio(this.colorsPlayer1);

        return new Player(color, '<i class="far fa-circle"></i>');
    }

    /** Gets data for player2 */
    this.getPlayer2 = function () {
        const color = this.getValueFromRadio(this.colorsPlayer2);

        return new Player(color, '<i class="fas fa-times"></i>');
    }

    /** Gets color picked by player */
    this.getValueFromRadio = function (radios) {
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
    }
}