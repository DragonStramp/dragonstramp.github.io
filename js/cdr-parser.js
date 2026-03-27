let legCount = 2;

const cardHolder = document.getElementById("card-holder");
const textBoxHolder = document.getElementById("text-holder");

window.onload = () => {
    resetTextBoxes();
};

function resetTextBoxes() {
    textBoxHolder.innerHTML = '';
    for (let i = 0; i < legCount; i++) {
        createDropZone(i);
    }
}

function createDropZone(dropId) {
    const html = `
    <div class="col-12 col-md-5">
        <textarea class="form-control border${getTheme(dropId)}" placeholder="leg ${dropId} (drag and drop)" id="${dropId}-leg" rows="3"></textarea>
    </div>`;
    textBoxHolder.insertAdjacentHTML('beforeend', html);
    setupDropZone(dropId.toString() + "-leg");
}


function updateTextCount(countAdjustment) {
    legCount += countAdjustment;
    if (legCount < 1) {
        legCount = 1;
    }
    resetTextBoxes();
}

function getTheme(legId)
{
    let theme = "-primary";
    if(legId == 1)
    {
        theme = "-info";
    } else if (legId == 2)
    {
        theme = "-success"
    } else if (legId == 3)
    {
        theme = "-light"
    }

    return theme;
}

function createCard(cardId) {
    const html = `
                <div class="col-12 col-md-4 card border-3 border border${getTheme(cardId)} shadow mx-auto mt-3">
                <h4>Call Time</h4>
                <button class="mx-auto col-6 mx-2 btn btn-secondary" onclick="copyLegInfo(${cardId})">Copy Leg</button>
                <p id="${cardId}-call-started"></p>
                <p id="${cardId}-call-ended"></p>
                <p id="${cardId}-call-duration"></p>
                <hr>
                <h4>Call Stats</h4>
                <p id="${cardId}-media-packet-count"></p>
                <p id="${cardId}-skipped-packets"></p>
                <p id="${cardId}-skipped-percent"></p>
                <p id="${cardId}-mos"></p>
                <p id="${cardId}-quality-percent"></p>
                <p id="${cardId}-digits-dialed"></p>
                <p id="${cardId}-codec"></p>
                <hr>
                <h4>Hangup</h4>
                <a class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"href="https://developer.signalwire.com/freeswitch/FreeSWITCH-Explained/Troubleshooting-Debugging/Hangup-Cause-Code-Table_3964945/">Freeswitch Hangup Documentation</a>
                <p id="${cardId}-hangup-cause"></p>
                <p id="${cardId}-sip-hangup-disposition"></p>
                <hr>
                <h5 id="${cardId}-error-title">Major Audio Flaws:</h5>
                <ul class="mx-auto" id="${cardId}-error-list"></ul>
            </div>`;
    cardHolder.insertAdjacentHTML('beforeend', html);
}

function setupDropZone(cardId) {
    const dropZone = document.getElementById(cardId);
    if (!dropZone) return;

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("bg-secondary");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("bg-secondary");
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("bg-secondary");

        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                dropZone.value = event.target.result;
            };
            reader.readAsText(file);
        }
    });
}

function getLegInfo(legId)
{
    let legName = "";
    if(legId == 0)
    {
        legName = "A-Leg";
    } else {
        legName = `B-Leg (${legId})`;
    }

    let copyText = (`${legName} Stats: \n` +
        document.getElementById(`${legId}-skipped-percent`).innerText + "\n" +
        document.getElementById(`${legId}-quality-percent`).innerText + "\n" +
        document.getElementById(`${legId}-mos`).innerText + "\n" + 
        document.getElementById(`${legId}-hangup-cause`).innerText + "\n" + 
        document.getElementById(`${legId}-sip-hangup-disposition`).innerText 
    )

    return copyText;
}

function copyLegInfo(legId)
{
    navigator.clipboard.writeText(getLegInfo(legId));
}

function copyCallInfo()
{
    let copyText = ""
    for (let i = 0; i < legCount; i++)
    {
        copyText += getLegInfo(i) + "\n\n";
    }

    navigator.clipboard.writeText(copyText);
}

function xmlToJSON(node) {
    if (node.children.length === 0) {
        return node.textContent.trim();
    }
    let obj = {};

    for (let child of node.children) {
        let childData = xmlToJSON(child);
        if (obj[child.nodeName]) {
            if (!Array.isArray(obj[child.nodeName])) {
                obj[child.nodeName] = [obj[child.nodeName]];
            }
            obj[child.nodeName].push(childData);
        } else {
            obj[child.nodeName] = childData;
        }
    }
    return obj;
}

function parseLeg(legId) {
    let xmlString = document.getElementById(`${legId}-leg`).value;
    const match = xmlString.match(/<cdr[\s\S]*?<\/cdr>/);

    const xml = match ? match[0] : null;

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "application/xml");
    let leg = xmlToJSON(xmlDoc.documentElement);

    console.log(`Leg ${legId} JSON:`, leg);

    return leg;
}

function analyze() {
    cardHolder.innerHTML = '';
    for (let i = 0; i < legCount; i++) {
        const leg = parseLeg(i);
        updateUI(leg, i);
    }
}

