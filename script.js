const apiKey = "e7c1be5883c9f4a35fc0943f88b03ae1";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const searchBtn = document.querySelector(".searchBtn");
const currentBtn = document.querySelector("#currentLocation");

async function getWeather(city) {
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const currentWeatherResponse = await fetch(
      apiURL + city + `&units=metric&appid=` + apiKey,
    );
    if (!currentWeatherResponse.ok) {
      alert("Please enter a correct City Name");
      return;
    }
    const currentWeatherData = await currentWeatherResponse.json();

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
    saveRecentSearch(city);
    showRecentSearches();
  } catch (error) {
    console.error("Error:", error);
  }
}

function updateCurrentWeather(data) {
  const location = data.name;
  const temp = data.main.temp + "°c";
  const humidity = data.main.humidity + "%";
  const wind = data.wind.speed + "km/h";
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.querySelector(".location").innerHTML =
    `<img src="${icon}" class="md:h-32 mx-auto" alt="weatherLogo">` + location;
  document.querySelector(".temperature").innerHTML =
    `${temp}<p class="text-base">Temperature</p>`;
  document.querySelector(".humidity").innerHTML =
    `${humidity}<p class="text-base">Humidity</p>`;
  document.querySelector(".wind").innerHTML =
    `${wind}<div class="text-base"> Wind Speed</div>`;
}

function updateForecast(data) {
  const forecastContainer = document.querySelector(".forecast");
  forecastContainer.innerHTML = "";

  data.list.forEach((item, index) => {
    if (index % 8 === 0) {
      const forecastDate = new Date(item.dt * 1000);
      const day = forecastDate.toLocaleDateString("en-US", { weekday: "long" });
      const temp = item.main.temp + "°c";
      const description = item.weather[0].description;
      const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

      forecastContainer.innerHTML += `
        <div class="forecast-item flex flex-col items-center p-2 gap-4 md:px-10 hover:scale-90 transition-all duration-300 bg-black bg-opacity-20 rounded-lg m-2">
            <h4 class="text-xl font-bold">${day}</h4>
            <img src="${icon}" alt="${description}" class="h-12 w-12">
            <p class="text-lg">${temp}</p>
            <p class="text-sm">${description}</p>
        </div>
      `;
    }
  });
}

function saveRecentSearch(city) {
  let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  if (!recentSearches.includes(city)) {
    recentSearches.push(city);
    if (recentSearches.length > 5) {
      recentSearches.shift();
    }
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }
}

function showRecentSearches() {
  const dropdown = document.getElementById("dropdown");
  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];
  dropdown.innerHTML = "";
  if (recentSearches.length > 0) {
    recentSearches.forEach((city, index) => {
      const item = document.createElement("a");
      item.textContent = city;
      item.href = "#";
      item.className = "block px-4 py-2 text-sm text-gray-700";
      item.role = "menuitem";
      item.tabIndex = "-1";
      item.id = `menu-item-${index}`;
      item.onclick = () => {
        document.querySelector("#searchBox").value = city;
        getWeather(city);
        dropdownMenu.classList.add("hidden");
      };
      dropdown.appendChild(item);
    });
    dropdownMenu.classList.remove("hidden");
  } else {
    dropdownMenu.classList.add("hidden");
  }
}

function toggleDropdown() {
  const dropdownMenu = document.getElementById("dropdown-menu");
  dropdownMenu.classList.toggle("hidden");
}

document.addEventListener("click", (event) => {
  const dropdownMenu = document.getElementById("dropdown-menu");
  if (
    !dropdownMenu.contains(event.target) &&
    event.target.id !== "menu-button"
  ) {
    dropdownMenu.classList.add("hidden");
  }
});

searchBtn.addEventListener("click", () => {
  const city = document.querySelector("#searchBox").value.trim();
  getWeather(city);
});

async function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`,
          );
          if (!currentWeatherResponse.ok) {
            alert("Error fetching weather data for current location");
            return;
          }
          const currentWeatherData = await currentWeatherResponse.json();
          const city = currentWeatherData.name;

          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`,
          );
          if (!forecastResponse.ok) {
            alert("Error fetching forecast data");
            return;
          }
          const forecastData = await forecastResponse.json();

          updateCurrentWeather(currentWeatherData);
          updateForecast(forecastData);
          saveRecentSearch(city);
          showRecentSearches();
        } catch (error) {
          console.error("Error:", error);
        }
      },
      (error) => {
        alert("Unable to retrieve your location");
        console.error("Geolocation error:", error);
      },
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

currentBtn.addEventListener("click", getCurrentLocationWeather);
document.addEventListener("DOMContentLoaded", showRecentSearches);
