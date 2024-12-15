// JS Code to deal with DOM Manipulation
const edit = 1
const logo = document.querySelector(".logo")
const searchBar = document.querySelector(".search-bar")
// const magnifyingGlass= document.querySelector(".input-image")
const cityForm = document.querySelector("form");
const card = document.querySelectorAll(".card");
const horizontalLine = document.querySelector(".horizontal-line")
const searchCard = document.querySelector(".search-card")
const details = document.querySelector(".details");
const time = document.querySelector(".time")
const icon = document.querySelector(".icon img")
const fiveDayForecasts = document.querySelector(".five-day-forecasts")
const fiveDayForecastsContainer = document.querySelector(".five-day-forecasts-container")
const dateAndTime = document.querySelector(".current-day-and-time")
const hourlyCard = document.querySelector(".hourly-card")
const hourlyForecastContainer = document.querySelector(".hourly-forecast-container")
const body = document.querySelector("body")
const toggle = document.querySelector("#toggle")

// toggle between dark and light mode
icons = document.querySelectorAll('img[src*="../img/icons/"]');
eachHourlyCard = document.querySelectorAll(".each-hourly-card")

toggle.onclick = function() {
  toggle.classList.toggle("active");
  body.classList.toggle("active");
  icons.forEach(icon => {
    icon.classList.toggle('active')
    if (icon.classList.contains("active")) {
      icons.forEach(icon => {
        const currentSrc = icon.getAttribute("src")
        const newSrc = currentSrc.replace("../img/icons/", "../img/toggleIcons/")
        icon.setAttribute('src', newSrc)
      })
    }
    else {
      icons.forEach(icon => {
        const currentSrc = icon.getAttribute("src")
        const newSrc = currentSrc.replace("../img/toggleIcons/", "../img/icons/")
        icon.setAttribute('src', newSrc)
      })
    }
  })
  fiveDayForecasts.classList.toggle("active");
  card.forEach( card => {
    card.classList.toggle("active")
  })
 searchCard.classList.toggle("active")
  eachHourlyCard.forEach(card => {
    card.classList.toggle("active")
  })
  horizontalLine.classList.toggle("active")
  logo.classList.toggle("active")
  if (logo.classList.contains("active")) {
    const logoSrc = logo.getAttribute("src")
    const toggleLogoSrc = logoSrc.replace("../img/lightSun.svg", "../img/darkSun.svg")
    logo.setAttribute("src", toggleLogoSrc)
  }
  else {
    const logoSrc = logo.getAttribute("src")
    const toggleLogoSrc = logoSrc.replace("../img/darkSun.svg", "../img/lightSun.svg")
    logo.setAttribute("src", toggleLogoSrc)
  }

  searchBar.classList.toggle("active");
  // magnifyingGlass.classList.toggle("active")

}

const updateMode = () => {
  if (toggle.classList.contains("active")) {
      icons.forEach(icon => {
        icon.classList.add("active")
      })
  }
}

