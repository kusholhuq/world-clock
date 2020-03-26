var path = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = "irvine";
var key = "eb1566ac55549b1221d3b4722f59c341";
var utcCorrection = -28800;
var lat = "";
var lon = "";



$.ajax({
  method: "GET",
  url: path + city + "&units=metric&appid=eb1566ac55549b1221d3b4722f59c341",
  dataType: "json",
  success: function (data) {
    console.log(data);
    populateWeather(data);

  },
  error: function (error) {
    console.error(error);
  }
})


function populateWeather(weatherObject) {
  var main = document.querySelector("#main");
  var mainDes = document.querySelector("#mainDescription");

  main.textContent = weatherObject.weather[0].main;
  mainDes.textContent = weatherObject.weather[0].description;

  var temp = document.querySelector("#temp");
  temp.textContent = weatherObject.main.temp + "°" + "C";

  var wind = document.querySelector("#wind");
  wind.textContent = weatherObject.wind.speed + "m/s" + " , " + weatherObject.wind.deg + "°";

  var humidity = document.querySelector("#humidity");
  humidity.textContent = weatherObject.main.humidity + "%";

  var citydisplay = document.querySelector("#city");
  var countrydisplay = document.querySelector("#country");

  citydisplay.textContent = weatherObject.name;
  countrydisplay.textContent = weatherObject.sys.country;
}

var submit = document.querySelector("#submit");
submit.addEventListener("click", updateCity);

function updateCity() {
  city = "" + $("#input").val();
  $.ajax({
    method: "GET",
    url: path + city + "&units=metric&appid=eb1566ac55549b1221d3b4722f59c341",
    dataType: "json",
    success: function (data) {
      console.log(data);
      populateWeather(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
      makeClock();


    },
    error: function (error) {
      console.error(error);
    }
  })
  $("#input").val("");
}


//google maps api

//google maps api for time
function makeClock() {
  $.ajax({
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lon+"&timestamp=1331161200&key=AIzaSyAc3qe0sMBZbWtNKCu1s4fQfAh4R6Up4wo",
    success: function (data) {
      console.log(data);
      utcCorrection = data.rawOffset
    },
    error: function (error) {
      console.error(error);
    }
  })

}
// setTimeout(makeClock, 1000);


function showTime() {
  var date = new Date();
  var h = date.getHours();
  var correctedH = h + 8 + (utcCorrection / 3600);
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
