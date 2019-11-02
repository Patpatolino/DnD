function switchVisible(div1) {
    if (div1) {

        if (div1.style.display == 'none') {
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
    switchVisible(document.getElementById('questDiv'));
})

let closeQuestlogButton = document.getElementById('closeQuestlog');
closeQuestlogButton.addEventListener('click', function(){
    document.getElementById('questDiv').style.display = 'none';
})