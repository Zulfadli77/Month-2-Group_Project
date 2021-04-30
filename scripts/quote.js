fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "c013b47707mshfa38e5ff335a2fap1920bejsnc9b6916eec31",
		"x-rapidapi-host": "quotes15.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);
	document.getElementById('quote').innerHTML = '"' + response.content + '"';
    document.getElementById('author').innerHTML = '- ' + response.originator.name;
})
.catch(err => {
	console.error(err);
});