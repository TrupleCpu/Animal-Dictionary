const input = document.getElementById("input");
const searchIs = document.getElementById("Search");
const close = document.getElementById("Close");
const continues = document.getElementById("Continue");

searchIs.addEventListener("click", () => {
    search();
    document.querySelector(".Welcome").style.display = "none";
    document.querySelector(".results-container").style.visibility = "visible";
})
close.addEventListener("click", () => {
    input.value = input.value.innerHTML = '';   
})



input.addEventListener("keypress", (event) => {
   
    if(event.keyCode == 13){
        event.preventDefault();
        document.querySelector(".Welcome").style.display = "none";
        document.querySelector(".results-container").style.visibility = "visible";
        search();
    }
    
})


function search() {


    document.querySelector(".Details").innerHTML = 
    `
    <div class="loader">

    </div>  
    `
    let key = "hIYLZr/pzSqthD/u4opNOA==0qHC28giuOlNhome";
     let keyWord = input.value;
    const options = {
        method: 'GET',
        headers: {'X-API-KEY': key}
    }

    const url = `https://api.api-ninjas.com/v1/animals?name=${keyWord}`;

    fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
            
    let name = input.value;


        document.querySelector(".Details").innerHTML = 
        `
        <div class="Classification">
                <p>${data[0].taxonomy.class }</p>
               </div>
               <div class="Animal-name">
                <h1>${name}</h1>
                <button onclick="sayThis()"><i class="fa-solid fa-volume-high"></i></button>
               </div>
               <div class="Slogan">
                <p>${data[0].characteristics.slogan || "no record found"}</p>
               </div>
               <div class="Facts">
                  <div class="titles">
                    <p>Facts</p>
                  </div>
                  <div class="lifespan">
                    <p>Average lifespan</p>
                    <p>${data[0].characteristics.lifespan || "no record found"}</p>
                  </div>
                  <div class="height">
                     <p>Height</p>
                     <p>${data[0].characteristics.height || "no record found"}</p>
                  </div>
                  <div class="weight">
                       <p>Weight</p>
                       <p>${data[0].characteristics.weight || "no record found"}</p>
                  </div>
                  <div class="speed">
                     <p>Top Speed</p>
                     <p>${data[0].characteristics.top_speed || "no record found"}</p>
                  </div>
               </div>
        `
           
        document.querySelector(".image-area").innerHTML = `
        <div class="image-load"> 

        </div>
        
        `
        
     
        imageEngine();
    })
    .catch((error) => {
        document.querySelector(".results-container").innerHTML =  `
         <div class="error-message">
                <img src="magnifying_glass-removebg-preview.png" alt="">
                <h1>Are you sure it's an animal?</h1>
                 <h6> Please refresh the page to Continue</h6>
            </div>
        `
    })
}



function imageEngine() {
   
    let name = input.value;
    fetch(`https://api.unsplash.com/search/photos?query=${name}&client_id=PoOMH6kMRRVP4yKN-7ADrHG8XopPdRTkzLKBzJKIDSQ`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        document.querySelector(".image-area").innerHTML = 
        `
        <img src=${data.results[0].urls.full}>
        `
    })

}

function sayThis() {
    const synth = window.speechSynthesis
    let speech = input.value;
    const SpeechThis = new SpeechSynthesisUtterance(speech);

    synth.speak(SpeechThis);
}

setTimeout(popUp, 2000)

function popUp() {
    
    document.querySelector(".alert").style.left = "10px";

   
    
}

function remove() {
    document.querySelector(".alert").style.display = "none";
}