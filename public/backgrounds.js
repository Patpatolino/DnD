let defaultBackground = document.getElementById('background_one');
let forrestBackground = document.getElementById('background_two');
let tavernbackground = document.getElementById('background_three');
let dungeonbackground = document.getElementById('background_four');


defaultBackground.addEventListener('click', function(){
    document.getElementById('home').style.backgroundImage="url('/images/default.png')";
    let url = "url('/images/default.png')";
    socket.emit("changebackground", url);
})

forrestBackground.addEventListener('click', function(){
    document.getElementById('home').style.backgroundImage="url('/images/forrest.png')";
    let url = "url('/images/forrest.png')";
    socket.emit("changebackground", url);
})

tavernbackground.addEventListener('click', function(){
    document.getElementById('home').style.backgroundImage="url('/images/tavern.png')";
    let url = "url('/images/tavern.png')";
    socket.emit("changebackground", url);
})

dungeonbackground.addEventListener('click', function(){
    document.getElementById('home').style.backgroundImage="url('/images/dungeon.png')";
    let url = "url('/images/dungeon.png')";
    socket.emit("changebackground", url);
})

socket.on("changebackground", function (data) {
    document.getElementById('home').style.backgroundImage = data;
});


