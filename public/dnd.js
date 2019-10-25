let playerList = []
const form = document.querySelector("form");
const input = document.querySelector(".input");
const messages = document.querySelector(".messages");
const username = prompt("Gib deinen Charakternamen ein:");
const socket = io();

class Player {

    constructor(name) {
        this.playerName = name;
        this.name(name);
        this.charImage(name);
        this.dice(name);
    }

    static playerName(name) {
        return name;
    };


    name(name) {
        let nameInput = document.createElement('input');
        nameInput.setAttribute('class', 'names');
        nameInput.setAttribute('value', name);
        document.getElementById('nameContainer').appendChild(nameInput);
        // return name;
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
                // let log = document.getElementById('chatLog');
                // log.append(name + " würfelt " + rollResult + " (d" + diceEyes + ")" + "\n");
                // document.getElementById("chatLog").scrollTop = document.getElementById("chatLog").scrollHeight;

                socket.emit("roll", {
                    message: " würfelt " + rollResult + " (d" + diceEyes + ")" + "\n"
                });

                //textarea autoscroll
            })


        }

        let image = document.createElement('img');
        image.setAttribute('class', 'dice');
        image.setAttribute('src', 'd20.png');
        image.setAttribute('alt', 'd20');

        document.getElementById(name + '_Dice').appendChild(image);
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    addMessage(username + ": " + input.value);

    socket.emit("chat_message", {
        message: input.value
    });

    input.value = "";
    return false;
}, false);

socket.on("chat_message", function (data) {
    addMessage(data.username + ": " + data.message);
});

socket.on("roll", function (data) {
    addMessage(data.username + data.message);
});

// socket.on("chat_message", function (data) {
//     addMessage(data.message);
// });

// socket.on("chat_message", function (data) {
//     addMessage(data + ": ");
// });

socket.on("user_join", function (data) {
    addMessage("Grüße " + data + "!");
});

socket.on("user_leave", function (data) {
    addMessage("Gehabt Euch Wohl, " + data + "!");
});

socket.on("showPlayers", function (data) {
    console.log(data.playerList);

    document.getElementById('nameContainer').innerHTML = "";
    document.getElementById('charContainer').innerHTML = "";
    document.getElementById('diceContainer').innerHTML = "";
    for (i = 0; i < data.playerList.length; i++) {
        let player = new Player(data.playerList[i]);
    }
});

addMessage("Grüße " + username + ".");
socket.emit("user_join", username);

function addMessage(message) {
    const li = document.createElement("li");
    li.innerHTML = message;
    messages.appendChild(li);
    document.getElementById("chatLog").scrollTop = document.getElementById("chatLog").scrollHeight;

    // window.scrollTo(0, document.body.scrollHeight);
}

// createBtn = document.getElementById('createCharakterBtn');
// createBtn.addEventListener('click', function () {
//     let nameInput = document.getElementById('nameInput').value;
//     if (nameInput === "") {
//         alert('charfenster leer');
//     } else {
//         let player = new Player(nameInput);
//     }
// })

function rollDice(number) {
    number = Math.floor(Math.random() * number) + 1;
    return number;
}