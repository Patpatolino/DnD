const express = require('express');
const app = express();
//middlewares
app.use(express.static('public'));
//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
//Listen on port 3000
server = app.listen(3000);
//socket.io instantiation
const io = require("socket.io")(server);

//SpielerListe fürs Namen Array
let playerList = [{}];

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on("user_join", function (data, klasse ) {
        this.username = data;
        // this.klasse = klasse;
        socket.broadcast.emit("user_join", data);

        //Name ins Array und an alle pushen
        let playerObject = {data,klasse};
        // console.log(playerObject);
        playerList.push(playerObject);
        socket.emit("showPlayers", {
            playerList
        });
        socket.broadcast.emit("showPlayers", {
            playerList
        });
    });

    socket.on("chat_message", function (data) {
        data.username = this.username;
        // socket.emit("chat_message", data);
        socket.broadcast.emit("chat_message", data);
    });

    socket.on("questlog", function (data) {
        data.username = this.username;
        socket.broadcast.emit("questlog", data);
    });

    socket.on("deleteQuest", function (data) {
        // data.username = this.username;
        socket.broadcast.emit("deleteQuest", data);
        // console.log('delete');
    });

    //Würfelergebnis an alle
    socket.on("roll", function (data) {
        data.username = this.username;
        socket.emit("roll", data);
        socket.broadcast.emit("roll", data);
    });

    socket.on("upload", function (data){
        socket.emit("upload", data);
        socket.broadcast.emit("upload", data);
    });

    socket.on("disconnect", function (data) {
        socket.broadcast.emit("user_leave", this.username);

        // console.log(playerList);
        //Name aus Array und an alle senden
        for (i = 1; i < playerList.length; i++) {
            if (playerList[i].data === this.username) {
                playerList.splice(i, 1);
            }
        }
        socket.emit("showPlayers", {
            playerList
        });
        socket.broadcast.emit("showPlayers", {
            playerList
        });
    });
})