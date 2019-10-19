//TODO Klassenfunktionen auftrennen

lass Player {
    constructor(name, dice) {
        this.playerName = name;
        this.rollResult = rollDice(dice);
    }

    createNewPlayer(name) {
        let diceList = [20, 6, 8, 10, 12, 100];

        let nameInput = document.createElement('input');
        let charDiv = document.createElement('div');
        let diceDiv = document.createElement('div');
        nameInput.setAttribute('class', 'names');
        nameInput.setAttribute('value', name);
        charDiv.setAttribute('class', 'chars');
        charDiv.setAttribute('id', name)
        charDiv.style.background = 'grey';
        diceDiv.setAttribute('class', 'chars');
        diceDiv.setAttribute('id', name+'Dice');
        document.getElementById('nameContainer').appendChild(nameInput);
        document.getElementById('charContainer').appendChild(charDiv);
        document.getElementById('diceContainer').appendChild(diceDiv);



        let dropDown = document.createElement('div');
        dropDown.setAttribute('class', 'dropdown');
        let dropbtn = document.createElement('button');
        dropbtn.setAttribute('class', 'dropbtn');
        dropDown.appendChild(dropbtn);
        let dropDownContent = document.createElement('div');
        dropDownContent.setAttribute('class', 'dropdown-content');
        dropDown.appendChild(dropDownContent);

        for (i = 0; i < diceList.length; i++) {
            let a = document.createElement('a');
            a.setAttribute('href', '#');
            a.innerHTML = diceList[i];
            a.setAttribute('name', document.getElementById('nameInput').value);
            dropDownContent.appendChild(a);
        }

        let image = document.createElement('img');
        image.setAttribute('class', 'dice');
        image.setAttribute('src', 'd20.png');
        image.setAttribute('alt', 'd20');

        document.getElementById(name+'Dice').appendChild(dropDown);
        document.getElementById(name+'Dice').appendChild(image);

    }
}

createBtn = document.getElementById('createCharakterBtn');
createBtn.addEventListener('click', function () {
    let player = new Player();
    player.createNewPlayer(document.getElementById('nameInput').value);
})

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