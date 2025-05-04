const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const megamindImg = new Image();


megamindImg.src = '../images/memes/megamind.png';


function megamind() {
    console.log(megamindImg);
    canvas.style.display = "block";
    canvas.width = megamindImg.width;
    canvas.height = megamindImg.height;
    draw(megamindImg); // Draw the initial image when it's loaded
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