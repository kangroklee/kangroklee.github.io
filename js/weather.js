require('dotenv').config();
console.log(process.env.API_KEY);

function isSun(currentTime, sunriseTime, sunsetTime) { //추후 기능에 사용, 별도로 뺌
    if(currentTime<=sunriseTime) {
        return 0;
    } else if(currentTime<=sunsetTime) {
        return 1;
    } else if(currentTime>sunsetTime){
        return 2;
    } else {
        return -1;
    }
}

function handleLocale(data) {
    const currentTime = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    let sunPos = isSun(currentTime, sunrise, sunset);
    if(sunPos === 0) {
        console.log("해안뜸");
    }
    if(sunPos === 1) {
        console.log("해뜸");
    }
    if(sunPos === 2) {
        console.log("해짐");
    }
    if(sunPos === -1) {
        console.log("오류");
    }
    paintWeather(data);
}

function paintWeather(data) {
    const city = data.name;
    const temp = Math.floor(data.main.temp);
    const weatherIcon = data.weather[0].icon;
    const weather = data.weather[0].main;

    console.log(city, temp, weather);

    const cityElem = document.getElementById("city");
    const tempElem = document.getElementById("temp");
    const weatherIconElem = document.getElementById("weather-img");
    const weatherElem = document.getElementById("weather-desc");

    cityElem.innerText = city;
    tempElem.innerText = temp;
    weatherIconElem.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`
    weatherElem.innerText = weather;
}

function onGeoSuccess(pos) {
    console.log(pos);
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    const API_KEY = process.env.API_KEY; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
    
    fetch(url).then(response => response.json().then(data => handleLocale(data)));
}

function onGeoError() {
    alert("Unable to access geolocation.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);