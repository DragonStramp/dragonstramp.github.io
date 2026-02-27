var copyText = "";
const followupCheck = document.getElementById("fucheck");
const nameText = document.getElementById("nametext");
const usernametext = document.getElementById("usernametext");
const numberText = document.getElementById("numbertext");
const logtext = document.getElementById("logtext");
const whytext = document.getElementById("whytext");
const didtext = document.getElementById("didtext");
const followtext = document.getElementById("followuptext");


// Theming

let currentTheme = localStorage.getItem("theme") || "dark";

if(currentTheme == "dark")
{
  changeTheme('dark', true, 'dark');
} else if (currentTheme == "light")
{
  changeTheme('light', true, 'light');
} else if (currentTheme == "pink")
{
  changeTheme('pink', true, 'light');
} else if (currentTheme == "mango")
{
  changeTheme('mango', true, 'light');
} else if (currentTheme == "synth")
{
  changeTheme('synth', true, 'dark');
}

document.getElementById(currentTheme + 'ModeCheck').checked = true;

document.getElementById("darkModeCheck").addEventListener("change", function () {
    clearThemes();
    localStorage.setItem("theme", "dark");
    changeTheme('dark', true, 'dark');
});

document.getElementById("lightModeCheck").addEventListener("change", function () {
    clearThemes();
    localStorage.setItem("theme", "light");
    changeTheme('light', true, 'light');
});

document.getElementById("pinkModeCheck").addEventListener("change", e => {
    localStorage.setItem("theme", "pink");
    clearThemes();
    changeTheme('pink', true, 'light');
});

document.getElementById("mangoModeCheck").addEventListener("change", e => {
    localStorage.setItem("theme", "mango");
    clearThemes();
    changeTheme('mango', true, 'light');
});

document.getElementById("synthModeCheck").addEventListener("change", e => {
    localStorage.setItem("theme", "synth");
    clearThemes();
    changeTheme('synth', true, 'dark');
});

function toggleClass(selector, className, isEnabled)
{
  document.querySelectorAll(selector).forEach(card => {
        card.classList.toggle(className, isEnabled);
    });
}

function clearThemes()
{
    changeTheme('pink', false, 'light');
    changeTheme('mango', false, 'light');
    changeTheme('synth', false, 'light');
}

function StorageClear()
{
    localStorage.clear();
}

function changeTheme(themeName, isEnabled, baseTheme)
{
    document.getElementById("main").setAttribute('data-bs-theme', baseTheme);
    if(themeName != baseTheme)
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
}

// Logic

document.getElementById("fucheck").addEventListener("change", e => {
  
    document.querySelectorAll(".fu").forEach(fu => {
      if(document.getElementById("fucheck").checked)
      {
        fu.style.display = "block";
      } else {
        fu.style.display = "none";
      }   
  });
});

const finishededitor = new Quill('#finishededitor', {
  modules: {
  toolbar: false
  },
});

document.getElementById("copy").addEventListener("click", e => {
    SaveToClipboard();
});

function CopyAuthPin()
{
  var emailText = "Hello, \n In recent communications with our support team, a copy of the authorization pin for your Mango Voice account was requested. \n \n Authorization Pin: " + document.getElementById("usernametext").value + "\n \n This pin is necessary for any Mango Voice support agents to make changes to your account. \n Thank you, \n Mango Voice Support.";
  navigator.clipboard.writeText(emailText);
  document.getElementById("pinbutton").text = "Copied!";
}
function CopyPasswordLink()
{
  var emailText = "Hello, \n In recent communications with our support team, a password link was requested to access your Mango Voice account. After setting up your password with the link below, you'll be able to log in using the following information: \n \n Username: " + document.getElementById("username").value + "\n Password Link: " + document.getElementById("resetlink").value + "\n \n Thank you, \n Mango Voice Support.";
  navigator.clipboard.writeText(emailText);
  document.getElementById("passbutton").text = "Copied!";
}

function SaveToClipboard() {
    document.getElementById("finishededitor").style.display = "block";
    document.getElementById("copy").text = "Copied!";
    finishededitor.setContents([
        {insert: ""},
      ])

      finishededitor.insertText(0, `${logtext.value}\n`, 'bold', false);
            if(followupCheck.checked == true)
        {
          if(numberText.value != "")
            {
              finishededitor.insertText(0, `Number: ${numberText.value}\n \n`, 'bold', false);
            }
          if(nameText.value != "")
            {
              finishededitor.insertText(0, `Name: ${nameText.value}\n`, 'bold', false);
            }
          finishededitor.insertText(0, 'Callback Information: \n', 'bold', false);
        }
      finishededitor.insertText(0, `${didtext.innerText}\n \n`, 'bold', false);
      finishededitor.insertText(0, 'What I Did:\n', 'bold', true);
      finishededitor.insertText(0, `${whytext.innerText}\n \n`, 'bold', false);
      finishededitor.insertText(0, 'Why They Called:\n', 'bold', true);
    finishededitor.setSelection(0, finishededitor.getLength());
    document.execCommand('copy');
}