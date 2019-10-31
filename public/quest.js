const questForm = document.getElementById('questForm');
const questInput = document.getElementById('questInput');
const questlog = document.getElementById('questlog');

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

//TODO quest wird nur lokal gelöscht
//TODO socket emit - socket on - socket on(server) - socket.broadcast
questlog.addEventListener('click', function(ev){
    event.preventDefault();
    console.log(ev);
    // socket.emit('deleteQuest', ev, console.log('deletequest emit'));
    socket.emit('deleteQuest', ev);

    // socket.on('deleteQuest', socket.emit('deleteQuest', deleteQuest(ev)));
    // deleteQuest(ev);
})

socket.on("deleteQuest", function (ev){
    deleteQuest(ev);
})

socket.on("questlog", function (data) {
    addQuest(data.message);
})

function addQuest(message) {
    let li = document.createElement("li");
    li.innerHTML = message;
    questlog.appendChild(li);
}

function deleteQuest(ev) {
    let t = ev.prototype.target;
    if (t.tagName === 'LI') {
        if (t.classList.contains('done')) {
            t.parentNode.removeChild(t);
            console.log('Funktion DeleteQuest');
        } else {
            t.classList.add('done');
        }
    };
    ev.preventDefault;
}