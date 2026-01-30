const header1 = document.getElementById("header1");
const header2 = document.getElementById("header2");
const header3 = document.getElementById("header3");
const header4 = document.getElementById("header4");
const header5 = document.getElementById("header5");

var counter1name = localStorage.getItem("counter1name") || "Counter 1";
var counter1num = Number(localStorage.getItem("counter1num")) || 0;

var counter2name = localStorage.getItem("counter2name") || "Counter 2";
var counter2num = Number(localStorage.getItem("counter2num")) || 0;

var counter3name = localStorage.getItem("counter3name") || "Counter 3";
var counter3num = Number(localStorage.getItem("counter3num")) || 0;

var counter4name = localStorage.getItem("counter4name") || "Counter 4";
var counter4num = Number(localStorage.getItem("counter4num")) || 0;

var counter5name = localStorage.getItem("counter5name") || "Counter 5";
var counter5num = Number(localStorage.getItem("counter5num")) || 0;

header1.innerText = counter1name + ": " + counter1num.toString();
header2.innerText = counter2name + ": " + counter2num.toString();
header3.innerText = counter3name + ": " + counter3num.toString();
header4.innerText = counter4name + ": " + counter4num.toString();
header5.innerText = counter5name + ": " + counter5num.toString();

function IncreaseCounter1()
{
    counter1num += 1;
    header1.innerText = counter1name + ": " + counter1num.toString();
    localStorage.setItem("counter1num", counter1num);
}

function IncreaseCounter2()
{
    counter2num += 1;
    header2.innerText = counter2name + ": " + counter2num.toString();
    localStorage.setItem("counter2num", counter2num);
}

function IncreaseCounter3()
{
    counter3num += 1;
    header3.innerText = counter3name + ": " + counter3num.toString();
    localStorage.setItem("counter3num", counter3num);
}

function IncreaseCounter4()
{
    counter4num += 1;
    header4.innerText = counter4name + ": " + counter4num.toString();
    localStorage.setItem("counter4num", counter4num);
}

function IncreaseCounter5()
{
    counter5num += 1;
    header5.innerText = counter5name + ": " + counter5num.toString();
    localStorage.setItem("counter5num", counter5num);
}

function RenameCounter(counterNumber, counterName)
{
    localStorage.setItem("counter" + counterNumber.toString() + "name", counterName);
    console.log("Renamed!");
}