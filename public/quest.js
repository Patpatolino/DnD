const questForm = document.getElementById('questForm');
const questInput = document.getElementById('questInput');
const questlog = document.getElementById('questlog');
let questList = [];

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

questlog.addEventListener('click', function (ev) {
    event.preventDefault();
    //Questlog wird sonst gelöscht
    if (event.target.id === 'questlog') {
        return;
    } else {
        deleteQuest(ev); //self
        socket.emit('deleteQuest', ev.target.id); //server
    }
})

socket.on("deleteQuest", function (ev) {
    deleteQuest(ev);
})

socket.on("questlog", function (data) {
    addQuest(data.message);
})

function addQuest(message) {
    let i = 0;
    while (i < questList.length) {
        i++;
    }
    let li = document.createElement("li");
    li.innerHTML = message;
    li.setAttribute('id', 'li_' + i);
    questList.push(li);
    questlog.appendChild(li);
}

function deleteQuest(ev) {
    let t;
    //Weirder code weil man dem socket kein mouseevent übergeben kann
    if (typeof ev !== 'string') {
        t = ev.target.id;
        document.getElementById('' + t).remove();
    } else {
        t = ev;
        document.getElementById('' + t).remove();
    }
    for (let i = 0; i < questList.length; i++) {
        if (questList[i].id === t) {
            questList.splice(i, 1);
        }
    }
}