var city = "irvine";
var utcCorrection = -28800 + 3600;
var timeZone = "";

fetch(`/api/weather/${city}`)
  .then(response => response.json())
  .then(data => {
    populateWeather(data)
  })
  .catch(err => console.error(err));


function populateWeather(dualObject) {
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


function updateCityAndMakeClock(){
  var confirm = document.querySelector('#confirm');
  var spin = document.querySelector('#spin');
  console.log(confirm)
  console.log(spin)
  confirm.classList.add('hidden');
  spin.classList.remove('hidden');
  city = "" + $("#input").val();
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
    });
}

function showTime() {
  var date = new Date();
  var h = date.getHours();
  var correctedH = h + 7 + (utcCorrection / 3600);
console.log(timeZone);
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
  var m = date.getMinutes();
  var s = date.getSeconds();
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
var input = document.getElementById("input");

const backgrounds = ['stars','haze', 'leaf','lights', 'meteor', 'sun']
let currentIndex = 0;

function applyBackground() {
  body.setAttribute('class', backgrounds[currentIndex]);
}
applyBackground();
function cycleBackgroundForward(){
  currentIndex++;
  if (currentIndex>5){
    currentIndex=0;
  }
  if(currentIndex<0){
    currentIndex=5;
  }
  applyBackground();
}

function cycleBackgroundBack(){
  currentIndex--;
  if (currentIndex > 5) {
    currentIndex = 0;
  }
  if (currentIndex < 0) {
    currentIndex = 5;
  }
  applyBackground();
}

var left = document.querySelector("#left");
var right = document.querySelector("#right");

left.addEventListener("click", cycleBackgroundBack);
right.addEventListener("click", cycleBackgroundForward);
