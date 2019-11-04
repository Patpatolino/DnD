//TODO socket emit - socket on - socket on(server) - socket.broadcast

const loginbtn = document.getElementById('loginButton').addEventListener('click', function () {

    console.log('test');
    const username = document.getElementById('loginInput').value;
    dnd(username);
});

const form = document.getElementById('chatForm');
const input = document.getElementById('chatText');
const messages = document.getElementById('chatlog');

//login prompt
// let promptName = prompt("Gib deinen Charakternamen ein:");
// const username = promptName.substring(0, 30);

const socket = io();

function dnd(username) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('dnd').style.display = 'block';

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

        addMessage("<b>" + username + "</b>" + ": " + input.value);

        socket.emit("chat_message", {
            message: input.value
        });

        input.value = "";
        return false;
    }, false);

    socket.on("chat_message", function (data) {
        addMessage("<b>" + data.username + "</b>" + ": " + data.message);
    });

    socket.on("roll", function (data) {
        addMessage("<b>" + data.username + "</b>" + data.message);
    });

    socket.on("user_join", function (data) {
        addMessage("Grüße " + "<b>" + data + "</b>" + "!");
    });

    socket.on("user_leave", function (data) {
        addMessage("Gehabt Euch Wohl, " + "<b>" + data + "</b>" + "!");
    });

    addMessage("Grüße " + "<b>" + username + "</b>" + ".");
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

    function createDice() {
        let diceList = [4, 6, 8, 10, 12, 20];
        for (i = 0; i < diceList.length; i++) {
            const diceEyes = diceList[i];
            document.getElementById('d' + diceEyes).addEventListener('click', function () {
                const rollResult = rollDice(diceEyes);
                socket.emit("roll", {
                    message: " würfelt " + "<b>" + rollResult + "</b>" + " (d" + diceEyes + ")" + "\n"
                });
            })
        }
    }

    function rollDice(number) {
        number = Math.floor(Math.random() * number) + 1;
        return number;
    }
}