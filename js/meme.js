const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const megamindImg = new Image();
const iLoveMyImg = new Image();
const vanishMemeImg = new Image();
const nineteenImg = new Image();
const guessWeImg = new Image();
const gamblingImg = new Image();
const bulblaxImg = new Image();
const imPikminImg = new Image();
const planktonImg = new Image();
const liveReactionImg = new Image();


megamindImg.src = '../images/memes/megamind.png';
iLoveMyImg.src = '../images/memes/ilovemy.png';
vanishMemeImg.src = '../images/memes/peace.png'
nineteenImg.src = '../images/memes/1984.png';
guessWeImg.src = '../images/memes/guess we doin.png';
gamblingImg.src = '../images/memes/gambling.png';
bulblaxImg.src = '../images/memes/bulblaxo.png';
imPikminImg.src = '../images/memes/impikmin.png';
planktonImg.src = '../images/memes/planktono.png';
liveReactionImg.src = '../images/memes/livereaction.png';

function megamind() {
    canvas.style.display = "block";
    canvas.width = megamindImg.width;
    canvas.height = megamindImg.height;
    draw(megamindImg); // Draw the initial image when it's loaded
}

function bulblax() {
  canvas.style.display = "block";
  canvas.width = bulblaxImg.width;
  canvas.height = bulblaxImg.height;
  draw(bulblaxImg); // Draw the initial image when it's loaded
}

function liveReaction() {
  canvas.style.display = "block";
  canvas.width = liveReactionImg.width;
  canvas.height = liveReactionImg.height;
  drawLiveReaction(liveReactionImg); // Draw the initial image when it's loaded
}

function plankton() {
  canvas.style.display = "block";
  canvas.width = planktonImg.width;
  canvas.height = planktonImg.height;
  draw(planktonImg); // Draw the initial image when it's loaded
}

function imPikmin() {
  canvas.style.display = "block";
  canvas.width = imPikminImg.width;
  canvas.height = imPikminImg.height;
  drawPikmin(imPikminImg); // Draw the initial image when it's loaded
}

function gambling() {
  canvas.style.display = "block";
  canvas.width = gamblingImg.width;
  canvas.height = gamblingImg.height;
  draw(gamblingImg); // Draw the initial image when it's loaded
}

function guesswedoin() {
  canvas.style.display = "block";
  canvas.width = guessWeImg.width;
  canvas.height = guessWeImg.height;
  drawGuessWeDoin(guessWeImg); // Draw the initial image when it's loaded
}

function vanish() {
  canvas.style.display = "block";
  canvas.width = vanishMemeImg.width;
  canvas.height = vanishMemeImg.height;
  draw(vanishMemeImg); // Draw the initial image when it's loaded
}

function nineteeneightyfour() {
  canvas.style.display = "block";
  canvas.width = nineteenImg.width;
  canvas.height = nineteenImg.height;
  draw(nineteenImg); // Draw the initial image when it's loaded
}

function iLoveMy() {
  canvas.style.display = "block";
  canvas.width = iLoveMyImg.width;
  canvas.height = iLoveMyImg.height;
  drawILoveMy(iLoveMyImg); // Draw the initial image when it's loaded
}

function drawILoveMy(img) {
  ctx.drawImage(img, 0, 0);

  const text = document.getElementById('textInput').value;
  if (!text) return;

  // Dynamic font sizing
  ctx.font = '15px Lexend';

  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText("i love my " + text, 150, 20);
  ctx.fillText("i love my " + text, 150, 280);
  ctx.fillStyle = 'white';
  ctx.fillText("where's my " + text, 500, 280);
}

function drawLiveReaction(img) {
  const boxHeight = 100;
  const text = "LIVE " + document.getElementById('textInput').value + " REACTION";
  const reactionImage = new Image();
  const input = document.getElementById('imageUpload');
  const file = input.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    reactionImage.onload = function () {
      // Draw base image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Draw uploaded image
      ctx.drawImage(reactionImage, 10, 100, 525, 275);

      // Dynamic font sizing
      let fontSize = boxHeight - 10;
      ctx.font = `${fontSize}px Lexend`;
      let textWidth = ctx.measureText(text).width;

      while ((textWidth > canvas.width - 20 || fontSize > boxHeight) && fontSize > 10) {
        fontSize -= 1;
        ctx.font = `${fontSize}px sans-serif`;
        textWidth = ctx.measureText(text).width;
      }

      // Draw text
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, boxHeight / 2);
    };

    reactionImage.src = event.target.result;
  };

  reader.readAsDataURL(file);
}


function drawPikmin(img) {
  ctx.drawImage(img, 0, 0);

  const text = document.getElementById('textInput').value;
  // Dynamic font sizing
  ctx.font = '35px Lexend';

  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 300, 325);
}

function drawGuessWeDoin(img) {
  ctx.drawImage(img, 0, 0);

  const text = document.getElementById('textInput').value;
  // Dynamic font sizing
  ctx.font = '15px Lexend';

  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 240, 40);
}


function draw(img) {
  ctx.drawImage(img, 0, 0);

  const boxHeight = 100;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, boxHeight);

  const text = document.getElementById('textInput').value;
  if (!text) return;

  // Dynamic font sizing
  let fontSize = boxHeight - 10; // Start with nearly full height
  ctx.font = `${fontSize}px Lexend`;
  let textWidth = ctx.measureText(text).width;

  while ((textWidth > canvas.width - 20 || fontSize > boxHeight) && fontSize > 10) {
    fontSize -= 1;
    ctx.font = `${fontSize}px sans-serif`;
    textWidth = ctx.measureText(text).width;
  }

  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, boxHeight / 2);
}