function pullInfo(selector, displayId, displayText) {
    if (selector != null && selector != "" && selector != undefined) {
        document.getElementById(displayId).innerText = displayText + selector;
    } else {
        document.getElementById(displayId).innerText = displayText + "N/A";
    }
}

function updateUI(leg, legId) {
    createCard(legId);
    const mainFlow = Array.isArray(leg.callflow) ? leg.callflow[0] : leg.callflow;
    let start = new Date(parseInt(mainFlow.times.created_time) / 1000).toLocaleString();
    let end = new Date(parseInt(mainFlow.times.hangup_time) / 1000).toLocaleString();

    pullInfo(start, legId + "-call-started", "Call Started: ");
    pullInfo(end, legId + "-call-ended", "Call Ended: ");
    pullInfo(calculateTimeBetween(mainFlow.times.created_time, mainFlow.times.hangup_time), legId + "-call-duration", "Call Duration: ");
    pullInfo(leg.variables["hangup_cause"], legId + "-hangup-cause", "Hangup Cause: ");
    pullInfo(leg.variables["sip_hangup_disposition"], legId + "-sip-hangup-disposition", "SIP Hangup Disposition: ");
    pullInfo(leg.variables["digits_dialed"], legId + "-digits-dialed", "Digits Dialed: ");
    pullInfo(leg.variables["rtp_use_codec_name"], legId + "-codec", "Codec: ");

    displayCallStats(leg, legId);
    displayMajorErrors(leg, legId);
}

function displayMajorErrors(leg, legId) {

    const errorLog = leg['call-stats'].audio['error-log'];
    const listContainer = document.getElementById(legId + "-error-list");

    listContainer.innerHTML = '';

    if (errorLog && errorLog['error-period']) {
        pullInfo(errorLog['error-period'].length, `${legId}-error-title`, "Distinct Error Periods: ");
        const periods = Array.isArray(errorLog['error-period'])
            ? errorLog['error-period']
            : [errorLog['error-period']];

        const mainFlow = Array.isArray(leg.callflow) ? leg.callflow[0] : leg.callflow;
        periods.toReversed().forEach(period => {
            const flawCount = parseInt(period.flaws);
            if (flawCount > 1) {
                let li = document.createElement("li");

                li.innerText = `${flawCount} flaws at ${calculateTimeBetween(mainFlow.times["created_time"], period.start)} lasting ${calculateTimeBetween(period.start, period.stop)} seconds`;
                if (flawCount > 5 && flawCount < 15) {
                    li.classList.add("text-warning");
                } else if (flawCount >= 15) {
                    li.classList.add("text-danger");
                }
                listContainer.appendChild(li);
            }
        });
    } else {
        document.getElementById(legId + "-error-title").innerText = "No Flaws Found!";
    }
}

function calculateTimeBetween(time1, time2) {
    let time = Math.floor(Math.abs((time1 / 1000) - (time2 / 1000)) / 1000);
    let timeMinutes = Math.floor(time / 60);
    let timeSeconds = time % 60;
    let timeFormatted = `${timeMinutes}:${timeSeconds.toString().padStart(2, '0')}`;

    return timeFormatted;
}

function displayCallStats(leg, legId) {
    let inbound = leg['call-stats'].audio.inbound;

    //Skipped packets
    let mediaPackets = inbound["media_packet_count"];
    let skippedPackets = inbound["skip_packet_count"];
    let skippedPercent = ((Number(skippedPackets) / (Number(mediaPackets) + Number(skippedPackets))) * 100).toFixed(2);
    pullInfo(mediaPackets, legId + "-media-packet-count", "Media Packet Count: ");
    pullInfo(skippedPackets, legId + "-skipped-packets", "Skipped Packet Count: ");
    pullInfo(skippedPercent + "%", legId + "-skipped-percent", "Percentage Skipped: ");

    if (skippedPercent >= 15) {
        document.getElementById(legId + "-skipped-percent").classList.add("text-danger");
    } else if (skippedPercent > 5 && skippedPercent < 15) {
        document.getElementById(legId + "-skipped-percent").classList.add("text-warning");
    }

    //Quality Percentage
    let qualityPercent = inbound["quality_percentage"];

    pullInfo(qualityPercent, legId + "-quality-percent", "Quality Percentage: ");

    if (Number(qualityPercent) == 100) {
        document.getElementById(legId + "-quality-percent").classList.add("text-success");
    } else if (Number(qualityPercent) < 95 && Number(qualityPercent) >= 80) {
        document.getElementById(legId + "-quality-percent").classList.add("text-warning");
    } else {
        document.getElementById(legId + "-quality-percent").classList.add("text-danger");
    }

    //Mos

    let mos = inbound["mos"];
    pullInfo(mos, legId + "-mos", "MOS: ");

    if (Number(mos) >= 4.5) {
        document.getElementById(legId + "-mos").classList.add("text-success");
    } else if (Number(mos) < 4.3 && Number(mos) >= 4) {
        document.getElementById(legId + "-mos").classList.add("text-warning");
    } else {
        document.getElementById(legId + "-mos").classList.add("text-danger");
    }
}