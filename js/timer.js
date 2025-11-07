const sixAmTimer = document.getElementById("sixtimer");
const sixAmPercent = document.getElementById("sixpercent");

const sevenAmTimer = document.getElementById("seventimer");
const sevenAmPercent = document.getElementById("sevenpercent");

const eightAmTimer = document.getElementById("eighttimer");
const eightAmPercent = document.getElementById("eightpercent");

const nineAmTimer = document.getElementById("ninetimer");
const nineAmPercent = document.getElementById("ninepercent");

function getShiftWorkWeekProgress({startDay = 1, endDay = 5, shiftStart = 6} = {}) {
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() + now.getMilliseconds() / 1000;
  const currentHour = currentTime / 3600;


  const firstBlockStart = shiftStart;
  const firstBlockEnd = shiftStart + 4;
  const breakStart = firstBlockEnd;
  const breakEnd = breakStart + 1;
  const secondBlockStart = breakEnd;
  const secondBlockEnd = secondBlockStart + 4;

  const workHoursPerDay = 8;
  const totalWorkHoursWeek = workHoursPerDay * (endDay - startDay + 1);

  let completedHours = 0;

  if (currentDay > startDay) {
    const daysDone = Math.min(currentDay - startDay, endDay - startDay);
    completedHours += daysDone * workHoursPerDay;
  }
  if (currentDay >= startDay && currentDay <= endDay) {
    if (currentHour >= secondBlockEnd) {
      completedHours += workHoursPerDay;
    } else if (currentHour <= firstBlockStart) {
    } else if (currentHour < breakStart) {
      completedHours += currentHour - firstBlockStart;
    } else if (currentHour < breakEnd) {
      completedHours += (firstBlockEnd - firstBlockStart);
    } else if (currentHour < secondBlockEnd) {
      completedHours +=
        (firstBlockEnd - firstBlockStart) + (currentHour - secondBlockStart);
    }
  }
  const percentage = (completedHours / totalWorkHoursWeek) * 100;
  return percentage;
}

function updateTimers() {
  const sixPercent = getShiftWorkWeekProgress({ shiftStart: 6 }).toFixed(2);
  sixAmTimer.style.width = sixPercent + "%";
  if(sixPercent >= 100) {
    sixAmTimer.style.background = 'linear-gradient(270deg, #BA1C21, #d7a629ff, #1cba5eff, #1c88baff, #1c41baff)';
  }
  sixAmPercent.innerText = `6AM SHIFT: ${sixPercent}%`;

  const sevenPercent = getShiftWorkWeekProgress({ shiftStart: 7 }).toFixed(6);
  sevenAmTimer.style.width = sevenPercent + "%";
  if(sevenPercent >= 100) {
    sevenAmTimer.style.background = 'linear-gradient(270deg, #BA1C21, #d7a629ff, #1cba5eff, #1c88baff, #1c41baff)';
  }
  sevenAmPercent.innerText = `7AM SHIFT: ${sevenPercent}%`;

  const eightPercent = getShiftWorkWeekProgress({ shiftStart: 8 }).toFixed(3);
  eightAmTimer.style.width = eightPercent + "%";
  if(eightPercent >= 100) {
    eightAmTimer.style.background = 'linear-gradient(270deg, #BA1C21, #d7a629ff, #1cba5eff, #1c88baff, #1c41baff)';
  }
  eightAmPercent.innerText = `8AM SHIFT: ${eightPercent}%`;

  const ninePercent = getShiftWorkWeekProgress({ shiftStart: 9 }).toFixed(3);
  nineAmTimer.style.width = ninePercent + "%";
  if(ninePercent >= 100) {
    nineAmTimer.style.background = 'linear-gradient(270deg, #BA1C21, #d7a629ff, #1cba5eff, #1c88baff, #1c41baff)';
  }
  nineAmPercent.innerText = `9AM SHIFT: ${ninePercent}%`;
}

updateTimers();
setInterval(updateTimers, 100);
