const title = document.getElementById('title');
    const currentTime = document.getElementById('current_time');
    const SubmitBtn = document.getElementById('SubmitBtn');
    const form = document.getElementById('form');
    let myAudio = document.querySelector('#audio');
    const container= document.getElementById('container');
    const zone = document.getElementById('zone')
    const clearAlarm = document.getElementById('clearAlarm')
    let hours, minutes, seconds;
    
    const updateTime = () => {
      const currentDate = new Date();
      hours = currentDate.getHours();
      minutes = currentDate.getMinutes(); //num
      seconds = currentDate.getSeconds(); 
      currentTime.innerHTML = `${hours}:${minutes}:${seconds}`;
      if (alarmhours == String(hours) && alarmmins == String(minutes) && alarmsec === String(seconds)){
        myAudio.play();
        console.log('works');
      }  
    }
    
    setInterval(updateTime, 1000);
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); 
    });
    
    let alarmhours, alarmmins, alarmsec;
    SubmitBtn.addEventListener("click", function (event) {
        event.preventDefault(); 
         alarmhours = document.getElementById("alarmhours").value;
         alarmmins = document.getElementById("alarmmins").value; //string
         alarmsec = document.getElementById("alarmsec").value;
        if(zone.value==='PM'){
            alarmhours= parseInt(alarmhours, 10) + 12
        }

         let mydiv= document.createElement('div');
         let text = `Alarm set at ${alarmhours}:${alarmmins}:${alarmsec}`;

         mydiv.innerText=text
         mydiv.id='mydiv'

         let container = document.getElementById("container");
         container.appendChild(mydiv);
         SubmitBtn.style.display = "none";
         clearAlarm.style.display="block"

    });

    clearAlarm.addEventListener("click", function(event){
        event.preventDefault(); 
form.reset()
clearAlarm.style.display="none"
SubmitBtn.style.display = "block";
mydiv.style.display="none";
    })