const headers = [];
const counterNames = [];
const counterNumbers = [];

let counters = document.getElementsByClassName("counter-box");
let cards = document.getElementsByClassName("card");
let buttonCount = 5;
let darkMode = true;


//Theming

let currentTheme = localStorage.getItem("theme") || "dark";
let currentMode = localStorage.getItem("mode") || "dark";

changeTheme(currentTheme, true, currentMode);

document.getElementById(currentTheme + 'ModeCheck').checked = true;

document.getElementById("darkModeCheck").addEventListener("change", e => {
    clearThemes();
    changeTheme('dark', true, 'dark');
});

document.getElementById("lightModeCheck").addEventListener("change", e => {
    clearThemes();
    changeTheme('light', true, 'light');
});

document.getElementById("pinkModeCheck").addEventListener("change", e => {
    clearThemes();
    changeTheme('pink', true, 'light');
});

document.getElementById("mangoModeCheck").addEventListener("change", e => {
    clearThemes();
    changeTheme('mango', true, 'light');
});

document.getElementById("synthModeCheck").addEventListener("change", e => {
    clearThemes();
    changeTheme('synth', true, 'dark');
});

document.getElementById("dwarfModeCheck").addEventListener("change", e => {
    clearThemes();
    changeTheme('dwarf', true, 'dark');
});

document.getElementById("mineModeCheck").addEventListener("change", e => {
    clearThemes();
    changeTheme('mine', true, 'dark');
});

document.getElementById("loraxModeCheck").addEventListener("change", e => {
    clearThemes();
    changeTheme('lorax', true, 'dark');
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
    changeTheme('dwarf', false, 'light');
    changeTheme('mine', false, 'light');
    changeTheme('lorax', false, 'light');
}

function StorageClear()
{
    localStorage.clear();
}

function changeTheme(themeName, isEnabled, baseTheme)
{
    document.getElementById("main").setAttribute('data-bs-theme', baseTheme);
    localStorage.setItem("theme", themeName);
    localStorage.setItem("mode", baseTheme);
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

for(let i = 0; i < buttonCount; i++)
{
    headers.push(document.getElementById("header" + i.toString()));
    counterNames.push(localStorage.getItem("counter" + i.toString() + "name") || "Counter " + (i + 1).toString());
    counterNumbers.push(Number(localStorage.getItem("counter" + i.toString() + "num")) || 0);
}

for(let i = 0; i < buttonCount; i++)
{
    headers[i].innerText = counterNames[i] + ": " + counterNumbers[i].toString();
}

function IncreaseCounter(cNum)
{
    counterNumbers[cNum] += 1;
    headers[cNum].innerText = counterNames[cNum] + ": " + counterNumbers[cNum].toString();
    localStorage.setItem("counter" + cNum.toString() + "num", counterNumbers[cNum]);
}

function SetCounterName()
{
    let newName = document.getElementById("new-counter-name").value;
    let newNum = parseInt(document.getElementById("new-counter-number").value);

    if (!newName || isNaN(newNum) || newNum < 1 || newNum > buttonCount) {
        return;
    }
    counterNames[newNum - 1] = newName;
    localStorage.setItem("counter" + (newNum - 1) + "name", newName);
    headers[newNum - 1].innerText = counterNames[newNum - 1] + ": " + counterNumbers[newNum - 1];
}

function ResetNumber(cNum)
{
    if (confirm("Reset " + counterNames[cNum] + " count?")) {
        counterNumbers[cNum] = 0;
        headers[cNum].innerText = counterNames[cNum] + ": " + counterNumbers[cNum].toString();
        localStorage.setItem("counter" + cNum.toString() + "num", counterNumbers[cNum]);
    }
}

function SubtractNumber(cNum)
{
    counterNumbers[cNum] -= 1;
    headers[cNum].innerText = counterNames[cNum] + ": " + counterNumbers[cNum].toString();
    localStorage.setItem("counter" + cNum.toString() + "num", counterNumbers[cNum]);
}

function StorageClear()
{
    localStorage.clear();
}

function Simplify(isEnabled)
{
    let simpleButtons = document.getElementsByClassName("smb");
    let simpleHeaders = document.getElementsByClassName("smh");

    for(let i = 0; i < simpleButtons.length; i++)
    {
        simpleButtons[i].classList.toggle("simple-button", isEnabled);
    }
    for(let i = 0; i < simpleHeaders.length; i++)
    {
        simpleHeaders[i].classList.toggle("simple-text", isEnabled);
        simpleHeaders[i].classList.toggle("mb-3", !isEnabled);
    }
}

function ToggleTimers(isEnabled)
{
    document.getElementById("timers").classList.toggle("shown", !isEnabled);
}

function ToggleTransparent(isEnabled)
{
    Array.from(cards).forEach(card => {
        card.classList.toggle("transparent", isEnabled);
    });
}