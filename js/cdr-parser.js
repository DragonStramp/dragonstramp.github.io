let leg = "";

window.onload = () => {
    const dropZone = document.getElementById("a-leg");
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
};

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

function parse() {
    let xmlString = document.getElementById("a-leg").value;
    const match = xmlString.match(/<cdr[\s\S]*?<\/cdr>/);

    const xml = match ? match[0] : null;

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "application/xml");
    leg = xmlToJSON(xmlDoc.documentElement);

    console.log("All XML Data as JSON:", leg);
    updateUI();
}

function pullInfo(selector, displayId, displayText) {
    if (selector != null && selector != "" && selector != undefined) {
        document.getElementById(displayId).innerText = displayText + selector;
    } else {
        document.getElementById(displayId).innerText = displayText + "N/A";
    }
}

function updateUI() {
    const mainFlow = Array.isArray(leg.callflow) ? leg.callflow[0] : leg.callflow;
    let start = new Date(parseInt(mainFlow.times.created_time) / 1000).toLocaleString();
    let end = new Date(parseInt(mainFlow.times.hangup_time) / 1000).toLocaleString();

    pullInfo(start, "a-call-started", "Call Started: ");
    pullInfo(end, "a-call-ended", "Call Ended: ");

    pullInfo(leg.variables["hangup_cause"], "a-hangup-cause", "Hangup Cause: ");
    pullInfo(leg.variables["sip_hangup_disposition"], "a-sip-hangup-disposition", "SIP Hangup Disposition: ");
    pullInfo(leg.variables["digits_dialed"], "a-digits-dialed", "Digits Dialed: ");

    displayCallStats();
    displayMajorErrors();
}

function displayMajorErrors() {
    
    const errorLog = leg['call-stats'].audio['error-log'];
    const listContainer = document.getElementById("a-error-list");
    let startTime = leg.callflow.times["created_time"] / 1000;
    
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
                let errorTime = Math.floor(Math.abs(startTime - (period.start / 1000)) / 1000);
                let errorMinute = Math.floor(errorTime / 60);
                let errorSecond = errorTime % 60;
                let errorTimeFormatted = `${errorMinute}:${errorSecond.toString().padStart(2, '0')}`;

                li.innerText = `${flawCount} flaws at ${errorTimeFormatted}`;
                if(flawCount > 5 && flawCount < 15)
                {
                    li.classList.add("text-warning");
                } else if (flawCount >= 15) {
                    li.classList.add("text-danger");
                }
                listContainer.appendChild(li);
            }
        });
    } else {
        document.getElementById("total-errors").innerText = "No Flaws Found!";
    }
}

function displayCallStats()
{
    let inbound = leg['call-stats'].audio.inbound;

    //Skipped packets
    let mediaPackets = inbound["media_packet_count"];
    let skippedPackets = inbound["skip_packet_count"];
    let skippedPercent = ((Number(skippedPackets) / (Number(mediaPackets) + Number(skippedPackets))) * 100).toFixed(2);
    pullInfo(mediaPackets, "a-media-packet-count", "Media Packet Count: ");
    pullInfo(skippedPackets, "a-skipped-packets", "Skipped Packet Count: ");
    pullInfo(skippedPercent + "%", "a-skipped-percent", "Percentage Skipped: ");

    if(skippedPercent >= 15) {
        document.getElementById("a-skipped-percent").classList.add("text-danger");
    } else if (skippedPercent > 5 && skippedPercent < 15) {
        document.getElementById("a-skipped-percent").classList.add("text-warning");
    }
    
    //Quality Percentage
    let qualityPercent = inbound["quality_percentage"];
    
    pullInfo(qualityPercent, "a-quality-percent", "Quality Percentage: ");

    if(Number(qualityPercent) == 100) {
        document.getElementById("a-quality-percent").classList.add("text-success");
    } else if (Number(qualityPercent) < 100 && Number(qualityPercent) >= 80) {
        document.getElementById("a-quality-percent").classList.add("text-warning");
    } else {
        document.getElementById("a-quality-percent").classList.add("text-danger");
    }

    //Mos

    let mos = inbound["mos"];
    pullInfo(mos, "a-mos", "MOS: ");

    if(Number(mos) == 4.5) {
        document.getElementById("a-mos").classList.add("text-success");
    } else if (Number(mos) < 4.5 && Number(mos) >= 4) {
        document.getElementById("a-mos").classList.add("text-warning");
    } else {
        document.getElementById("a-mos").classList.add("text-danger");
    }
}