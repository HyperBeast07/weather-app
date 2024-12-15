// JS Code to deal with data, HTTP Request and API

/*
when we generally use an API, they want us to create an app --> https://developer.accuweather.com/user/me/apps --> "add a new app"

check "create_app_example.png"

The idea to create the app is to GET AN API KEY from the API service (accuweather)

This API KEY is when we make any HTTP request to their service, we can send this key, when it reaches their service, they know who made the request

Free trial - we can only open 1 account and have 15 request.day
*/

const key = "6TnnvRurx1FJF4Nyae711W3Pt1hEWXQH";

/*
when we are requesting data from the ENDPOINTS in this API, we need to do 2 different things (for our project):

    (i) make a req to a certain endpoint to get CITY INFORMATION, in that city information, there's a city code
    (ii) we are going to use this CITY CODE to make another request to a weather condition API ENDPOINT

    documentation - https://developer.accuweather.com/apis

    (i) "Location API" --> "city search"
    (ii) "Conditions API" --> "current conditions"
*/

// i) get City API call
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";

  const query = `?apikey=${key}&q=${city}`;

  // make a request (returns a promise)
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

// ii) get Weather API Call
const getWeather = async (id) => {
  const base = `http://dataservice.accuweather.com/currentconditions/v1/${id}`;

  const query = `?apikey=${key}`;

  const response = await fetch(base + query);

  const data = await response.json();

  return data[0];
};

// iii) Get 5 days of Daily Forecasts API

const getForecast = async (id) => {
  const base = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}`;

  const query = `?apikey=${key}`
  
  const response = await fetch(base + query)
  
  const data = await response.json()
  
  return data.DailyForecasts
}

const getHourly = async (id) => {
  const base = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${id}`

  const query = `?apikey=${key}`
  
  const response = await fetch(base + query)
  
  const data = await response.json()

  return data
}


getWeather(328960).then(data => {
  console.log(data)
})


