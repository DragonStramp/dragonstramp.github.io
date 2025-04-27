const timer = document.getElementById("time");

function findTime()
{
    var d = new Date(),
    h = (d.getHours()<10?'0':'') + d.getHours(),
    m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    timer.textContent = h + ':' + m;
}

findTime();