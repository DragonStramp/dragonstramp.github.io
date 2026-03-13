let questionNumber = 0;
let streak = 0;
let questionAddress = 0;
let answer = "";

const streakText = document.getElementById("streak-text");
const helperCard = document.getElementById("helper-card");
const b1 = document.getElementById("button1");


const standards = [
    { class: "Class A", address1: "10.1.1.10", address2: "15.28.34.50", address3: "63.210.4.50" },
    { class: "Class B", address1: "172.16.30.5", address2: "120.70.5.10", address3: "191.255.20.1" },
    { class: "Class C", address1: "192.168.5.2", address2: "202.20.5.5", address3: "223.20.1.1" },
    { class: "Class D", address1: "224.1.0.1", address2: "231.50.2.1", address3: "239.25.60.1" },
    { class: "Class E", address1: "240.1.5.2", address2: "250.5.1.3", address3: "255.255.255.255" },
    { class: "Loopback", address1: "127.0.0.1", address2: "127.25.0.1", address3: "127.50.1.1" },
    { class: "APIPA", address1: "169.254.0.1", address2: "169.254.50.5", address3: "169.254.255.254" }
]

function newQuestion()
{
    questionNumber = Math.floor(Math.random() * standards.length);
    b1.innerText = "Address Class";
    questionAddress = Math.floor(Math.random() * 3);
    if (questionAddress == 0)
    {
        document.getElementById("main-name").innerText = standards[questionNumber].address1;
    } else if (questionAddress == 1)
    {
        document.getElementById("main-name").innerText = standards[questionNumber].address2;
    } if (questionAddress == 2)
    {
        document.getElementById("main-name").innerText = standards[questionNumber].address3;
    }
    
}

function setButton(buttonID, buttonText) {
    document.getElementById(buttonID).innerText = buttonText;
    answer = buttonText;
}

function gradeQuestion()
{
    if(answer == standards[questionNumber].class)
    {
        streak += 1;
        handleStreak();
        newQuestion();
    } else {
        setHelperCard(questionNumber);
        streak = 0;
        handleStreak();
    }
}

function setHelperCard(qNum)
{
    helperCard.style.display = "block";
    document.getElementById("helper-third").innerText = standards[qNum].class;
}

function handleStreak()
{
    streakText.innerText = `Streak: ${streak}`;
}

newQuestion();