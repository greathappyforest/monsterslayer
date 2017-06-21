new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },


    methods: {
        startGame() {
            this.gameIsRunning = true,
                this.playerHealth = 100,
                this.monsterHealth = 100,
                this.turns = []
        },

        attack() {
            var damage = this.damagehelper(3, 15);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Player hits Monster for ' + damage
            });
            this.checkwin();
            damage = this.damagehelper(5, 15);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Monster hits Player for ' + damage
            });
            this.checkwin();
        },

        specialAttack() {
            var damage = this.damagehelper(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Player hits Monster hard for ' + damage
            });
            this.checkwin();
            damage = this.damagehelper(10, 20);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Monster hits Player heard for ' + damage
            });
            this.checkwin();

        },

        heal() {
            damage = this.damagehelper(1, 15)
            this.playerHealth += damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Player heals ' + damage
            });
            damage = this.damagehelper(5, 14);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Monster hits Player for ' + damage
            });
            if (this.playerHealth >= 100) {
                this.playerHealth = 100;
            }
            this.checkwin();
        },
        giveUp() {
            this.gameIsRunning = false,
                this.turns = []
        },


        damagehelper(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkwin() {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                this.gameIsRunning = false;
                this.turns = []
                if (confirm('You win!New Game?')) {
                    this.startGame();
                    return;
                }
                return;
            }
            if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                this.gameIsRunning = false;
                this.turns = []
                if (confirm('You lose!New Game?')) {
                    this.startGame();
                    return;
                }
                return;
            }

        }

    }

});