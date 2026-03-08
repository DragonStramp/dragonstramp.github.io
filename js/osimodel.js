const mainName = document.getElementById("main-name");
const firstQuestion = document.getElementById("first-question");
const secondQuestion = document.getElementById("second-question");
const firstInput = document.getElementById("first-input");
const secondInput = document.getElementById("second-input");
const submitButton = document.getElementById("submit-button");
const streakText = document.getElementById("streak-text");
const helperCard = document.getElementById("helper-card");

const layers = [
    { number: "1", name: "Physical", device: "Hub, Cable", protocol: "Ethernet, Token Ring", datatype: "Bits", description: "Transmission and reception of raw bit streams over a physical medium"},
    { number: "2", name: "Data Link", device: "Bridge, Unmanaged Switch", protocol: "Arp, Rarp", datatype: "Frames", description: "Transmission of data frames between two nodes connected by a physical layer"},
    { number: "3", name: "Network", device: "Router, Firewall, Managed Switch", protocol: "IP, ICMP, IGMP", datatype: "Packets", description: "Structuring and managing a multi-node network, including addressing, routing and traffic control"},
    { number: "4", name: "Transport", device: "Gateway", protocol: "TCP, UDP", datatype: "Segments", description: "Reliable transmission of data segments between points on a network, including segmentation, acknowledgement and multiplexing"},
    { number: "5", name: "Session", description: "Managing communication sessions, i.e., continuous exchange of information in the form of multiple back-and-forth transmissions between two nodes"},
    { number: "6", name: "Presentation", description: "Translation of data between a networking service and an application; including character encoding, data compression and encryption/decryption"},
    { number: "7", name: "Application", description: "High-level protocols such as for resource sharing or remote file access, e.g. HTTP."}
]

let questionNumber = 0;
let questionType = "";
let streak = 0;

function newQuestion()
{
    let q = Math.floor(Math.random() * 15);
    if(q < 5)
    {
        generateProtocolQuestion();
    } else if (q >= 5 && q < 10) {
        generateDeviceQuestion();
    } else if (q >= 10 && q < 15) {
        generateDescriptionQuestion();
    } else {
        generateDataQuestion();
    }
}

function generateProtocolQuestion()
{
    questionNumber = Math.floor(Math.random() * 3.9);
    questionType = "port";
    mainName.innerText = `Protocols: ${layers[questionNumber].protocol}`;
}

function generateDeviceQuestion()
{
    questionNumber = Math.floor(Math.random() * 3.9);
    questionType = "device";
    mainName.innerText = `Devices: ${layers[questionNumber].device}`;
}

function generateDescriptionQuestion()
{
    questionNumber = Math.floor(Math.random() * layers.length);
    questionType = "desc";
    mainName.innerText = layers[questionNumber].description;
}

function generateDataQuestion()
{
    questionNumber = Math.floor(Math.random() * 3.9);
    questionType = "data";
    mainName.innerText = `Data Type: ${layers[questionNumber].datatype}`;
}

function gradeQuestion()
{
    helperCard.style.display = "none";
    if(firstInput.value.toLowerCase() == layers[questionNumber].number && secondInput.value.toLowerCase() == layers[questionNumber].name.toLowerCase())
    {
        streak += 1;
        submitButton.innerText = "Correct!";
        handleStreak();
        newQuestion();
    } else {
        submitButton.innerText = "Wrong!";
        streak = 0;
        setHelperCard(questionNumber);
        handleStreak();
    }
}

function handleStreak()
{
    streakText.innerText = `Streak: ${streak}`;
}

function setHelperCard(qNum)
{
    helperCard.style.display = "block";
    document.getElementById("helper-third").innerText = `${layers[qNum].name} Layer`;
    document.getElementById("helper-second").innerText = `Number: ${layers[qNum].number}`;
    document.getElementById("helper-main").innerText = `Protocols: ${layers[qNum].protocol}`;
    document.getElementById("helper-fourth").innerText = `Data Type: ${layers[qNum].datatype}`;
    document.getElementById("helper-fifth").innerText = layers[qNum].description;
}

newQuestion();