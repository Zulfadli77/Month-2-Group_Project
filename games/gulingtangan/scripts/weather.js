link = "https://api.openweathermap.org/data/2.5/weather?id=1820818&APPID=1197ad2756ecef6facfc03cd91cb9f9b";
var request = new XMLHttpRequest();
request.open('GET',link,true);
request.onload = function(){
  var obj = JSON.parse(this.response);
  console.log(obj);
  document.getElementById('weather').innerHTML = obj.weather[0].description;
  document.getElementById('location').innerHTML = obj.name;
  const tempe = obj.main.temp - 273.15;
  document.getElementById('temp').innerHTML = tempe.toFixed(1);
  document.getElementById('icon').src = "http://openweathermap.org/img/w/"+obj.weather[0].icon+".png";
}
if(request.status==200){
  console.log("ERROR");
}
request.send();