randomText = document.getElementsByClassName("random")

function makeNumberString() {
    let randomNumbers = "";
    for(i=0; i < 12; i++) {
        randomNumbers = randomNumbers + (Math.random() * i);
    }
    return randomNumbers;
}

function setNumber() {
    for(i = 0; i < randomText.length; i++) {
        randomText[i].innerHTML = makeNumberString();
    }
}
setInterval(function () {
    setNumber();
}, 500)