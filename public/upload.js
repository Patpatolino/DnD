const hochladbtn = document.getElementById('hochloadButton');
let hochladinput = document.getElementById('hochladInput');
let uploadImage;

hochladbtn.addEventListener('click',function(){
    uploadimage = document.getElementById('dungeonMasterDiv').style.backgroundImage = "url("+hochladinput.value+")";
    let uploadurl = hochladinput.value;
    socket.emit("upload", uploadurl);
})

socket.on("upload", function (data) {
    document.getElementById('dungeonMasterDiv').style.backgroundImage = "url("+data+")";
});