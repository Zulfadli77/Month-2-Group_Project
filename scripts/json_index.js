//Index.html==============================================================================================================================
//Display All Maximum 6 News


var txt = localStorage.getItem(1);
var obj = JSON.parse(txt);

document.getElementById("YOUTUBE_KEY_a").innerHTML = obj.Youtube_key + ' <br> ' + obj.Content;



var txt = localStorage.getItem(3);
var obj = JSON.parse(txt);

document.getElementById("YOUTUBE_KEY_1x").innerHTML = obj.Youtube_key + ' <br> ' + obj.Content;



var txt = localStorage.getItem(4);
var obj = JSON.parse(txt);

document.getElementById("YOUTUBE_KEY_1b").innerHTML = obj.Youtube_key + ' <br> ' + obj.Content;


var txt = localStorage.getItem(5);
var obj = JSON.parse(txt);

document.getElementById("YOUTUBE_KEY_5y").innerHTML = obj.Youtube_key + ' <br> ' + obj.Content;


var txt = localStorage.getItem(6);
var obj = JSON.parse(txt);

document.getElementById("YOUTUBE_KEY_6z").innerHTML = obj.Youtube_key + ' <br> ' + obj.Content;


var txt = localStorage.getItem(7);
var obj = JSON.parse(txt);

document.getElementById("YOUTUBE_KEY_7b").innerHTML = obj.Youtube_key + ' <br> ' + obj.Content;












