//TODO Klassenfunktionen auftrennen
class Player {

    constructor(name) {
        this.name(name);
        this.charImage(name);
        this.dice(name);
    }

    name(name) {
        let nameInput = document.createElement('input');
        nameInput.setAttribute('class', 'names');
        nameInput.setAttribute('value', name);
        document.getElementById('nameContainer').appendChild(nameInput);
    }

    charImage(name) {
        let charDiv = document.createElement('div');
        charDiv.setAttribute('class', 'chars background');
        charDiv.setAttribute('id', name);
        document.getElementById('charContainer').appendChild(charDiv);
    }

    dice(name) {
        let diceList = [20, 6, 8, 10, 12, 100];
        let diceDiv = document.createElement('div');
        diceDiv.setAttribute('class', 'chars');
        diceDiv.setAttribute('id', name + '_Dice');
        document.getElementById('diceContainer').appendChild(diceDiv);

        let dropDown = document.createElement('div');
        dropDown.setAttribute('class', 'dropdown');
        let dropbtn = document.createElement('button');
        dropbtn.setAttribute('class', 'dropbtn');
        dropDown.appendChild(dropbtn);
        let dropDownContent = document.createElement('div');
        dropDownContent.setAttribute('class', 'dropdown-content');
        dropDown.appendChild(dropDownContent);
        document.getElementById(name + '_Dice').appendChild(dropDown);

        for (let i = 0; i < diceList.length; i++) {
            let a = document.createElement('a');
            a.setAttribute('href', '#');
            a.innerHTML = diceList[i];
            a.setAttribute('id', name + i);
            dropDownContent.appendChild(a);
            let diceButton = document.getElementById(name + i);
            diceButton.addEventListener('click', function () {
                let diceEyes = this.innerHTML;
                let rollResult = rollDice(diceEyes);
                let log = document.getElementById('chatLog');
                log.append(name + " würfelt " + rollResult + " (d" + diceEyes + ")" + "\n");
                document.getElementById("chatLog").scrollTop = document.getElementById("chatLog").scrollHeight; //textarea autoscroll
            })
        }

        let image = document.createElement('img');
        image.setAttribute('class', 'dice');
        image.setAttribute('src', 'd20.png');
        image.setAttribute('alt', 'd20');

        document.getElementById(name + '_Dice').appendChild(image);
    }
}

createBtn = document.getElementById('createCharakterBtn');
createBtn.addEventListener('click', function () {
    let nameInput = document.getElementById('nameInput').value;
    if (nameInput === "") {
        alert('charfenster leer');
    } else {
        let player = new Player(nameInput);
    }
})

function rollDice(number) {
    number = Math.floor(Math.random() * number) + 1;
    return number;
}