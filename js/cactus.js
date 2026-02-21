const defaultCactusSprites = ["images/cactus/big-default-cactus.png", "images/cactus/big-default-cactus-fruit1.png", "images/cactus/big-default-cactus-fruit2.png", "images/cactus/big-default-cactus-fruit3.png"];
const mainCactus = document.getElementById("main-cactus");
const blossomCount = document.getElementById("blossom-count");
const blossomIncreaseButton = document.getElementById("blossom-increase-button");

var fruitTime = 5000;
var currentCactus = 0;
var blossoms = 0;
var maxBlossoms = 1;
var fruitTimer;

var blossomIncreasePrice = 3;


function updateUI() {
    blossomIncreaseButton.innerText = "More Blossoms: " + blossomIncreasePrice.toString() + "b";
    blossomCount.innerText = "Blossoms: " + blossoms.toString();
}

function addFruit() {
    if(currentCactus < maxBlossoms)
    {
        currentCactus += 1;
        mainCactus.src = defaultCactusSprites[currentCactus];
        fruitTimer = setTimeout(addFruit, fruitTime);
    }
}

function clickCactus() {
    if(currentCactus > 0)
    {
        blossoms += currentCactus;
        currentCactus = 0;
        mainCactus.src = defaultCactusSprites[currentCactus];
        updateUI();
    }
}

function increaseBlossoms() {
    if(blossoms >= blossomIncreasePrice)
    {
        blossoms -= blossomIncreasePrice;
        blossomIncreasePrice *= 2;
        maxBlossoms += 1;
        updateUI();
    }
}

updateUI();
fruitTimer = setTimeout(addFruit, fruitTime);
