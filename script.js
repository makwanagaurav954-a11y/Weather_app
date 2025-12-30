
const weatherForm = document.querySelector(".weatherForm");

const cityInput = document.querySelector(".cityInput");

const card = document.querySelector(".card");

const apiKey = "d729d9df34bfead4ea457551ead3f0a9";

const apiToken = "48c63fa38fe57aa9049867cc81311d8f2a80636f";



weatherForm.addEventListener("submit",async event =>{

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            const aqiResult = await getAqi(city);
            console.log(aqiResult);
            displayWeatherInfo(weatherData, aqiResult);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter a city");
    }

});

async function getAqi(city){

    const aqiUrl = `https://api.waqi.info/feed/${city}/?token=${apiToken}`;

    const response = await fetch(aqiUrl);

    if(!response.ok){
        throw new Error("Could not fetch data");
    }

    return await response.json();

}

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

     
    const response = await fetch(apiUrl);
    
    if(!response.ok){
        throw new Error("Could not fetch data");
    }

    return await response.json();


}

async function displayWeatherInfo(data, aqiInfo){
  //Just to see what's inside the data object
    // console.log(data);
    
    const {name: city,       
          main: {temp, humidity},
          weather: [{description, id}],} = data;

    const{data: {aqi}} = aqiInfo;
    console.log(aqi);

          try{
        // const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        // const aqiResult = await fetch(aqiUrl);
        // const aqiData = await aqiResult.json();
        // console.log(aqiData);
        // const components = aqiData.list[0].components;
        // console.log(components.pm2_5, components.pm10);

        //  aqi = aqiData.list[0].main.aqi;

       

    
          }
          catch(e){console.log(e);}
    
        card.textContent = " ";
        card.style.display = "flex";
        
        const cityDisplay = document.createElement("h1");
        const aqiDisplay = document.createElement("p");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        aqiDisplay.textContent = ` AQI ${aqi}`;
        tempDisplay.textContent = `${(temp-273.15).toFixed(1)}\u00B0C`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);

        cityDisplay.classList.add("cityDisplay");
        aqiDisplay.classList.add("aqiDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");


        card.appendChild(cityDisplay);
        card.appendChild(aqiDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
        

}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300): return "⛈️";
        case (weatherId >= 300 && weatherId < 400): return "🌧️";
        case (weatherId >= 500 && weatherId < 600): return "🌧️🌧️";
        case (weatherId >= 600 && weatherId < 700): return "❄️";
        case (weatherId >= 700 && weatherId < 800): return "🌫️";
        case (weatherId === 800): return "☀️";
        case (weatherId >= 801 && weatherId < 810): return "☁️";
        default: return "❓";

    }

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display= "flex";
    card.appendChild(errorDisplay);

    console.log("error");

}