// ============== SECOND STEP ================
/* updating the UI with the custom object (2 key-values pairs [cityDetails & weather])*/
const updateUI = (data) => {
  
  const cityDetails = data.cityDetails;
  const weather = data.weather;
  const forecasts = data.forecasts
  const hourly = data.hourly

  // date & time
  const inputTimezone = cityDetails.TimeZone.Name; 
  const now = new Date();
  const timeNow = {timeZone: inputTimezone};
  const date = {day: "numeric", month: 'long', year: "numeric"}
  const day = {weekday: "short"}
  const currentTime = now.toLocaleTimeString('en-US', timeNow);
  const currentDate = now.toLocaleDateString('en-GB', date)
  const currentDay = now.toLocaleDateString('en-US', day)
  const options = { timeZone: inputTimezone, hour: "2-digit", hour12: true };
  const hour1 = new Date(hourly[0].DateTime).toLocaleTimeString('en-US', options)
  
  // update "details" template
  details.innerHTML = 
  `
  <div class="text-xl">NOW</div>
          <div class="flex items-center">
            <div class="text-4xl font-bold">
              <span>${Math.round(weather.Temperature.Metric.Value)}</span>
              <span class="celcius">&deg;C</span>
            </div>
            <div class="icon mx-auto text-center">
              <img src="../img/icons/${weather.WeatherIcon}.svg" alt="" class="duration-500 ease-in-out w-24 mr-8"/>
            </div>
          </div>
          <div class="uppercase">
            <h5 class="">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
          </div>
  `

    // update the night/day image
  
    // let timeSrc = null;
    // if(weather.IsDayTime) {
    //     timeSrc = "../img/morning.avif"
    // }
    // else {
    //     timeSrc = "../img/night.avif"
    // }

    // time.setAttribute("src", timeSrc)
    
    // update the icon based on (weather.WeatherIcon) --> https://thenounproject.com/browse/collection-icon/climacons-10/?p=1
    const iconSrc = `../img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute("src", iconSrc)

    // remove "hidden" class if present
    card.forEach(card => {
      if(card.classList.contains('hidden')) {
        card.classList.remove("hidden")
      }
    })
    // update the forecasts for the next 5 days
    fiveDayForecasts.innerHTML = ""
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    for (let i = 0; i < forecasts.length; i++) {
      
      fiveDayForecasts.innerHTML += 
      `
      <div>
          <div class="flex items-center">
            <img src="../img/icons/${forecasts[i].Day.Icon}.svg" alt="" class="w-16">
            <div>
              <div>${dayOfWeek[(now.getDay() + i + 1) % dayOfWeek.length]}</div>
            <div>
              <span>${Math.round((forecasts[i].Temperature.Minimum.Value -32) / 1.8)}</span><span>&deg;C |</span>
              <span>${Math.round((forecasts[i].Temperature.Maximum.Value -32) / 1.8)}</span><span>&deg;C</span>
            </div>
          </div>
        </div>
      `
    }
    
    if(fiveDayForecastsContainer.classList.contains("hidden")) {
      fiveDayForecastsContainer.classList.remove("hidden")
    }

    

    // update date & time
    dateAndTime.innerHTML = 
    `
        <div class="mb-1 mt-3">Currently in ${cityDetails.EnglishName}</div>
        <div class="mb-1">${currentTime}</div>
        <div>${currentDay}, ${currentDate}</div>
    `

    // update hourly forecast
    hourlyCard.innerHTML = ''

    for (let i = 0; i < hourly.length; i++) {
      currentHour = new Date(hourly[i].DateTime).toLocaleTimeString('en-US', options)
      if (currentHour[0] == "0") {
        currentHour = currentHour.replace(currentHour[0], "")
      }
      hourlyCard.innerHTML +=
      `
      <div class="each-hourly-card mx-auto border shadow-xl rounded-xl px-4 p-2 text-center">
        <div>${currentHour}</div>
        <img src="../img/icons/${hourly[i].WeatherIcon}.svg" alt="" class="w-16">
        <div>${Math.round((hourly[i].Temperature.Value - 32) / 1.8)}&deg;C</div>
      </div>
      `
    }
    if (hourlyForecastContainer.classList.contains("hidden")) {
      hourlyForecastContainer.classList.remove("hidden")
    }

    icons = document.querySelectorAll('img[src*="../img/icons/"]');
      if (body.classList.contains("active")) {
        icons.forEach(icon => {
          const currentSrc = icon.getAttribute("src")
          const newSrc = currentSrc.replace("../img/icons/", "../img/toggleIcons/")
          icon.setAttribute('src', newSrc)
        })
      }
      else {
        icons.forEach(icon => {
          const currentSrc = icon.getAttribute("src")
          const newSrc = currentSrc.replace("../img/toggleIcons/", "../img/icons/")
          icon.setAttribute('src', newSrc)
        })
      }
  
    eachHourlyCard = document.querySelectorAll(".each-hourly-card")
    eachHourlyCard.forEach(card => {
      if (body.classList.contains("active")) {
        card.classList.add("active")
      }
      else {
        (body.classList.remove("active"))
      }
    })
    
}

// ============== SECOND STEP ================
const updateCity = async (city) => {
  // using the 2 async API calls funcitons in our "forecast.js"
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);
  const forecasts = await getForecast(cityDetails.Key)
  const hourly = await getHourly(cityDetails.Key)

  // return a custom object with 2 key-values pairs
  return {
    cityDetails: cityDetails,
    weather: weather,
    forecasts : forecasts,
    hourly: hourly
  };
};
// ============== FIRST STEP ================

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get city value from out <form> input
  const city = cityForm.city.value.trim();

  cityForm.reset();

  // update the UI with the new city

  updateCity(city)
    //.then((data) => {
     // console.log(data);
    //})
    .then(data => {
        updateUI(data)
        updateMode()
    })
    .catch((err) => {
      console.log(err);
    });
});
