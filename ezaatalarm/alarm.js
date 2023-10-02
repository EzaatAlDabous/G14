const title = document.getElementById("title");
const currentTime = document.getElementById("current_time");
const form = document.getElementById("form");
let myAudio = document.querySelector("#audio");
const clearAlarm = document.getElementById("clearAlarm");
const container = document.getElementById("container");
let alarms = [];

const updateTime = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  currentTime.innerHTML = `${hours}:${minutes}:${seconds}`;

  for (let i = 0; i < alarms.length; i++) {
    const {
      hours: alarmHours,
      minutes: alarmMinutes,
      seconds: alarmSeconds,
    } = alarms[i];
    if (
      alarmHours == hours &&
      alarmMinutes == minutes &&
      alarmSeconds == seconds
    ) {
      myAudio.play();
      console.log("Alarm triggered:", alarms[i]);
    }
  }
};

setInterval(updateTime, 1000);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const alarmhours = parseInt(document.getElementById("alarmhours").value, 10);
  const alarmmins = parseInt(document.getElementById("alarmmins").value, 10);
  const alarmsec = parseInt(document.getElementById("alarmsec").value, 10);
  const zone = document.getElementById("zone").value;

  const convertedHours = convertTo24Hour(alarmhours, zone);

  const alarm = {
    hours: convertedHours,
    minutes: alarmmins,
    seconds: alarmsec,
  };
  alarms.push(alarm);

  const alarmDiv = document.createElement("div");
  alarmDiv.className = "alarm";
  alarmDiv.innerHTML = `
 Alarm is scheduled for ${alarm.hours}:${alarm.minutes}:${alarm.seconds}
    <button class="delete-button">✖️</button>
  `;

  const deleteButton = alarmDiv.querySelector(".delete-button");
  deleteButton.addEventListener("click", function () {
    alarmDiv.remove();
    const index = alarms.indexOf(alarm);
    if (index !== -1) {
      alarms.splice(index, 1);
    }
  });

  container.appendChild(alarmDiv);

  document.getElementById("alarmhours").value = "";
  document.getElementById("alarmmins").value = "";
  document.getElementById("alarmsec").value = "";
});

function convertTo24Hour(hours, zone) {
  if (zone === "PM" && hours !== 12) {
    return hours + 12;
  } else if (zone === "AM" && hours === 12) {
    return 0;
  } else {
    return hours;
  }
}
