import { defaultStore } from "./js/defaultStore.js";
import { getImage } from "./js/functions.js";

// IT SEEMS MY code and API DOES NOT WORK ANYMORE(
const link =
  "http://api.weatherstack.com/current?access_key=4a75517d06d62d68c75f79d42014fd86";

const root = document.getElementById("root");
const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
const form = document.querySelector("#form");
let store = {}

// request to server to receive weather data in a specific city
const fetchData = async () => {
  try {
    const result = await fetch(`${link}&query=${defaultStore.city}`);
    const data = await result.json();
    if(!data.success) return
    const  {
      current: {
        cloudcover,
        temperature,
        humidity,
        observation_time: observationTime,
        pressure,
        uv_index: uvIndex,
        visibility,
        is_day: isDay,
        weather_descriptions: description,
        wind_speed: windSpeed,
      },
      location: { name },
    } = data;
   
    store = {
      ...defaultStore,
      isDay,
      city: name,
      temperature,
      observationTime,
      description: description[0],
      properties: {
        cloudcover: {
          title: "cloudcover",
          value: `${cloudcover}%`,
          icon: "cloud.png",
        },
        humidity: {
          title: "humidity",
          value: `${humidity}%`,
          icon: "humidity.png",
        },
        windSpeed: {
          title: "wind speed",
          value: `${windSpeed} km/h`,
          icon: "wind.png",
        },
        pressure: {
          title: "pressure",
          value: `${pressure} %`,
          icon: "gauge.png",
        },
        uvIndex: {
          title: "uv Index",
          value: `${uvIndex} / 100`,
          icon: "uv-index.png",
        },
        visibility: {
          title: "visibility",
          value: `${visibility}%`,
          icon: "visibility.png",
        },
      },
    };

    renderComponent();
  } catch (err) {
    console.log(err);
  }
};


// rendering weather window parameters
const renderProperty = (properties) => {
  return Object.values(properties)
    .map(({ title, value, icon }) => {
      return `<div class="property">
            <div class="property-icon">
              <img src="./img/icons/${icon}" alt="">
            </div>
            <div class="property-info">
              <div class="property-info__value">${value}</div>
              <div class="property-info__description">${title}</div>
            </div>
          </div>`;
    })
    // converting array to string
    .join("");
};

// render weather window
const markup = () => {
  const { city, description, observationTime, temperature, isDay, properties } =
    store;
  const containerClass = isDay === "yes" ? "is-day" : "";

  return `<div class="container ${containerClass}">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./img/${getImage(description)}" alt="" />
                <div class="description">${description}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${temperature}°</div>
              </div>
            </div>
          </div>
        <div id="properties">${renderProperty(properties)}</div>
      </div>`;
};

// popup modal window
const togglePopupClass = () => { 
  popup.classList.toggle("active");
};

// content rendering
const renderComponent = () => {
  root.innerHTML = markup();

  const city = document.getElementById("city");
  city.addEventListener("click", togglePopupClass);
};

// writing the input value to the store object
const handleInput = (e) => {
  store = {
    ...store,
    city: e.target.value,
  };
};

// writing form contents to store and saving
const handleSubmit = (e) => {
  e.preventDefault();
  const value = store.city;

  if (!value) return null;


  fetchData();
  togglePopupClass();
};

form.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);

fetchData();