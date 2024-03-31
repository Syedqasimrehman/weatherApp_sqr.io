const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
let time_Date = document.querySelector(".time_Date");


const updateUI = ({ cityDetails, weather }) => {
  console.log(weather);

  details.innerHTML = `
      <div class="country_de">
      <h5 class="count">Country:</h5>
       <h5 class="count">${cityDetails.EnglishName}</h5>
       </div>
       <div class="country_de">
       <h5 class="count">Weather:</h5>
       <h5 class="count">${weather.WeatherText}</h5>
       </div>
       <div class="country_de temp count">
       <h5 class="">Feel Like:</h5>
       <span>${weather.Temperature.Metric.Value}&deg;C</span>
       
       </div>
       `;
  //    <h5 class="count"> ${cityDetails.LoclaizedName}</h5>

  //  <span>Humidity: ${weather.RelativeHumidity}%</span><br>
  //  <span>Wind Speed: ${weather.Wind.Speed.Metric.Value} km/h</span><br>

  const time_date = () => {
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();
    const DateFormatted = currentDate.toLocaleDateString();

    time_Date.innerHTML = `
            <div class="time-da">${DateFormatted}</div>
            <div class="time-da">${currentTime}</div>
        `;
  };
  time_date();
  setInterval(time_date, 1000);

  time_date.s;

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  const weatherConditions = {
    Sunny: "Clear.jpg",
    "Partly sunny": "Clear.jpg",
    "Mostly sunny": "Clear.jpg",
    Sunrise: "Sunrise.jpg",
    "Hazy sunshine": "Hazy_sunshine.jpg",
    Sunset: "Sunset.jpg",
    Clear: "clear.jpg",
    "Mostly clear": "Clear.jpg",
    "Partly cloudy": "PartlyCloudy.jpg",
    Cloudy: "Cloudy.jpg",
    "Mostly cloudy": "Cloudy.jpg",
    Dust: "Dust.jpg",
    Haze: "Haze.jpg",
    Smoke: "Smoke.jpg",
    Fog: "Fog.jpg",
    Windy: "Windy.jpg",
    Thunderstorms: "Thunderstorm.jpg",
    Rain: "Rain.jpg",
    "Heavy rain": "Heavy_Rain.jpg",
    "Light rain": "rain.jpg",
    Drizzle: "Drizzle.jpg",
    Hail: "rain.jpg",
    Tornado: "Tornado.jpg",
    Snow: "Snow.jpg",
    "Scattered snow": "Snow.jpg",
    "Heavy snow/Sleet": "Heavy snowSleet.jpg",
    "Blowing snow": "Snow.jpg",
  };

  const { WeatherText } = weather;
  const timeScr = `img/${weatherConditions[WeatherText] || "night.jpg"}`;
  // const backgroundImgUrl = `url("img/${
  //   weatherConditions[WeatherText] || "night.jpg"
  // }")`;

  time.setAttribute("src", timeScr);
  // background.style.backgroundImage = backgroundImgUrl;

  card.classList.remove("d-none");
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  // object short and notation
  return { cityDetails, weather };
};

cityForm.addEventListener("submit", (e) => {
  //prevent default acttion
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((error) => console.log(error));

  // ste localstorage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
