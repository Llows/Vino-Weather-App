let now = new Date();

let h6 = document.querySelector("h6");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h6.innerHTML = `${day} ${month} ${date} ${hours}:${minutes} ${year}`;

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a19d0a7907ecf33ebe6bf26439eeef45";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentPosition);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "a19d0a7907ecf33ebe6bf26439eeef45";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  temperatureElement.innerHTML = `${temperature}`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
}
