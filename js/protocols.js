const mainName = document.getElementById("main-name");
const firstQuestion = document.getElementById("first-question");
const secondQuestion = document.getElementById("second-question");
const firstInput = document.getElementById("first-input");
const secondInput = document.getElementById("second-input");
const submitButton = document.getElementById("submit-button");
const streakText = document.getElementById("streak-text");
const helperCard = document.getElementById("helper-card");

const ports = [
    { name: "File Transfer Protocol", port: "20/21", acronym: "FTP", transport:"TCP"},
    { name: "Secure Shell", port: "22", acronym: "SSH", transport:"TCP"},
    { name: "Secure File Transfer Protocol", port: "22", acronym: "SFTP", transport:"TCP"},
    { name: "Telnet", port: "23", acronym: "Telnet", transport:"TCP"},
    { name: "Simple Mail Transfer Protocol", port: "25", acronym: "SMTP", transport:"TCP"},
    { name: "Domain Name System", port: "53", acronym: "DNS", transport:"UDP"},
    { name: "Dynamic Host Configuration Protocol", port: "67/68", acronym: "DHCP", transport:"UDP"},
    { name: "Trivial File Transfer Protocol", port: "69", acronym: "TFTP", transport:"UDP"},
    { name: "Hypertext Transfer Protocol", port: "80", acronym: "HTTP", transport:"TCP"},
    { name: "Post Office Protocol 3", port: "110", acronym: "POP3", transport:"TCP"},
    { name: "Post Office Protocol 3 Secure", port: "995", acronym: "POP3S", transport:"TCP"},
    { name: "Network Time Protocol", port: "123", acronym: "NTP", transport:"UDP"},
    { name: "Internet Message Access Protocol", port: "143", acronym: "IMAP", transport:"TCP"},
    { name: "Internet Message Access Protocol Secure", port: "993", acronym: "IMAPS", transport:"TCP"},
    { name: "Simple Network Management Protocol", port: "161/162", acronym: "SNMP", transport:"UDP"},
    { name: "Lightweight Directory Access Protocol", port: "389", acronym: "LDAP", transport:"TCP"},
    { name: "Lightweight Directory Access Protocol Secure", port: "636", acronym: "LDAPS", transport:"TCP"},
    { name: "Hypertext Transfer Protocol Secure", port: "443", acronym: "HTTPS", transport:"TCP"},
    { name: "Syslog", port: "514", acronym: "Syslog", transport:"UDP"},
    { name: "Remote Desktop Protocol", port: "3389", acronym: "RDP", transport:"TCP"},
    { name: "Session Initiation Protocol", port: "5060/5061", acronym: "SIP", transport:"TCP"},
    { name: "Server Message Block", port: "445", acronym: "SMB", transport:"TCP"},
    { name: "Simple Mail Transfer Protocol Secure", port:"587", acronym: "SMTPS", transport:"TCP"},
    { name: "Structured Query Language", port: "1433", acronym: "SQL", transport:"TCP"},
    { name: "Microsoft Structured Query Language", port: "3306", acronym: "MySQL", transport:"TCP"}
]

let questionNumber = 0;
let streak = 0;

function newQuestion()
{
    questionNumber = Math.floor(Math.random() * ports.length);
    generateNameQuestion();
}

function generateNameQuestion()
{
    mainName.innerText = ports[questionNumber].acronym;
    firstQuestion.innerText = "Full Protocol Name:";
}

function gradeQuestion()
{
    helperCard.style.display = "none";
    if(firstInput.value.toLowerCase() == ports[questionNumber].name.toLowerCase() && secondInput.value.toLowerCase() == ports[questionNumber].transport.toLowerCase())
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
    document.getElementById("helper-main").innerText = `Acronym: ${ports[qNum].acronym}`;
    document.getElementById("helper-second").innerText = `Port: ${ports[qNum].port}`;
    document.getElementById("helper-third").innerText = ports[qNum].name;
    document.getElementById("helper-fourth").innerText = `Transport: ${ports[qNum].transport}`;
}

newQuestion();