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

function RenameCounter(counterNumber, counterName)
{
    localStorage.setItem("counter" + (counterNumber - 1).toString() + "name", counterName);
    headers[counterNumber - 1].innerText = counterNames[counterNumber - 1] + ": " + counterNumbers[counterNumber - 1].toString();
    console.log("Renamed!");
}

function ResetNumber(cNum)
{
    counterNumbers[cNum] = 0;
    headers[cNum].innerText = counterNames[cNum] + ": " + counterNumbers[cNum].toString();
    localStorage.setItem("counter" + cNum.toString() + "num", counterNumbers[cNum]);
}

function StorageClear()
{
    localStorage.clear();
}