var city = "irvine";
var utcCorrection = -28800 + 3600;
var timeZone = "";
var lat = "";
var lon = "";

fetch(`/api/weather/${city}`)
  .then(response => response.json())
  .then(data => {
    populateWeather(data)
  })
  .catch(err => console.error(err));


function populateWeather(dualObject) {
  console.log(dualObject);
  var main = document.querySelector("#main");
  var mainDes = document.querySelector("#mainDescription");

  main.textContent = dualObject.weatherData.weather[0].main;
  mainDes.textContent = dualObject.weatherData.weather[0].description;

  var temp = document.querySelector("#temp");
  temp.textContent = dualObject.weatherData.main.temp + "°" + "C";

  var wind = document.querySelector("#wind");
  wind.textContent = dualObject.weatherData.wind.speed + "m/s" + " , " + dualObject.weatherData.wind.deg + "°";

  var humidity = document.querySelector("#humidity");
  humidity.textContent = dualObject.weatherData.main.humidity + "%";

  var citydisplay = document.querySelector("#city");
  var countrydisplay = document.querySelector("#country");

  citydisplay.textContent = dualObject.weatherData.name;
  countrydisplay.textContent = dualObject.weatherData.sys.country;
}

var submit = document.querySelector("#submit");
submit.addEventListener("click", updateCityAndMakeClock);

var modal = document.querySelector("#modal");
var okay = document.querySelector("#okay");
var modalBack = document.querySelector("#modal-back");
var input = document.getElementById("input");

okay.addEventListener("click",function(){
  modal.classList.add('hidden');
  modalBack.classList.remove("d-flex");
  modalBack.classList.add("hidden");
  input.value = "";
})


function updateCityAndMakeClock(){
  var confirm = document.querySelector('#confirm');
  var spin = document.querySelector('#spin');
  confirm.classList.add('hidden');
  spin.classList.remove('hidden');
  city = "" + document.querySelector("#input").value;
  fetch(`/api/weather/${city}`)
    .then(response => response.json())
    .then(data => {
      populateWeather(data)
      lat = data.weatherData.coord.lat;
      lon = data.weatherData.coord.lon;
      utcCorrection = data.timeData.rawOffset;
      timeZone = data.timeData.timeZoneName;
      spin.classList.add('hidden');
      confirm.classList.remove('hidden');
    })
    .catch(err => {
      console.error(err);
      spin.classList.add('hidden');
      confirm.classList.remove('hidden');
      modalBack.classList.remove("hidden");
      modalBack.classList.add("d-flex");
      modal.classList.remove('hidden');
    });
}

function showTime() {
  var date = new Date();
  var h = date.getHours();
  var correctedH = h + 7 + (utcCorrection / 3600);
  switch (timeZone) {
    case "Eastern Standard Time":
    case "Pacific Standard Time":
    case "Alaska Standard Time":
    case "Greenwich Mean Time":
    case "Central Standard Time":
      correctedH = correctedH + 1;
  }

  if (correctedH >= 24) {
    correctedH = correctedH - 24;
  }
  if (correctedH < 0) {
    correctedH = correctedH + 24;
  }
  if(correctedH <10) {
    correctedH = 0 + "" + correctedH;
  }

  var m = date.getMinutes();
  var s = date.getSeconds();
  if (m < 10) {
    m = 0 + "" + m;
  }
  if (s < 10) {
    s = 0 + "" + s;
  }
  if(h <10){
    h = 0 + "" + h;
  }
  var time = h + ":" + m + ":" + s;
  var foreignTime = correctedH + ":" + m + ":" + s;

  var target = document.getElementById("currentTime");
  target.textContent = time;
  var otherTarget = document.getElementById("UTCtime");
  otherTarget.textContent = foreignTime;
}

setTimeout(showTime, 250);
setInterval(showTime, 1000);

var body = document.body;
var box = document.querySelectorAll(".box");


const backgrounds = ['stars','haze', 'leaf','lights', 'meteor', 'sun']
let currentIndex = 0;

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    submit.click();
  }
});

if (input.value.length != 0){
  submit.disabled = false;
}
else{
  submit.disabled = true;
}

setInterval(function () {
  if (input.value.length != 0){
    submit.disabled = false;
  }
  else{
    submit.disabled = true;
  }
}, 500);
