var path = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = "new york";
var key ="eb1566ac55549b1221d3b4722f59c341";




$.ajax({
  method:"GET",
  url: path + city + "&units=metric&appid=eb1566ac55549b1221d3b4722f59c341",
  dataType:"json",
  success: function(data){
    console.log(data);
    //destroyChildren();
    populateWeather(data);


  },
  error:function(error){
    console.error(error);
  }
})


function populateWeather(weatherObject){
  var main = document.querySelector("#main");
  var mainDes = document.querySelector("#mainDescription");

  main.textContent = weatherObject.weather[0].main;
  mainDes.textContent = weatherObject.weather[0].description;

  var temp = document.querySelector("#temp");
  temp.textContent = weatherObject.main.temp+"°"+"C";

  var wind = document.querySelector("#wind");
  wind.textContent = weatherObject.wind.speed +"m/s"+ " , " + weatherObject.wind.deg +"°";

  var humidity = document.querySelector("#humidity");
  humidity.textContent = weatherObject.main.humidity+"%";

  var citydisplay = document.querySelector("#city");
  var countrydisplay = document.querySelector("#country");

  citydisplay.textContent = weatherObject.name;
  countrydisplay.textContent = weatherObject.sys.country;
}

var submit = document.querySelector("#submit");
submit.addEventListener("click", updateCity);

function updateCity(){
  city = ""+$("#input").val();
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
  $("#input").val("");
}
