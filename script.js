// API Elements
const apiKey = "e7c1be5883c9f4a35fc0943f88b03ae1";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=`;

// BUTTON
const searchBtn = document.querySelector(".searchBtn");

async function getWeather() {
  const city = document.querySelector(`#searchBox`).value;
  // const city = `Hardoi`;
  try {
    // CURRENT WEATHER FETCH
    const currentWeatherResponse = await fetch(
      apiURL + city + `&units=metric&appid=` + apiKey,
    );
    if (!currentWeatherResponse.ok) {
      alert("Please enter a correct City Name");
      return;
    }
    const currentWeatherData = await currentWeatherResponse.json();

    // 5 DAYS FORECAST FETCH
    const forecastResponse = await fetch(
      forecastApiUrl + city + `&units=metric&appid=` + apiKey,
    );
    if (!forecastResponse.ok) {
      alert("Error fetching forecast data");
      return;
    }
    const forecastData = await forecastResponse.json();

    updateCurrentWeather(currentWeatherData);
    updateForecast(forecastData);
  } catch (error) {
    console.error("Error:", error);
  }
}

function updateCurrentWeather(data) {
  const location = data.name;
  const temp = data.main.temp + "°c";
  const humidity = data.main.humidity + "%";
  const wind = data.wind.speed + "km/h";

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
function updateCurrentWeather(data) {
  const location = data.name;
  const temp = data.main.temp + "°c";
  const humidity = data.main.humidity + "%";
  const wind = data.wind.speed + "km/h";
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  console.log(icon);

  document.querySelector(".location").innerHTML =
    `<img src="${icon}" class=" md:h-32 mx-auto" alt="weatherLogo">` + location;

  document.querySelector(".temperature").innerHTML =
    `${temp}<p class="text-base">Temperature</p>`;
  document.querySelector(".humidity").innerHTML =
    `${humidity}<p class="text-base">Humidity</p>`;
  document.querySelector(".wind").innerHTML =
    `${wind}<div class="text-base"> Wind Speed</div>`;
}

function updateForecast(data) {
  const forecastContainer = document.querySelector(".forecast");
  // CLEARING CONTAINER FOR NEW SEARCH
  forecastContainer.innerHTML = "";

  data.list.forEach((item, index) => {
    if (index % 8 === 0) {
      // SHOW DAILY FORECAST
      const forecastDate = new Date(item.dt * 1000);
      const day = forecastDate.toLocaleDateString("en-US", { weekday: "long" });
      const temp = item.main.temp + "°c";
      const description = item.weather[0].description;
      const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

      forecastContainer.innerHTML += `
              <div class="forecast-item flex flex-col items-center p-2 gap-4md:px-10 hover:scale-90 transition-all duration-300 bg-black bg-opacity-20 rounded-lg m-2">
                  <h4 class="text-xl font-bold">${day}</h4>
                  <img src="${icon}" alt="${description}" class="h-12 w-12">
                  <p class="text-lg">${temp}</p>
                  <p class="text-sm">${description}</p>
              </div>
          `;
    }
  });
}

searchBtn.addEventListener("click", getWeather);
