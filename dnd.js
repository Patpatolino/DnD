class Player {
    constructor(name, dice) {
        this.playerName = name;
        this.rollResult = rollDice(dice);
    }
}

for (i = 1; i < 26; i++) {
    let playerRolls = document.getElementById('p' + i);
    playerRolls.addEventListener('click', function () {
        let player = new Player(this.name, parseInt(this.innerHTML));
        console.log(player);
    })
}

function rollDice(number) {
    number = Math.floor(Math.random() * Math.floor(number));
    if (number === 0) number++;
    return number;
}