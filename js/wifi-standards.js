let answers = ['', '', ''];
let questionNumber = 0;
let streak = 0;

const streakText = document.getElementById("streak-text");
const helperCard = document.getElementById("helper-card");
const b1 = document.getElementById("button1");
const b2 = document.getElementById("button2");
const b3 = document.getElementById("button3");

const standards = [
    { standard: "802.11a", gen:"Unnamed", frequency: "5 GHz", max: "6-54 MBit/s" },
    { standard: "802.11b", gen:"Unnamed", frequency: "2.4 GHz", max: "1-11 MBit/s" },
    { standard: "802.11g", gen:"Unnamed", frequency: "2.4 GHz", max: "6-54 MBit/s" },
    { standard: "802.11n", gen:"Wi-Fi 4", frequency: "2.4 GHz / 5 GHz", max: "72-600 MBit/s" },
    { standard: "802.11ac", gen:"Wi-Fi 5", frequency: "5 GHz", max: "433-6,933 MBit/s" },
    { standard: "802.11ax", gen:"Wi-Fi 6 and 6e", frequency: "2.4 GHz / 5 GHz / 6 GHz", max: "574-9,608 MBit/s" },
    { standard: "802.11be", gen:"Wi-Fi 7", frequency: "2.4 GHz / 5 GHz / 6 GHz", max: "1,376-46,120 MBit/s" },
]

function newQuestion()
{
    questionNumber = Math.floor(Math.random() * standards.length);
    b1.innerText = "Frequency";
    b2.innerText = "Generation Name";
    b3.innerText = "Max Theoretical Link Rate";
    document.getElementById("main-name").innerText = standards[questionNumber].standard;
}

function setButton(buttonID, buttonText, answerNumber) {
    document.getElementById(buttonID).innerText = buttonText;
    answers[answerNumber] = buttonText;
}

function gradeQuestion()
{
    if(answers[0] == standards[questionNumber].frequency && answers[1] == standards[questionNumber].gen && answers[2] == standards[questionNumber].max)
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
    document.getElementById("helper-third").innerText = standards[qNum].standard;
    document.getElementById("helper-second").innerText = `Generation Name: ${standards[qNum].gen}`;
    document.getElementById("helper-main").innerText = `Frequencies: ${standards[qNum].frequency}`;
    document.getElementById("helper-fourth").innerText = `Max Theoretical Link Rate: ${standards[qNum].max}`;
}

function handleStreak()
{
    streakText.innerText = `Streak: ${streak}`;
}

newQuestion();