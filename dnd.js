class Player {
    // constructor(name, dice) {
    //     this.name = name;
    //     this.dice = dice;
    // }

    name(name) {
        alert(name);
    }

    roll(dice) {
        alert(dice);
    }
}


for (i = 1; i < 26; i++) {
    let playerRolls = document.getElementById('p' + i);
    playerRolls.addEventListener('click', function () {
        let player = new Player();
        player.name(this.name);
        player.roll(parseInt(this.innerHTML));
    })
}

