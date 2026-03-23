let aLeg = "";
let bLeg = "";

window.onload = () => {
    setupDropZone("a-leg");
    setupDropZone("b-leg");
};

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

function parseALeg() {
    let xmlString = document.getElementById("a-leg").value;
    const match = xmlString.match(/<cdr[\s\S]*?<\/cdr>/);

    const xml = match ? match[0] : null;

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "application/xml");
    aLeg = xmlToJSON(xmlDoc.documentElement);

    console.log("All XML Data as JSON:", aLeg);
}

function parseBLeg() {
    let xmlString = document.getElementById("b-leg").value;
    const match = xmlString.match(/<cdr[\s\S]*?<\/cdr>/);

    const xml = match ? match[0] : null;

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "application/xml");
    bLeg = xmlToJSON(xmlDoc.documentElement);

    console.log("All XML Data as JSON:", bLeg);
}

function analyze() {
    parseALeg();
    parseBLeg();
    updateUI(aLeg, "a");
    updateUI(bLeg, "b");
}

function pullInfo(selector, displayId, displayText) {
    if (selector != null && selector != "" && selector != undefined) {
        document.getElementById(displayId).innerText = displayText + selector;
    } else {
        document.getElementById(displayId).innerText = displayText + "N/A";
    }
}

function updateUI(leg, legId) {
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
        // pullInfo(errorLog['error-period'].length, "a-total-errors", "Total Flaws: ");
        const periods = Array.isArray(errorLog['error-period'])
            ? errorLog['error-period']
            : [errorLog['error-period']];

        periods.toReversed().forEach(period => {
            const flawCount = parseInt(period.flaws);
            if (flawCount > 1) {
                let li = document.createElement("li");

                li.innerText = `${flawCount} flaws at ${calculateTimeBetween(leg.callflow.times["created_time"], period.start)} lasting ${calculateTimeBetween(period.start, period.stop)} seconds`;
                if (flawCount > 5 && flawCount < 15) {
                    li.classList.add("text-warning");
                } else if (flawCount >= 15) {
                    li.classList.add("text-danger");
                }
                listContainer.appendChild(li);
            }
        });
    } else {
        document.getElementById(legId + "-total-errors").innerText = "No Flaws Found!";
    }
}

function calculateTimeBetween(time1, time2)
{
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
        document.getElementById("a-skipped-percent").classList.add("text-warning");
    }

    //Quality Percentage
    let qualityPercent = inbound["quality_percentage"];

    pullInfo(qualityPercent, legId + "-quality-percent", "Quality Percentage: ");

    if (Number(qualityPercent) == 100) {
        document.getElementById(legId + "-quality-percent").classList.add("text-success");
    } else if (Number(qualityPercent) < 100 && Number(qualityPercent) >= 80) {
        document.getElementById(legId + "-quality-percent").classList.add("text-warning");
    } else {
        document.getElementById("a-quality-percent").classList.add("text-danger");
    }

    //Mos

    let mos = inbound["mos"];
    pullInfo(mos, legId + "-mos", "MOS: ");

    if (Number(mos) == 4.5) {
        document.getElementById(legId + "-mos").classList.add("text-success");
    } else if (Number(mos) < 4.5 && Number(mos) >= 4) {
        document.getElementById(legId + "-mos").classList.add("text-warning");
    } else {
        document.getElementById("a-mos").classList.add("text-danger");
    }
}