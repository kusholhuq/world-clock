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
var path = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = "london";
var key ="eb1566ac55549b1221d3b4722f59c341";
$.ajax({
  method:"GET",
  url: path + city + "&appid=eb1566ac55549b1221d3b4722f59c341",
  dataType:"json",
  success: function(data){
    console.log(data);
  },
  error:function(error){
    console.error(error);
  }
})
