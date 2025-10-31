const sixAmTimer = document.getElementById("sixtimer");
const sixAmPercent = document.getElementById("sixpercent");

const sevenAmTimer = document.getElementById("seventimer");
const sevenAmPercent = document.getElementById("sevenpercent");

const eightAmTimer = document.getElementById("eighttimer");
const eightAmPercent = document.getElementById("eightpercent");

const nineAmTimer = document.getElementById("ninetimer");
const nineAmPercent = document.getElementById("ninepercent");

function weekProgress(startDay = 1, startHour = 6, endDay = 5, endHour = 18) {
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const day = start.getDay();
  const daysSinceStart = (day - startDay + 7) % 7;
  start.setDate(start.getDate() - daysSinceStart);
  start.setHours(startHour, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + ((endDay - startDay + 7) % 7));
  end.setHours(endHour, 0, 0, 0);

  if (end <= start) end.setDate(end.getDate() + 7);

  const totalMs = end - start;
  const elapsedMs = now - start;
  const percentage = (elapsedMs / totalMs) * 100;

  return Math.min(Math.max(percentage, 0), 100);
}


function updateTimers()
{
    sixAmTimer.style.width = weekProgress(1, 6, 5, 18) + "%";
    sixAmPercent.innerText = "6AM SHIFT: " + weekProgress(1, 6, 5, 18).toFixed(2).toString() + "%";

    sevenAmTimer.style.width = weekProgress(1, 7, 5, 19) + "%";
    sevenAmPercent.innerText = "7AM SHIFT: " + weekProgress(1, 7, 5, 19).toFixed(10).toString() + "%";

    eightAmTimer.style.width = weekProgress(1, 8, 5, 20) + "%";
    eightAmPercent.innerText = "8AM SHIFT: " + weekProgress(1, 8, 5, 20).toFixed(3).toString() + "%";

    nineAmTimer.style.width = weekProgress(1, 9, 5, 21) + "%";
    nineAmPercent.innerText = "9AM SHIFT: " + weekProgress(1, 9, 5, 21).toFixed(3).toString() + "%";
}

updateTimers();

const update = setInterval(function()
{
    updateTimers();
}, 100);
