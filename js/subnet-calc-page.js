const subnetText = document.getElementById("subnet-address");
const broadcastText = document.getElementById("broadcast-address");
const maskText = document.getElementById("subnet-mask");

const addressInput = document.getElementById("address");
const cidrInput = document.getElementById("cidr");

function getSubnetInfo()
{
    let subnetInfo = calculateSubnet(addressInput.value, cidrInput.value);
    subnetText.innerText = "Subnet Address: " + subnetInfo.subnetAddress;
    broadcastText.innerText = "Broadcast Address: " + subnetInfo.broadcastAddress;
    maskText.innerText = "Subnet Mask: " + subnetInfo.subnetMask;
}

addressInput.addEventListener('input', function (evt) {
    getSubnetInfo();
});

cidrInput.addEventListener('input', function (evt) {
    getSubnetInfo();
});

function calculateSubnet(address, cidr) {
    const octets = address.split(".").map(Number);
    const mask = calculateSubnetMask(cidr);
    const maskOctets = mask.split(".").map(Number);

    const subnetOctets = octets.map((octet, i) => octet & maskOctets[i]);
    const broadcastOctets = subnetOctets.map((octet, i) => octet | (~maskOctets[i] & 0xFF));

    return {
        subnetAddress: subnetOctets.join("."),
        broadcastAddress: broadcastOctets.join("."),
        subnetMask: mask
    };
}

function calculateMaskOctet(cidr) {
    const bits = cidr % 8;
    return bits === 0 ? 0 : (0xFF << (8 - bits)) & 0xFF;
}

function calculateSubnetMask(cidr) {
    if (cidr <= 8) {
        return calculateMaskOctet(cidr) + ".0.0.0";
    } else if (cidr > 8 && cidr <= 16) {
        return "255." + calculateMaskOctet(cidr) + ".0.0";
    } else if (cidr > 16 && cidr <= 24) {
        return "255.255." + calculateMaskOctet(cidr) + ".0";
    } else {
        return "255.255.255." + calculateMaskOctet(cidr);
    }
}