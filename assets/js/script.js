const appId = "33cf204da85e30fa6bec0525effbffbc";
const baseURL = "https://api.openweathermap.org/";
const weather5DaysApiURL = "data/2.5/forecast?lat="; //{lat}&lon={lon}&appid={API key}"
const geocodingAPI = "http://api.openweathermap.org/geo/1.0/direct?q=";
const currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=";

let searchHistory = [];
document
  .getElementById("searchCitybtn")
  .addEventListener("click", function (event) {
    const searchCity = document.getElementById("search-input").value;
    document.getElementById("search-input").value = "";
    console.log(searchCity);
    event.preventDefault();
    getWeatherByCity(searchCity);
  });

var ul = document.createElement("ul");
ul.setAttribute("id", "cityList");
document.getElementById("SearchCityDataList").appendChild(ul);

const getWeatherByCity = (city) => {
  const weatherapiUrl =
    currentWeatherAPI + city + "&units=imperial&appid=" + appId;
    const isCityNameExisting = searchHistory.some(history => history.name === city);

  if (searchHistory && searchHistory.length > 0) {
      if(!isCityNameExisting){
      fetchWeatherByCityAPICall(weatherapiUrl);
    }
  } else {
    fetchWeatherByCityAPICall(weatherapiUrl);
  }
};
//Fetch Weather API Handler
const fetchWeatherByCityAPICall = (url) => {
  fetch(url)
    .then((resp) => resp.json())
    .then(function (resData) {
      console.log(resData);
      searchHistory.push(resData);
      renderCityList(resData);
      renderForecast(resData);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const fetchAPI = (url) => {
  fetch(url)
    .then((resp) => resp.json())
    .then(function (resData) {
      console.log(resData);
      render5dayList(resData);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const render5dayList = (data) => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `(${month}/${day}/${year})`;
  //document.getElementById("forecastdateDay_1").textContent = data.name;
  document.getElementById("forecastdateDay_1").textContent =
    data.list[0].dt_txt.split(" ")[0];
  document.getElementById(
    "weathericonDay_1"
  ).src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
  document.getElementById("forecastTempValDay_1").textContent =
    data.list[0].main.temp + ' °F';
  const gustElement = document.getElementById("forecastWindValDay_1");
  if (data.list[0].wind.gust) {
    gustElement.textContent = data.list[0].wind.gust + ' MPH';
  } else {
    gustElement.textContent = "None";
  }

  document.getElementById("forecastHumidValDay_1").textContent =
    data.list[0].main.humidity+'%';

  document.getElementById("forecastdateDay_2").textContent =
    data.list[7].dt_txt.split(" ")[0];
  document.getElementById(
    "weathericonDay_2"
  ).src = `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}.png`;
  document.getElementById("forecastTempValDay_2").textContent =
    data.list[7].main.temp +' °F';

  const gustElement2 = document.getElementById("forecastWindValDay_2");
  if (data.list[7].wind.gust) {
    gustElement2.textContent = data.list[7].wind.gust + ' MPH';
  } else {
    gustElement2.textContent = "None";
  }

  document.getElementById("forecastHumidValDay_2").textContent =
    data.list[7].main.humidity+'%';

  document.getElementById("forecastdateDay_3").textContent =
    data.list[14].dt_txt.split(" ")[0];
  document.getElementById(
    "weathericonDay_3"
  ).src = `https://openweathermap.org/img/wn/${data.list[14].weather[0].icon}.png`;
  document.getElementById("forecastTempValDay_3").textContent =
    data.list[14].main.temp + ' °F';
  const gustElement3 = document.getElementById("forecastWindValDay_3");
  if (data.list[14].wind.gust) {
    gustElement3.textContent = data.list[14].wind.gust+ ' MPH';
  } else {
    gustElement3.textContent = "None";
  }

  document.getElementById("forecastHumidValDay_3").textContent =
    data.list[14].main.humidity +'%';

  document.getElementById("forecastdateDay_4").textContent =
    data.list[21].dt_txt.split(" ")[0];
  document.getElementById(
    "weathericonDay_4"
  ).src = `https://openweathermap.org/img/wn/${data.list[21].weather[0].icon}.png`;
  document.getElementById("forecastTempValDay_4").textContent =
    `${data.list[21].main.temp} °F`;
  const gustElement4 = document.getElementById("forecastWindValDay_4");
  if (data.list[21].wind.gust) {
    gustElement4.textContent = data.list[21].wind.gust + ' MPH';
  } else {
    gustElement4.textContent = "None";
  }

  document.getElementById("forecastHumidValDay_4").textContent =
    data.list[21].main.humidity + '%';

  document.getElementById("forecastdateDay_5").textContent =
    data.list[28].dt_txt.split(" ")[0];
  document.getElementById(
    "weathericonDay_5"
  ).src = `https://openweathermap.org/img/wn/${data.list[28].weather[0].icon}.png`;
  document.getElementById("forecastTempValDay_5").textContent =
    data.list[28].main.temp + ' °F';
  const gustElement5 = document.getElementById("forecastWindValDay_5");
  if (data.list[28].wind.gust) {
    gustElement5.textContent = data.list[28].wind.gust + ' MPH';
  } else {
    gustElement5.textContent = "None";
  }

  document.getElementById("forecastHumidValDay_5").textContent =
    data.list[28].main.humidity+ '%';
};
const renderForecast = (data) => {
  const url =
    baseURL +
    weather5DaysApiURL +
    data.coord.lat +
    "&lon=" +
    data.coord.lon +
    "&units=imperial&appid=" +
    appId;

  const forecast5DaysData = fetchAPI(url);
};

const generateWeatherForeCastList = function () {
  searchHistory.forEach(renderCityList);
};

const renderCityList = function (element) {
  var li = document.createElement("li");
  li.setAttribute("class", "item");
  li.data = element;
  ul.appendChild(li);
  li.textContent = element.name;
  console.log("LI Created " + element.name);
  renderCurrentWeatherTile(element);
};
// This arrangement can be altered based on how we want the date's format to appear.

const renderCurrentWeatherTile = (data) => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `(${month}/${day}/${year})`;
  document.getElementById("currentCityName").textContent = data.name;
  document.getElementById("currentData").textContent = currentDate;
  document.getElementById(
    "currentWeatherImg"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  document.getElementById("currentTempVal").textContent = data.main.temp + ' °F';
  const gustElement = document.getElementById("currentWindVal");
  if (data.wind.gust) {
    gustElement.textContent = data.wind.gust + ' MPH';
  } else {
    gustElement.textContent = "None";
  }

  document.getElementById("currentHumidVal").textContent = data.main.humidity + '%';
};
