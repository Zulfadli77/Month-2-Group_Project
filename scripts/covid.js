//search bar function
function searchFunc() {
    let name = document.getElementById("searchName").value;
    const nameCaps = name.charAt(0).toUpperCase() + name.slice(1);
    let iso = document.getElementById("searchIso").value;
    generateValue(nameCaps,iso)
}


//populate select option
populateSelect();
function populateSelect() {
    //fetch json API into data
    fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "baf943618amsh85fd85683c6450ep176f9ejsn6f2d8b6e857b",
			"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
		}
	})
	.then(response => response.json())
	.then(data => {
		//console.log(data);
		let html = data.map(countries => {
			return `<option id="selection" value='[{"country":"${countries.Country}", "iso":"${countries.ThreeLetterSymbol}"}]'> ${countries.Country}</option>`;
			//return `<option id="selection" value="'${countries.Country}', '${countries.ThreeLetterSymbol}'"> ${countries.Country}</option>`;
		}).join('');
		//console.log(html);	
		document.querySelector("#countrySelect").insertAdjacentHTML("beforeend", html);
	})

	.catch(error => console.log(error))
}


//search select function
const selectBtn = document.querySelector('#select');  
const selection = document.querySelector('#countrySelect');  
selectBtn.onclick = (event) => {  
	event.preventDefault();  
	//console.log(selection.value);
	let select = selection.value;
	var data= jQuery.parseJSON(select); 
	//console.log(data[0]["country"]);
	let name= data[0]["country"];
	let iso= data[0]["iso"];
	generateValue(name,iso);
};  



//atr = data.map(covid =>{
//	return `[${covid.Case_Fatality_Rate},${covid.Infection_Risk}]`
//})

//fetch API function
generateValue('Brunei','brn');

async function generateValue(nameCaps,iso){
	//append country name in title	
	//console.log(nameCaps);
	document.getElementById('countryName').innerHTML = nameCaps;

	fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/" + nameCaps + "/" + iso + "/",{
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "c013b47707mshfa38e5ff335a2fap1920bejsnc9b6916eec31",
			"x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com"
		}
	})
	.then(response => response.json())
	.then(response => {
		//console.log(response.length);
		// console.log(response[0].TotalCases);
		document.getElementById('totalCase').innerHTML = response[0].TotalCases;
		document.getElementById('caseFatalityRate').innerHTML = response[0].Case_Fatality_Rate + '%';
		document.getElementById('newCases').innerHTML = response[0].NewCases;
		document.getElementById('infectionRisk').innerHTML = response[0].Infection_Risk +'%';
		document.getElementById('seriousCritical').innerHTML = response[0].Serious_Critical;
		document.getElementById('totalDeaths').innerHTML = response[0].TotalDeaths;
		document.getElementById('newDeaths').innerHTML = response[0].NewDeaths;
		document.getElementById('totalRecovered').innerHTML = response[0].TotalRecovered;
	})


	.catch(err => {
		console.error(err);
	});
}	