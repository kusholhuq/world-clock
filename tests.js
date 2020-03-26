// This document is purely for testing and not part of final product

// var body = document.body;
// var cool= document.querySelector("#image");

// $.ajax({
//   method: "GET",
//   url:"https://api.nasa.gov/planetary/apod?api_key=oddyRUdva2MgCp28wgg1MvumkENUTbzVEWSevPbL",
//   success: function(data){
//     console.log(data);
//     cool.setAttribute("src", data.url)
//   },
//   error: function(error){
//     console.error(error);
//   }
// })


// $.ajax({
//   method:"GET",
//   headers: { "key":"oddyRUdva2MgCp28wgg1MvumkENUTbzVEWSevPbL"},
//   url: "https://api.nasa.gov/planetary/earth/imagery",
//   data: { "lat": 33.6, "lon": -117.8 },
//   success: function(data){
//     console.log(data);
//   },
//   error: function(error){
//     console.error(error);
//   }
// })

// $.ajax({
//   method:"GET",
//   url: "https://api.nasa.gov/planetary/earth/imagery?api_key=oddyRUdva2MgCp28wgg1MvumkENUTbzVEWSevPbL",
// })

// weather test
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// var path = 'http://api.openweathermap.org/data/2.5/weather?q=';
// var city = "london";
// var key = "eb1566ac55549b1221d3b4722f59c341";
// $.ajax({
//   method: "GET",
//   url: path + city + "&appid=eb1566ac55549b1221d3b4722f59c341",
//   dataType: "json",
//   success: function (data) {
//     console.log(data);
//   },
//   error: function (error) {
//     console.error(error);
//   }
// })

//above is working ajax request for weather of a city
var path = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = "new york";
var key = "eb1566ac55549b1221d3b4722f59c341";
var utcCorrection = -28800;
var lat = "40.71";
var lon = "-74.01";


//weather ajax request
$.ajax({
  method: "GET",
  url: path + city + "&units=metric&appid=eb1566ac55549b1221d3b4722f59c341",
  dataType: "json",
  success: function (data) {
    console.log(data);
    //destroyChildren();
    //populateWeather(data);
    lat = data.coord.lat;
    lon = data.coord.lon;
    makeClock();

  },
  error: function (error) {
    console.error(error);
  }
})

//google maps api for time
function makeClock(){
$.ajax({
  method: "GET",
  url: "https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lon+"&timestamp=1331161200&key=AIzaSyAc3qe0sMBZbWtNKCu1s4fQfAh4R6Up4wo",
  success:function(data){
    console.log(data);
    utcCorrection = data.rawOffset
  },
  error: function(error){
    console.error(error);
  }
})

}
// setTimeout(makeClock, 1000);


function showTime(){
  var date = new Date();
  var h = date.getHours();
  var correctedH = h+8+(utcCorrection/3600);
  if(correctedH>24){
    correctedH = correctedH - 24;
  }
  if(correctedH<0){
    correctedH= correctedH +24;
  }
  var m = date.getMinutes();
  var s = date.getSeconds();
  var time = h+":"+m+":"+s;
  var foreignTime = correctedH + ":" + m + ":" + s;



  var target = document.getElementById("currentTime");
  target.textContent = time;
  var otherTarget =document.getElementById("UTCtime");
  otherTarget.textContent = foreignTime;
}

setTimeout(showTime, 250);
setInterval(showTime, 1000);
