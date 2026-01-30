var cactus = document.getElementById("cactus");
var pText = document.getElementById("header-points");
var pSec = document.getElementById("header-per-second");
var pMult = document.getElementById("header-multiplier");
var copperNumber = 1;
var gloveNumber = 1;
var internNumber = 1;
var pearNumber = 1;
var cactusNumber = 1;
var cactusData = {
  rotation:0,
  size:"20vmax",
  position:"11vmax",
  copper:"",
  pear:"",
  sentient:false,
  cactusType: "saguaro"
};
var points = {
  value:0,
  perSecond:0,
  multiplier:0
};
function start() {
  cactus.style.width = (cactusData.size);
  cactus.style.height = (cactusData.size);
  cactus.style.left = (cactusData.position);
  cactus.style.top = (cactusData.position);
}
start();
function update(){
  pText.innerHTML = ("Needles: " + Math.floor(points.value));
  pSec.innerHTML = ("Needles Per Second: " + points.perSecond);
  pMult.innerHTML = ("Needles Per Click: " + (points.multiplier+1));
  cactus.src = ("sprites/cactus/" + cactusData.cactusType + "/" + cactusData.cactusType + cactusData.copper + cactusData.pear + ".png");
}
update();
function advance() {
  if (copperNumber > 1 && gloveNumber > 1 && internNumber > 1 && pearNumber > 1) {
    document.getElementById("upgrade-cactus").classList.remove("locked");
    document.getElementById("upgrade-text").classList.remove("locked");
    document.getElementById("upgrade-cactus").src = ("sprites/shops/upgrade-cactus.png");
    document.getElementById("upgrade-text").innerHTML = ("Moon Cactus: " + (1000*cactusNumber) + " needles");
  }
}

function cactusClick() {
  cactus.style.width = ("22vmax");
  cactus.style.height = ("22vmax");
  cactus.style.left = ("10vmax");
  cactus.style.top = ("10vmax");
  points.value = points.value + 1 + (1 * points.multiplier);
  update();
  setTimeout(function(){
    cactus.style.width = ("19vmax");
    cactus.style.height = ("19vmax");
    cactus.style.left = ("11.5vmax");
    cactus.style.top = ("11.5vmax");
  }, 100);
  setTimeout(function(){
    cactus.style.width = (cactusData.size);
    cactus.style.height = (cactusData.size);
    cactus.style.left = (cactusData.position);
    cactus.style.top = (cactusData.position);
  }, 175);
}

// function bounceAnimation(clickObject) {
//   console.log(clickObject.style.width);
//     clickObject.style.width = "5.1vmax";
//     clickObject.style.height = "5.1vmax";
//   setTimeout(function(){
//     clickObject.style.width = "4.9vmax";
//     clickObject.style.height = "4.9vmax";
//   }, 100);
//   setTimeout(function(){
//     clickObject.style.width = "5vmax";
//     clickObject.style.height = "5vmax";
//   }, 175);
//   console.log(clickObject);
// }

setInterval(function(){
  points.value +=(points.perSecond/100);
  update()
}, 10);

function glove() {
  if (points.value >= 25*gloveNumber) {
    points.value -= (25*gloveNumber);
    gloveNumber++;
    points.multiplier++;
    document.getElementById("glove-text").innerHTML = ("Hand Reinforcers: " + (25*gloveNumber) + " Needles");
    update();
    advance();
  }
}
  function intern() {
    if (points.value >= 100*internNumber && internNumber) {
      points.value -= (100*internNumber);
      internNumber++;
      points.perSecond += 3;
      document.getElementById("intern-text").innerHTML = ("Unpaid Intern: " + (100*internNumber) + " Needles");
      update();
      advance();
    }
}
function copper() {
  if (points.value >= 150*copperNumber) {
    points.value -= (150*copperNumber);
    copperNumber++;
    points.perSecond += 4;
    cactusData.copper = ("-copper");
    document.getElementById("copper-text").innerHTML = ("Copper Plating: " + (150*copperNumber) + " Needles");
    update();
    advance();
  }
}
function pear() {
  if (points.value >= 250*pearNumber) {
    points.value -= (250*pearNumber);
    pearNumber++;
    points.perSecond += 6;
    cactusData.pear = ("-fruit");
    document.getElementById("pear-text").innerHTML = ("Prickly Pears: " + (250*copperNumber) + " Needles");
    update();
    advance();
}
}
function upgradeCactus() {
  if (cactusData.copper === "-copper" && cactusData.pear === "-fruit" && cactusData.cactusType === "saguaro" && points.value >= 1000 * cactusNumber) {
    points.value -= (1000*cactusNumber);
    cactusNumber++;
    points.multiplier += 16;
    document.getElementById("upgrade-text").innerHTML = ("Bread Cactus: " + (1000*cactusNumber) + " Needles");
    cactusData.cactusType = "moon";
    update();
  } else if (cactusData.copper === "-copper" && cactusData.pear === "-fruit" && cactusData.cactusType === "moon" && points.value >= 1000 * cactusNumber) {
      points.value -= (1000*cactusNumber);
      cactusNumber++;
      points.multiplier += 10;
      document.getElementById("upgrade-text").innerHTML = ("Bean Cactus: " + (1000*cactusNumber) + " Needles");
      cactusData.cactusType = "toast";
      document.getElementById("background-image").src = ("sprites/design/kitchen-background.png");
      update();
    } else if (cactusData.copper === "-copper" && cactusData.pear === "-fruit" && cactusData.cactusType === "toast" && points.value >= 1000 * cactusNumber) {
        points.value -= (1000*cactusNumber);
        cactusNumber++;
        points.multiplier += 10;
        document.getElementById("upgrade-text").innerHTML = ("Dog Cactus: " + (1000*cactusNumber) + " Needles");
        cactusData.cactusType = "bean";
        document.getElementById("background-image").src = ("sprites/design/farm-background.png");
        update();
      } else if (cactusData.copper === "-copper" && cactusData.pear === "-fruit" && cactusData.cactusType === "bean" && points.value >= 1000 * cactusNumber) {
          points.value -= (1000*cactusNumber);
          cactusNumber++;
          points.multiplier += 10;
          document.getElementById("upgrade-text").innerHTML = ("Space Cactus: " + (1000*cactusNumber) + " Needles");
          cactusData.cactusType = "dog";
          update();
        } else if (cactusData.copper === "-copper" && cactusData.pear === "-fruit" && cactusData.cactusType === "dog" && points.value >= 1000 * cactusNumber) {
            points.value -= (1000*cactusNumber);
            cactusNumber++;
            points.multiplier += 10;
            document.getElementById("upgrade-text").innerHTML = ("Next Cactus: " + (1000*cactusNumber) + " Needles");
            cactusData.cactusType = "space";
            update();
          } else if (cactusData.copper === "-copper" && cactusData.pear === "-fruit" && cactusData.cactusType === "space" && points.value >= 1000 * cactusNumber) {
              points.value -= (1000*cactusNumber);
              cactusNumber++;
              points.multiplier += 10;
              document.getElementById("upgrade-text").innerHTML = ("Next Cactus: " + (1000*cactusNumber) + " Needles");
              cactusData.cactusType = "face";
              update();
            }
}
function devMode() {
  points.value += 20000000;
  update();
}
