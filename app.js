const apiKey = '3b460b0b2e6c5c8a88c70c92cf18df83'
const url = 'https://api.openweathermap.org/data/2.5/weather?&units=metric'
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("search");
const errorMsg = document.getElementById("error");
const dateDisplay = document.getElementById("date");
const cityName = document.getElementById("city-name");
const description = document.getElementById("description");
const temparature = document.getElementById("temp");
const  windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const weatherImg = document.getElementById("weather-img");
document.getElementById("main").style.display = "none";
document.getElementById("weather-data").style.display = "none";

// date
const gday = () => {
    const today = new Date();
    const month = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const currentDate = `${weekday[today.getDay()]} ${today.getDate()} ${month[today.getMonth()]}, ${today.getFullYear()}`
    dateDisplay.innerText = currentDate
    document.getElementById("time").innerText = today.toLocaleTimeString();
}

const weather = async (key, url, city) => {
    const endpoint = await fetch(url + `&q=${city}&appid=${key}`)
    if (!endpoint.ok) {
        errorMsg.innerText = 'Not Found.';
        document.getElementById("main").style.display = "none";
        return
    } else {
        const response = await endpoint.json()
        cityName.innerHTML =` <img src="./img/icons8-location-100.png" class="img-fluid" width=50px>${response.name}, ${response.sys.country}`;
        description.innerText = response.weather[0].main;
        document.getElementById("summary").innerText = response.weather[0].description;
        temparature.innerHTML = `${Math.round(response.main.temp)}°C`
        windSpeed.innerText = `${Math.round(response.wind.speed)}km/h`
        humidity.innerText =  `${Math.round(response.main.humidity)}%`
        pressure.innerText = `${response.main.pressure}Pa`
        displayWeatherImg(response);
        setInterval(gday, 1000);
        document.getElementById("main").style.display = "block";
        document.getElementById("weather-data").style.display = "block";    
    }
}
const checkInput = () => { 
    let city = cityInput.value;
    if (cityInput.value == '') {
        errorMsg.innerText = "Cannot be left blank."
        document.getElementById("main").style.display = "none";
        document.getElementById("weather-data").style.display = "none";
    } else {
        errorMsg.style.display = "none"
        weather(apiKey, url, city);
        cityInput.value  = "";
    }
}
searchBtn.addEventListener("click", () => {
    checkInput();
})
cityInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        checkInput();
    }
})

const displayWeatherImg = (response) => {
    let weatherType = response.weather[0].main;
    if (weatherType == "Clouds") {
        weatherImg.src = './img/cloudy.png'
    } else if (weatherType == "Clear") {
        weatherImg.src = './img/sun.png'
    } else if (weatherType == "Rain") {
        weatherImg.src = './img/rain.png'
    }  else if (weatherType == "Thunderstorm") {
        weatherImg.src = './img/storm.png'
    }  else if (weatherType == "Snow") {
        weatherImg.src = './img/snow-storm.png'
    }  else if (weatherType == "Mist") {
        weatherImg.src = './img/mist.png'
    } 
}

window.addEventListener("load", () => {
    weather(apiKey, url, 'Lagos');
});
