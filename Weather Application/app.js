let searchInput = document.getElementById("search-input");
searchInput.value = "";
let city = document.getElementById("city");
let country = document.getElementById("country");
let weatherImg = document.getElementById("weather-img");
let date = document.getElementById("date");
let description = document.getElementById("description");
let time = document.getElementById("time");
let tempratureElement = document.getElementById("temprature");
let temp = document.getElementById("temp");
let celsius = document.getElementById("celsius");
let humidity = document.getElementById("humidity");
let visibility = document.getElementById("visibility");
let cloudCover = document.getElementById("cloud-cover");
let pressure = document.getElementById("pressure");
let wind = document.getElementById("wind");
let interval;
let mainContainer = document.getElementById("main-container");
mainContainer.style.backgroundImage = "url('weather-image/day.jpg')";
//Fetch widh navigator
// fetch("https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=bba17a072d2127459491390ad0f73f88&units=metric")
navigator.geolocation.getCurrentPosition(function (location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=bba17a072d2127459491390ad0f73f88&units=metric`)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            city.innerText = data.name;
            country.innerText = data.sys.country;
            description.innerText = data.weather[0].description;
            tempratureElement.innerHTML = `${Math.round(data.main.temp)}<sup id="celsius">°C</sup>`;
            temp.innerText = `${Math.round(data.main.temp)}%`;
            humidity.innerText = `${data.main.humidity}%`;
            let visibilityConversionFactor = 0.001;
            let visibilityMeters = data.visibility;
            let visibilityKilometers = visibilityMeters * visibilityConversionFactor;
            visibility.innerText = `${Math.round(visibilityKilometers)}km`;
            cloudCover.innerText = `${data.clouds.all}%`;
            pressure.innerText = `${data.main.pressure} Hpa`;
            let windConversionFactor = 3.6;
            let windSpeedMps = data.wind.speed;
            let windSpeedKmPerHour = windSpeedMps * windConversionFactor;
            wind.innerText = `${Math.round(windSpeedKmPerHour)} km/h`
            interval = setInterval(function () {
                let currentTimeMillis = Date.now();
                let timezoneOffsetMillis = data.timezone * 1000;
                let currentTimeInTimezone = new Date(currentTimeMillis + timezoneOffsetMillis);
                let hours = currentTimeInTimezone.getUTCHours();
                let minutes = currentTimeInTimezone.getUTCMinutes();
                let seconds = currentTimeInTimezone.getUTCSeconds();
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                let formattedTime = `${hours}:${minutes}:${seconds}`;
                if (hours < 12) {
                    time.innerText = `${formattedTime} AM`;
                }
                else {
                    time.innerText = `${formattedTime} PM`;
                }
            })
            let currentTimeMillis = Date.now();
            let timezoneOffsetMillis = data.timezone * 1000;
            let currentTimeInTimezone = new Date(currentTimeMillis + timezoneOffsetMillis);
            let year = currentTimeInTimezone.getUTCFullYear();
            let month = currentTimeInTimezone.getUTCMonth() + 1;
            let day = currentTimeInTimezone.getUTCDate();
            let formattedDate = `${month}/${day}/${year}`;
            date.innerText = formattedDate;
            let sunriseTimestamp = data.sys.sunrise;
            let sunsetTimestamp = data.sys.sunset;
            let currentTimestamp = Math.floor(Date.now() / 1000);
            let isDaytime = currentTimestamp >= sunriseTimestamp && currentTimestamp <= sunsetTimestamp;
            if (isDaytime) {
                mainContainer.style.backgroundImage = "url('weather-image/day.png')";
            } else {
                mainContainer.style.backgroundImage = "url('weather-image/night.jpg')";
            }
            if (data.weather[0].main === "Thunderstorm") {
                weatherImg.src = "weather-image/thunderstorms.svg";
            }
            else if (data.weather[0].main === "Drizzle") {
                weatherImg.src = "weather-image/drizzle.svg";
            }
            else if (data.weather[0].main === "Rain") {
                weatherImg.src = "weather-image/rain.svg";
            }
            else if (data.weather[0].main === "Snow") {
                weatherImg.src = "weather-image/snow.svg";
            }
            else if (data.weather[0].main === "Mist") {
                weatherImg.src = "weather-image/mist.svg";
            }
            else if (data.weather[0].main === "Smoke") {
                weatherImg.src = "weather-image/smoke.svg";
            }
            else if (data.weather[0].main === "Haze") {
                weatherImg.src = "weather-image/haze.svg";
            }
            else if (data.weather[0].main === "Dust") {
                weatherImg.src = "weather-image/dust.svg";
            }
            else if (data.weather[0].main === "Fog") {
                weatherImg.src = "weather-image/fog.svg";
            }
            else if (data.weather[0].main === "Sand") {
                weatherImg.src = "weather-image/dust.svg";
            }
            else if (data.weather[0].main === "Tornado") {
                weatherImg.src = "weather-image/tornado.svg";
            }
            else if (data.weather[0].main === "Clouds") {
                weatherImg.src = "weather-image/clouds.svg";
            }
            else {
                if (isDaytime) {
                    weatherImg.src = "weather-image/clear-day.svg";
                } else {
                    weatherImg.src = "weather-image/clear-night.svg";
                }
            }
        }
        )
        .catch(function (error) {
            console.log(error);
        })
})
//Fetch widh input(search)
function searchCity() {
    if (searchInput.value.trim() === "") {
        Swal.fire("Please enter a city");
    }
    else {
    setTimeout(function () {
        clearTimeout(interval);
        time.innerText = "";
    })
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=bba17a072d2127459491390ad0f73f88&units=metric`)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            searchInput.value = "";
            city.innerText = data.name;
            country.innerText = data.sys.country;
            description.innerText = data.weather[0].description;
            tempratureElement.innerHTML = `${Math.round(data.main.temp)}<sup id="celsius">°C</sup>`;
            temp.innerText = `${Math.round(data.main.temp)}%`;
            humidity.innerText = `${data.main.humidity}%`;
            let visibilityConversionFactor = 0.001;
            let visibilityMeters = data.visibility;
            let visibilityKilometers = visibilityMeters * visibilityConversionFactor;
            visibility.innerText = `${Math.round(visibilityKilometers)}km`;
            cloudCover.innerText = `${data.clouds.all}%`;
            pressure.innerText = `${data.main.pressure} Hpa`;
            let windConversionFactor = 3.6;
            let windSpeedMps = data.wind.speed;
            let windSpeedKmPerHour = windSpeedMps * windConversionFactor;
            wind.innerText = `${Math.round(windSpeedKmPerHour)} km/h`;
            interval = setInterval(function () {
                let currentTimeMillis = Date.now();
                let timezoneOffsetMillis = data.timezone * 1000;
                let currentTimeInTimezone = new Date(currentTimeMillis + timezoneOffsetMillis);
                let hours = currentTimeInTimezone.getUTCHours();
                let minutes = currentTimeInTimezone.getUTCMinutes();
                let seconds = currentTimeInTimezone.getUTCSeconds();
                let timePeriod;
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                timePeriod = hours < 12? "AM":"PM";
                if (hours > 12) {
                    hours = hours % 12;
                  }
                let formattedTime = `${hours}:${minutes}:${seconds}`;
                time.innerText = `${formattedTime} ${timePeriod}`;
            })
            let currentTimeMillis = Date.now();
            let timezoneOffsetMillis = data.timezone * 1000;
            let currentTimeInTimezone = new Date(currentTimeMillis + timezoneOffsetMillis);
            let year = currentTimeInTimezone.getUTCFullYear();
            let month = currentTimeInTimezone.getUTCMonth() + 1;
            let day = currentTimeInTimezone.getUTCDate();
            let formattedDate = `${month}/${day}/${year}`;
            date.innerText = formattedDate;
            let sunriseTimestamp = data.sys.sunrise;
            let sunsetTimestamp = data.sys.sunset;
            let currentTimestamp = Math.floor(Date.now() / 1000);
            let isDaytime = currentTimestamp >= sunriseTimestamp && currentTimestamp <= sunsetTimestamp;
            if (isDaytime) {
                mainContainer.style.backgroundImage = "url('weather-image/day.jpg')";
            } else {
                mainContainer.style.backgroundImage = "url('weather-image/night.jpg')";
            }
            if (data.weather[0].main === "Thunderstorm") {
                weatherImg.src = "weather-image/thunderstorms.svg";
            }
            else if (data.weather[0].main === "Drizzle") {
                weatherImg.src = "weather-image/drizzle.svg";
            }
            else if (data.weather[0].main === "Rain") {
                weatherImg.src = "weather-image/rain.svg";
            }
            else if (data.weather[0].main === "Snow") {
                weatherImg.src = "weather-image/snow.svg";
            }
            else if (data.weather[0].main === "Mist") {
                weatherImg.src = "weather-image/mist.svg";
            }
            else if (data.weather[0].main === "Smoke") {
                weatherImg.src = "weather-image/smoke.svg";
            }
            else if (data.weather[0].main === "Haze") {
                weatherImg.src = "weather-image/haze.svg";
            }
            else if (data.weather[0].main === "Dust") {
                weatherImg.src = "weather-image/dust.svg";
            }
            else if (data.weather[0].main === "Fog") {
                weatherImg.src = "weather-image/fog.svg";
            }
            else if (data.weather[0].main === "Sand") {
                weatherImg.src = "weather-image/dust.svg";
            }
            else if (data.weather[0].main === "Tornado") {
                weatherImg.src = "weather-image/tornado.svg";
            }
            else if (data.weather[0].main === "Clouds") {
                weatherImg.src = "weather-image/clouds.svg";
            }
            else {
                if (isDaytime) {
                    weatherImg.src = "weather-image/clear-day.svg";
                } else {
                    weatherImg.src = "weather-image/clear-night.svg";
                }
            }
        }
        )
        .catch(function (error) {
            console.log(error);
        })
}
}