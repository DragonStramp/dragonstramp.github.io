setInterval(function() {
  if (window.pageYOffset === 0) {
    nav.style.backgroundColor = ("rgba(0, 0, 0, 0)");
  } else {
    nav.style.backgroundColor = ("var(--bg-color)");
  }
}, 10);
