var city = "irvine";
var utcCorrection = -28800 + 3600;
var lat = "";
var lon = "";
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
  city = "" + $("#input").val();
  fetch(`/api/weather/${city}`)
    .then(response => response.json())
    .then(data => {
      populateWeather(data)
      lat = data.weatherData.coord.lat;
      lon = data.weatherData.coord.lon;
      utcCorrection = data.timeData.rawOffset;
      timeZone = data.timeData.timeZoneName;
      console.log(data);
    })
    .catch(err => console.error(err));
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
// var dark = document.querySelector("#dark");
// var water = document.querySelector("#water");
// var lights = document.querySelector("#lights");
// var rain = document.querySelector("#rain");
var input = document.getElementById("input");

// dark.addEventListener("click", handleDark);
// water.addEventListener("click", handleWater);
// lights.addEventListener("click", handleLights);
// rain.addEventListener("click", handleRain);

function handleDark(event) {
  body.setAttribute("class", "dark");
  input.classList.add("white");
  input.classList.remove("black");
  for (var i = 0; i < box.length; i++) {
    box[i].classList.remove("pink");
    box[i].classList.add("grey");
  }
}
function handleWater(event) {
  body.setAttribute("class", "bright");
  input.classList.add("black");
  input.classList.remove("white");
  for (var i = 0; i < box.length; i++) {
    box[i].classList.add("pink");
    box[i].classList.remove("grey");
  }
}
function handleLights(event) {
  body.setAttribute("class", "lights");
  input.classList.add("white");
  input.classList.remove("black");
  for (var i = 0; i < box.length; i++) {
    box[i].classList.add("pink");
    box[i].classList.remove("grey");
  }
}
function handleRain(event) {
  body.setAttribute("class", "rain");
  input.classList.add("black");
  input.classList.remove("white");
  for (var i = 0; i < box.length; i++) {
    box[i].classList.add("grey");
    box[i].classList.remove("pink");
  }
}

const backgrounds = ['cityRain', 'haze', 'leaf','lights', 'meteor','stars', 'sun','watering']
let currentIndex = 0;

function checkFont(){
  //if current index equals this this or this
  //make font colors white or black in response
  //and make squares diff color in response
  //can do a switch statement
}

function applyBackground() {
  body.setAttribute('class', backgrounds[currentIndex]);
}
applyBackground();
function cycleBackgroundForward(event){
  currentIndex++;
  if (currentIndex>7){
    currentIndex=0;
  }
  if(currentIndex<0){
    currentIndex=7;
  }
  console.log(currentIndex)
  applyBackground();
}

function cycleBackgroundBack(event){
  currentIndex--;
  if (currentIndex > 7) {
    currentIndex = 0;
  }
  if (currentIndex < 0) {
    currentIndex = 7;
  }
  console.log(currentIndex)
  applyBackground();
}

var left = document.querySelector("#left");
var right = document.querySelector("#right");

left.addEventListener("click", cycleBackgroundBack);
right.addEventListener("click", cycleBackgroundForward);
