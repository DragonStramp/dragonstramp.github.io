const headers = [];
const counterNames = [];
const counterNumbers = [];
var buttonCount = 5;

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

function LightMode()
{
    document.getElementById("main").setAttribute('data-bs-theme', 'light');
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

function Minecraft()
{
    document.getElementById("main").classList.add("minecraft-background");
    document.getElementById("title").classList.add("minecraft-font");
    document.getElementById("title").innerText = "Minecraft";
    headers.forEach(header => {
        header.classList.add("minecraft-font");
    });
}

function ScaryMode()
{
    document.getElementById("main").classList.add("chris-background");
    document.getElementById("title").classList.add("chris-font");
    document.getElementById("title").innerText = "Chrissy Wake Up";
    headers.forEach(header => {
        header.classList.add("chris-font");
    });
}