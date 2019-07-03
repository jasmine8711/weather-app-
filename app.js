let appId = `85913e87a201cdcbb7985cea325b4137`;
let units = `metric`;
const imgbox = document.getElementById("imgbox");
const bg = document.querySelector(".bg");
const input = document.querySelector("#searchInput");
const searchBox = document.querySelector(".searchBox");
const cityHeader = document.querySelector("#cityHeader");
const temperature = document.querySelector("#temperature");
const weatherText = document.querySelector("#weaterText");
const weatherContainer = document.getElementById("weatherContainer");
const hrs = document.querySelectorAll(".hr");
const fiveDays = document.querySelector(".fivedays");
const dateInfo = document.querySelector("#dateInfo");
const table = document.getElementById("table");

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
  init(result);
}

function init(resultFromServer) {
  console.log(resultFromServer.list[0].main.temp_max);
  const temp = Math.floor(resultFromServer.list[0].main.temp);
  console.log(resultFromServer.city.name);

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
  cityHeader.innerText = resultFromServer.city.name;
  //max and min
  const listArray = resultFromServer.list;
  console.log(listArray);

  // console.log(dayTemps[0][0].main.temp_min);

  const dayMins = [];
  dayTemps[0].forEach(x => {
    dayMins.push(x.main.temp_min);
  });
  const dayMin = Math.min(parseInt(dayMins));
  console.log(dayMin);
}

function chunk(array, size) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
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
    hrs.forEach(x => {
      x.classList.remove("hidden");
    });
    weatherContainer.classList.remove("hidden");
    fiveDays.classList.remove("hidden");
    let searchTerm = input.value;
    if (searchTerm) {
      searchWeather(searchTerm);
    }
  }
}

//time
const week = document.getElementById("week");
const date = document.getElementById("date");
const time = document.getElementById("time");

let d = new Date();
let w = d.getDay(); //0-6 week
let h = d.getHours(); // 0 - 23
let m = d.getMinutes(); // 0 - 59
const weekContext = [
  "Sun.",
  "Mon.",
  "Tue. ",
  "Wed. ",
  "Thu. ",
  "Fri. ",
  "Sat. "
];
switch (w) {
  case 1:
    week.innerText = weekContext[1];
    break;
  case 2:
    week.innerText = weekContext[2];
    break;
  case 3:
    week.innerText = weekContext[3];

    break;
  case 4:
    week.innerText = weekContext[4];
    break;
  case 5:
    week.innerText = weekContext[5];
    break;
  case 6:
    week.innerText = weekContext[6];
    break;
  case 0:
    week.innerText = weekContext[0];
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

date.innerText = ` ${n} ${today} `;

//table
//put weeks in table
const tableweekdays = document.getElementById("tableweek").children;
console.log(w);

for (let x = 0; x < 5; x++) {
  (function() {
    let y = w;
    w++;
    if (y > 6) {
      y = 0;
    }
    tableweekdays[x].innerText = weekContext[y];
  })();
}
//put icon in table
