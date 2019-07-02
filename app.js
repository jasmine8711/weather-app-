let appId = `85913e87a201cdcbb7985cea325b4137`;
let units = `metric`;

async function searchWeather(searchTerm) {
  /*   fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    }); */

  const response = await axios.get(
    "http://api.openweathermap.org/data/2.5/forecast",
    {
      params: {
        q: searchTerm,
        APPID: appId,
        units: units
      }
    }
  );
  let result = await response.data;
  console.log(result);
  init(result);
}
const imgbox = document.getElementById("imgbox");
const bg = document.querySelector(".bg");
const input = document.querySelector("#searchInput");
const searchBox = document.querySelector(".searchBox");
const cityHeader = document.querySelector("#cityHeader");
const temperature = document.querySelector("#temperature");
const weatherText = document.querySelector("#weaterText");

const dateInfo = document.querySelector("#dateInfo");

function init(resultFromServer) {
  console.log(resultFromServer.list[0].main);
  const temp = Math.floor(resultFromServer.list[0].main.temp);
  switch (resultFromServer.list[0].main) {
    case "Clouds":
      imgbox.style.backgroundImage = 'url("cloud.jpg")';
      weatherText.innerText = "多云";
      break;
    case "Snow":
      imgbox.style.backgroundImage = 'url("snow.jpg")';
      weatherText.innerText = "大雪";
      break;
    case "Drizzle":
      imgbox.style.backgroundImage = 'url("rain.jpg")';
      weatherText.innerText = "细雨";
      break;
    case "Rain":
      imgbox.style.backgroundImage = 'url("rain.jpg")';
      weatherText.innerText = "雨水";
      break;
    case "Thunderstorm":
      imgbox.style.backgroundImage = 'url("light.jpg")';
      weatherText.innerText = "雷电";
      break;
    case "Mist":
      imgbox.style.backgroundImage = 'url("mist.jpg")';
      weatherText.innerText = "雾气";
      break;

    case "Fog":
      imgbox.style.backgroundImage = 'url("mist.jpg")';
      weatherText.innerText = "大雾";
    case "Smoke":
      weatherText.innerText = "雾霾";
      imgbox.style.backgroundImage = 'url("mist.jpg")';
      break;
    case "clear":
      imgbox.style.backgroundImage = 'url("clear.jpg")';
      weatherText.innerText = "晴天";
      cityHeader.innerText = input.value;
  }
  temperature.innerHTML = `${temp}	
  &#176;`;
}

console.log(searchBox);
document.getElementById("searchBtn").addEventListener("click", showWeather);
input.addEventListener("keyup", showWeather);

function showWeather(e) {
  if (input.value == "") {
    alert("please enter your city!");
    return;
  }
  if (e.keyCode == 13) {
    bg.classList.add("hidden");
    searchBox.classList.add("hidden");
    cityHeader.classList.remove("hidden");
    imgbox.classList.remove("hidden");
    dateInfo.classList.remove("hidden");
    cityHeader.innerText = input.value;
    let searchTerm = input.value;
    if (searchTerm) {
      searchWeather(searchTerm);
    }
  }
}

const week = document.getElementById("week");
const date = document.getElementById("date");
const time = document.getElementById("time");

let d = new Date();
let w = d.getDay(); //0-6 week
let h = d.getHours(); // 0 - 23
let m = d.getMinutes(); // 0 - 59

console.log(h);
switch (w) {
  case 1:
    week.innerText = "Mon. ";
    break;
  case 2:
    week.innerText = "Tue. ";
    console.log("nihao");
    break;
  case 3:
    week.innerText = "Wed. ";

    break;
  case 4:
    week.innerText = "Thu. ";
    break;
  case 5:
    week.innerText = "Fri. ";
    break;
  case 6:
    week.innerText = "Sat. ";
    break;
  case 0:
    week.innerText = "Sun. ";
    break;
}
setInterval(getCurrentTime, 1000);
function getCurrentTime() {
  if (h < 10 && m < 10) {
    time.innerText = ` 0${h}:0${m} `;
  } else if (h < 10 && m >= 10) {
    time.innerText = ` 0${h}:${m} `;
  } else if (h > 9 && m <= 9) {
    time.innerText = ` ${h}:0${m} `;
  } else {
    time.innerText = ` ${h}:${m} `;
  }
}

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var n = month[d.getMonth()];
var today = d.getDate();
console.log(today);
date.innerText = ` ${n} ${today} `;
