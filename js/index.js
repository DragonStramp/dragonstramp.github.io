var dBtn = document.getElementById("daegon-btn");

dBtn.onclick = function() {
  dBtn.style.color = ("RGBA(0,145,142,0)");
  dBtn.style.fontSize = ("1.5vmax");
  setTimeout(function() {
    dBtn.innerHTML = ("daegon.stam@gmail.com");
    dBtn.style.color = ("white");
  }, 600);
};
