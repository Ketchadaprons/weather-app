// search function and get api weather

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-text-input");
  let cityName = searchCity.value;
  //   console.log(searchCity.value);
  //   let displayCityName = document.querySelector("#city");
  //   displayCityName.innerHTML = cityName;

  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}
`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showCurrentTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// get current temperature/ description/humidity/wind

function showCurrentTemperature(reponse) {
  let temperature = Math.round(reponse.data.main.temp);
  let descriptionWeather = reponse.data.weather[0].description;
  let humidity = reponse.data.main.humidity;

  let wind = Math.round(reponse.data.wind.speed);
  console.log(reponse.data);
  //   console.log(temperature);

  let city = reponse.data.name;

  let showCityName = document.querySelector("#city");
  showCityName.innerHTML = city;

  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = descriptionWeather;

  let showTemperature = document.querySelector("#temperature");
  showTemperature.innerHTML = temperature;

  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `Humidity: ${humidity}%`;

  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `Wind: ${wind} km/h`;
}

// the Geolocation API

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}
`;
  axios.get(apiUrl).then(showCurrentTemperature);
  console.log(axios);
}

function getCurrentPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

// get current time

let currentTime = new Date();

let displayCurrentTime = document.querySelector("#current-date-time");
displayCurrentTime.innerHTML = formatDate(currentTime);

function formatDate(date) {
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = 0`${hour}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}
