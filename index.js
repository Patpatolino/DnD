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

//playerList
let playerList = [];

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on("user_join", function (data) {
        this.username = data;
        socket.broadcast.emit("user_join", data);

        //tests
        playerList.push(this.username);
        console.log(playerList);

        socket.emit("showPlayers", {
            playerList
        });
        socket.broadcast.emit("showPlayers", {
            playerList
        });
        //tests
    });

    socket.on("chat_message", function (data) {
        data.username = this.username;
        // socket.emit("chat_message", data);
        socket.broadcast.emit("chat_message", data);
    });

    socket.on("roll", function (data) {
        data.username = this.username;
        socket.emit("roll", data);
        socket.broadcast.emit("roll", data);
    });

    socket.on("disconnect", function (data) {
        socket.broadcast.emit("user_leave", this.username);

        //tests
        for (i = 0; i < playerList.length; i++) {
            if (playerList[i] === this.username) {
                playerList.splice(i, 1);
            }
        }
        // console.log(playerList);
        socket.emit("showPlayers", {
            playerList
        });
        socket.broadcast.emit("showPlayers", {
            playerList
        });
        //tests
    });


})