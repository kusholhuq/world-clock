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
