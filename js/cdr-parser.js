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

    displayMajorErrors();   

    const mainFlow = Array.isArray(leg.callflow) ? leg.callflow[0] : leg.callflow;

    if (mainFlow && mainFlow.times) {
        let start = new Date(parseInt(mainFlow.times.created_time) / 1000).toLocaleString();
        let end = new Date(parseInt(mainFlow.times.hangup_time) / 1000).toLocaleString();
        pullInfo(start, "a-call-started", "Call Started: ");
        pullInfo(end, "a-call-ended", "Call Ended: ");
    } else {
        pullInfo(null, "a-call-started", "Call Started: ");
        pullInfo(null, "a-call-ended", "Call Ended: ");
    }

    if (leg['call-stats'] && leg['call-stats'].audio && leg['call-stats'].audio.inbound) {
        let inbound = leg['call-stats'].audio.inbound;
        pullInfo(inbound["media_packet_count"], "a-media-packet-count", "Media Packet Count: ");
        pullInfo(inbound["skip_packet_count"], "a-skipped-packets", "Skipped Packet Count: ");
        pullInfo(inbound["mos"], "a-mos", "MOS: ");
    }

    if (leg.variables) {
        pullInfo(leg.variables["hangup_cause"], "a-hangup-cause", "Hangup Cause: ");
        pullInfo(leg.variables["sip_hangup_disposition"], "a-sip-hangup-disposition", "SIP Hangup Disposition: ");
        pullInfo(leg.variables["digits_dialed"], "a-digits-dialed", "Digits Dialed: ");
    }
}

function displayMajorErrors() {
    const errorLog = leg['call-stats'].audio['error-log'];
    const listContainer = document.getElementById("error-list");
    
    listContainer.innerHTML = '';

    if (errorLog && errorLog['error-period']) {
        const periods = Array.isArray(errorLog['error-period']) 
                        ? errorLog['error-period'] 
                        : [errorLog['error-period']];

        periods.forEach(period => {
            const flawCount = parseInt(period.flaws);
            if (flawCount > 1) {
                let li = document.createElement("li");
                li.innerText = `Major Error: ${flawCount} flaws detected at start time ${period.start}`;
                listContainer.appendChild(li);
            }
        });
    }
}