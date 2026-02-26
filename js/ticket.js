var copyText = "";
const followupCheck = document.getElementById("fucheck");
const snipCheck = document.getElementById("snipcheck");
const notescheck = document.getElementById("notecheck");
const nameText = document.getElementById("nametext");
const usernametext = document.getElementById("usernametext");
const numberText = document.getElementById("numbertext");
const logtext = document.getElementById("logtext");
const whytext = document.getElementById("whytext");
const didtext = document.getElementById("didtext");
const snippettext = document.getElementById("snippeteditor");
const notestext = document.getElementById("notestext");
const followtext = document.getElementById("followuptext");

let currentTheme = localStorage.getItem("theme" || "darkMode");

if(currentTheme == "dark")
{
  darkMode();
} else if (currentTheme == "light")
{
  lightMode();
} else if (currentTheme == "pink")
{
  lightMode();
  changeClasses("pink", true);
} else if (currentTheme == "mango")
{
  lightMode();
  changeClasses("mango", true);
} else if (currentTheme == "synth")
{
  lightMode();
  changeClasses("synth", true);
}

document.getElementById(`${currentTheme}ModeCheck`).checked = true;

document.getElementById("darkModeCheck").addEventListener("change", function () {
  if (this.checked) {
    clearThemes();
    localStorage.setItem("theme", "dark");
    darkMode();
  }
});

document.getElementById("lightModeCheck").addEventListener("change", function () {
  if (this.checked) {
    clearThemes();
    localStorage.setItem("theme", "light");
  }
});

document.getElementById("pinkModeCheck").addEventListener("change", e => {
    localStorage.setItem("theme", "pink");
    clearThemes();
    lightMode();
    changeClasses("pink", true);
});

document.getElementById("mangoModeCheck").addEventListener("change", e => {
    localStorage.setItem("theme", "mango");
    clearThemes();
    lightMode();
    changeClasses("mango", true);
});

document.getElementById("synthModeCheck").addEventListener("change", e => {
    localStorage.setItem("theme", "synth");
    clearThemes();
    lightMode();
    changeClasses("synth", true);
});

function toggleClass(selector, className, isEnabled)
{
  document.querySelectorAll(selector).forEach(card => {
        card.classList.toggle(className, isEnabled);
    });
}

function clearThemes()
{
    changeClasses("pink", false);
    changeClasses("synth", false);
    changeClasses("mango", false);
}

let fus = document.getElementsByClassName("fu");
for(i = 0; i < fus.length; i++)
{
    fus[i].style.display = 'none';
}

function darkMode() {
  document.getElementById("main").setAttribute('data-bs-theme', 'dark');
}
function lightMode() {
  document.getElementById("main").setAttribute('data-bs-theme', 'light');
}
function changeClasses(themeName, isEnabled)
{
    toggleClass('.card', themeName + '-card', isEnabled);
    toggleClass('#main', themeName + '-background', isEnabled);
    toggleClass('h1', themeName + '-text', isEnabled);
    toggleClass('h2', themeName + '-text', isEnabled);
    toggleClass('h3', themeName + '-text', isEnabled);
    toggleClass('h4', themeName + '-text', isEnabled);
    toggleClass('a', themeName + '-text', isEnabled);
    toggleClass('.btn', themeName + '-card', isEnabled);
}

function followUpToggle()
{
    if(followupCheck.checked == true)
    {
        for(i = 0; i < fus.length; i++)
        {
            fus[i].style.display = 'block';
        }
    } else {
        for(i = 0; i < fus.length; i++)
        {
            fus[i].style.display = 'none';
        }
    }
}
function notesToggle()
{
    if(notescheck.checked == true)
    {
        notestext.style.display = 'block';
    } else {
        notestext.style.display = 'none';
    }
}

const finishededitor = new Quill('#finishededitor', {
  modules: {
  toolbar: false
  },
});

function CopyAuthPin()
{
  var emailText = "Hello, \n In recent communications with our support team, a copy of the authorization pin for your Mango Voice account was requested. \n \n Authorization Pin: " + document.getElementById("usernametext").value + "\n \n This pin is necessary for any Mango Voice support agents to make changes to your account. \n Thank you, \n Mango Voice Support.";
  navigator.clipboard.writeText(emailText);
  document.getElementById("pinbutton").text = "Copied!";
  document.getElementById("pinbutton").classList.remove("button");
  document.getElementById("pinbutton").classList.add("buttonpressedtool");
}
function CopyPasswordLink()
{
  var emailText = "Hello, \n In recent communications with our support team, a password link was requested to access your Mango Voice account. After setting up your password with the link below, you'll be able to log in using the following information: \n \n Username: " + document.getElementById("username").value + "\n Password Link: " + document.getElementById("resetlink").value + "\n \n Thank you, \n Mango Voice Support.";
  navigator.clipboard.writeText(emailText);
  document.getElementById("passbutton").text = "Copied!";
  document.getElementById("passbutton").classList.remove("button");
  document.getElementById("passbutton").classList.add("buttonpressedtool");
}

function snipToggle()
{
    if(snipCheck.checked == true)
    {
      snippettext.style.display = "block";
    } else {
      snippettext.style.display = "none";
    }
}

function SaveToClipboard() {
    document.getElementById("finishededitor").style.display = "block";
    document.getElementById("copy").text = "Copied!";
    document.getElementById("copy").classList.remove("button");
    document.getElementById("copy").classList.add("buttonpressed");
    finishededitor.setContents([
        {insert: ""},
      ])

      finishededitor.insertText(0, logtext.value + "\n", 'bold', false);
      finishededitor.insertText(0, didtext.innerText + "\n \n", 'bold', false);
      finishededitor.insertText(0, 'What I Did:\n', 'bold', true);
      finishededitor.insertText(0, whytext.innerText + "\n \n", 'bold', false);
      finishededitor.insertText(0, 'Why They Called:\n', 'bold', true);

      if(followupCheck.checked == true)
        {
          if(numberText.value != "")
            {
              finishededitor.insertText(0, 'FU Number: ' + numberText.value + "\n \n", 'bold', false);
            }
          if(nameText.value != "")
            {
              finishededitor.insertText(0, 'FU Name: ' + nameText.value + "\n", 'bold', false);
            }
          finishededitor.insertText(0, followtext.innerText + "\n", 'bold', false);
        }
    finishededitor.setSelection(0, finishededitor.getLength());
    document.execCommand('copy');
}