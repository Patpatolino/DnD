document.write(
    '<script src="http://' +
    (location.host || '${1:localhost}').split(':')[0] +
    ':${2:35729}/livereload.js?snipver=1"></' +
    'script>'
);

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

let createCharakterBtn = document.getElementById('createCharakterBtn');
createCharakterBtn.addEventListener('click', function () {
    let player = new Player();
    player.roll();
})

for (i = 1; i < 26; i++) {
    let playerRolls = document.getElementById('p' + i);
    playerRolls.addEventListener('click', function () {
        let player = new Player();
        player.name(this.name);
        player.roll(parseInt(this.innerHTML));
    })
}



// let playerOneButtons = document.getElementById('p'+1);
// playerOneButtons.addEventListener('click', function() {
//     let player = new Player();
//     player.roll(parseInt(this.innerHTML));
// })




// class Dice {
//     player;
//     eyes;
//     constructor(player, eyes) {
//         this.player = player;
//         this.eyes = eyes;
//     }

//     player(player) {
//         addEventListener.document.getElementById(player)('click', function () {
//             alert(player);
//         })
//     }

//     static eyes;

//     static roll() {
//         alert(Math.floor((Math.random() * 20) + 1));
//     }
// }



// let asdfBtn = document.getElementById('p1d20');
// asdfBtn.addEventListener('click', function () {
//     let d = new Dice(1, 1);
//     d.roll();
// });