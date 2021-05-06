 funTxt = document.getElementById('fun');
 funBtn = document.getElementById('funBtn');


 funBtn.addEventListener("click", generateJokes);

 generateJokes()

 async function generateJokes(){
     const res = await fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist")
    
     const data = await res.json();
     console.log(data)
     console.log(data.joke)
     console.log(data.delivery)
     console.log(data.flags)
     let fun = ""
     if (data.joke == undefined){
         fun = `${data.setup} \n ${data.delivery}` 
     }else{
         fun = data.joke
     }
     funTxt.innerText = fun
}
 