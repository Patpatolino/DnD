class Player {
    constructor(name, roll) {
        this.playerName = name;
        this.rollResult = getRandomInt(roll);
    }
}

for (i = 1; i < 26; i++) {
    let playerRolls = document.getElementById('p' + i);
    playerRolls.addEventListener('click', function () {
        let player = new Player(this.name, parseInt(this.innerHTML));
        console.log(player);
    })
}

function getRandomInt(max) {
    max = Math.floor(Math.random() * Math.floor(max));
    if (max === 0) max++;
    return max;
}