function switchVisible(div1) {
    if (div1) {

        if (div1.style.display === 'none') {
            div1.style.display = 'block';
            // div2.style.display = 'none';
        }
        else {
            div1.style.display = 'none';
            // div2.style.display = 'block';
        }
    }
}

let showQuestlogButton = document.getElementById('showQuestlog');

showQuestlogButton.addEventListener('click', function(){
    switchVisible(document.getElementById('questContainer'));
})

let closeQuestlogButton = document.getElementById('closeQuestlog');
closeQuestlogButton.addEventListener('click', function(){
    document.getElementById('questContainer').style.display = 'none';
})


//Dragme func
function drag_start(event) {
    let style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
} 
function drag_over(event) { 
    event.preventDefault(); 
    return false; 
} 
function drop(event) { 
    let offset = event.dataTransfer.getData("text/plain").split(',');
    let dm = document.getElementById('questContainer');
    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    return false;
} 
let dm = document.getElementById('questContainer'); 
dm.addEventListener('dragstart',drag_start,false); 
document.body.addEventListener('dragover',drag_over,false); 
document.body.addEventListener('drop',drop,false); 
