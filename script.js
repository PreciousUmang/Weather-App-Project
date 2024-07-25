// API Elements
const apiKey = "e7c1be5883c9f4a35fc0943f88b03ae1";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=`;

// Buttons
const searchBtn = document.querySelector(".searchBtn");

async function getWeather() {
  const city = document.querySelector(`#searchBox`).value;
  // const city = "Lucknow";

  const result = await fetch(apiURL + city + `&units=metric&appid=` + apiKey);
  const data = await result.json();
  console.log(data);
  const location = data.name;
  const temp = data.main.temp + "°c";
  const humidity = data.main.humidity + "%";
  const wind = data.wind.speed + "km/h";
  console.log(temp);

  document.querySelector(".location").innerHTML =
    `<img src="./images/cloudy.png" class="h-16 md:32 mx-auto" alt="weatherLogo">` +
    location;
  document.querySelector(".temperature").innerHTML =
    `${temp}<p class="text-base">Temperature</p>`;
  document.querySelector(".humidity").innerHTML =
    `${humidity}<p class="text-base">Humidity</p>`;
  document.querySelector(".wind").innerHTML =
    `${wind}<div class="text-base"> Wind Speed</div>`;
}

searchBtn.addEventListener("click", getWeather);
// getWeather();
function displayData() {}
