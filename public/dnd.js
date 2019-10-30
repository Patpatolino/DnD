//Chat
const form = document.getElementById('chatForm');
const input = document.getElementById('chatText');
const messages = document.getElementById('chatlog');

//Quest
const questForm = document.getElementById('questForm');
const questInput = document.getElementById('questInput');
const questlog = document.getElementById('questlog');

//login prompt
let promptName = prompt("Gib deinen Charakternamen ein:");
console.log('Hihi, maximale zeichenanzahl 30 Mr. Fred');
const username = promptName.substring(0, 30);
const socket = io();

class Player {

    constructor(name) {
        this.playerName = name;
        this.name(name);
        this.charImage(name);
    }

    static playerName(name) {
        return name;
    };

    name(name) {
        let nameInput = document.createElement('p');
        nameInput.setAttribute('class', 'names');
        nameInput.setAttribute('value', name);
        nameInput.innerHTML = name;
        document.getElementById('nameContainer').appendChild(nameInput);
    }

    charImage(name) {
        let charDiv = document.createElement('div');
        charDiv.setAttribute('class', 'chars background');
        charDiv.setAttribute('id', name + '_image');
        charDiv.style.backgroundImage = "url('/images/character.png')";
        charDiv.style.backgroundSize = 'cover';
        charDiv.style.backgroundRepeat = 'no-repeat';
        document.getElementById('charContainer').appendChild(charDiv);
    }
}

createDice();

//Sockets
//Chat
form.addEventListener("submit", function (event) {
    event.preventDefault();

    addMessage(username + ": " + input.value);

    socket.emit("chat_message", {
        message: input.value
    });

    input.value = "";
    return false;
}, false);

//Quest
questForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //local
    addQuest(questInput.value);

    //socket
    socket.emit("questlog", {
        message: questInput.value
    });

    questInput.value = "";
    return false;
}, false);

//delete quest
function deleteQuest(ev){
    let t = ev.target;
    if (t.tagName === 'LI') {
        if (t.classList.contains('done')) {
            t.parentNode.removeChild(t);
        } else {
            t.classList.add('done');
        }
    };
    ev.preventDefault;
}

questlog.addEventListener('click', function (ev) {
    let t = ev.target;
    if (t.tagName === 'LI') {
        if (t.classList.contains('done')) {
            t.parentNode.removeChild(t);
            console.log('delte tes');
        } else {
            t.classList.add('done');
        }
    };
    ev.preventDefault;
}, false);

socket.on("deleteQuest", function (data) {
    console.log('delete');
    deleteQuest(ev);
});

socket.on("chat_message", function (data) {
    addMessage(data.username + ": " + data.message);
});

socket.on("roll", function (data) {
    addMessage(data.username + data.message);
});

socket.on("questlog", function (data) {
    addQuest(data.message);
})

socket.on("user_join", function (data) {
    addMessage("Grüße " + data + "!");
});

socket.on("user_leave", function (data) {
    addMessage("Gehabt Euch Wohl, " + data + "!");
});

addMessage("Grüße " + username + ".");
socket.emit("user_join", username);

//wenn jemand joined wird das playerlist array angeschaut und auf der basis die spielerklassen erzeugt
socket.on("showPlayers", function (data) {
    document.getElementById('nameContainer').innerHTML = "";
    document.getElementById('charContainer').innerHTML = "";
    for (i = 0; i < data.playerList.length; i++) {
        let player = new Player(data.playerList[i]);
    }
});

function addMessage(message) {
    const li = document.createElement("li");
    li.innerHTML = message;
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
}

function addQuest(message) {
    let li = document.createElement("li");
    li.innerHTML = message;
    questlog.appendChild(li);
}

function createDice() {
    let dropDown = document.createElement('div');
    dropDown.setAttribute('class', 'dropdown');
    let dropbtn = document.createElement('button');
    dropbtn.setAttribute('class', 'dropbtn');
    dropDown.appendChild(dropbtn);
    let dropDownContent = document.createElement('div');
    dropDownContent.setAttribute('class', 'dropdown-content');
    dropDown.appendChild(dropDownContent);
    document.getElementById('dice').appendChild(dropDown);

    let diceList = [20, 6, 8, 10, 12, 100];
    for (let i = 0; i < diceList.length; i++) {
        let a = document.createElement('a');
        a.setAttribute('href', '#');
        a.innerHTML = diceList[i];
        a.setAttribute('id', 'dice' + i);
        dropDownContent.appendChild(a);
        let diceButton = document.getElementById('dice' + i);
        diceButton.addEventListener('click', function () {
            let diceEyes = this.innerHTML;
            let rollResult = rollDice(diceEyes);

            socket.emit("roll", {
                message: " würfelt " + rollResult + " (d" + diceEyes + ")" + "\n"
            });
        });
    };
};

function rollDice(number) {
    number = Math.floor(Math.random() * number) + 1;
    return number;
}