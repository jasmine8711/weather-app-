let appId = `85913e87a201cdcbb7985cea325b4137`;
let units = `metric`;
const imgbox = document.getElementById("imgbox");
const bg = document.querySelector(".bg");
const input = document.querySelector("#searchInput");
const searchBox = document.querySelector(".searchBox");
const cityHeader = document.querySelector("#cityHeader");
const temperature = document.querySelector("#temperature");
const weatherText = document.querySelector("#weatherText");
const weatherContainer = document.getElementById("weatherContainer");
const hrs = document.querySelectorAll(".hr");
const fiveDays = document.querySelector(".fivedays");
const dateInfo = document.querySelector("#dateInfo");
const table = document.getElementById("table");
const min = document.getElementById("min").children;
const max = document.getElementById("max").children;
const icon = document.getElementById("icon").children;
const week = document.getElementById("week");
const date = document.getElementById("date");
const time = document.getElementById("time");
const description = document.getElementById("description");

console.log(min);

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
  //console.log(resultFromServer.list[0].main.temp_max);
  const temp = Math.floor(resultFromServer.list[0].main.temp);
  const descriptionAPI = resultFromServer.list[0].weather[0].description;
  description.innerText = ` ${descriptionAPI}`;

  console.log(resultFromServer.list[0].weather[0].main);

  switch (resultFromServer.list[0].weather[0].main) {
    case "Clouds":
      imgbox.style.backgroundImage = 'url("cloud.jpg")';
      weatherText.innerText = "多云";
      break;
    case "Snow":
      imgbox.style.backgroundImage = 'url("snow.jpg")';
      weatherText.innerText = "大雪";
      break;
    case "Drizzle":
      imgbox.style.backgroundImage = 'url("littlerain.jpeg")';
      weatherText.innerText = "细雨";
      break;
    case "Rain":
      imgbox.style.backgroundImage = 'url("rain.jpg")';
      weatherText.textContent = "雨水";
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
      imgbox.style.backgroundImage = 'url("mist2.jpg")';
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
  //console.log(listArray);
  const allDays = chunk(listArray, 8);

  for (let j = 0; j < 5; j++) {
    (function(i) {
      let oneDay = allDays[i];
      const iconText = oneDay[0].weather[0].icon;
      icon[
        i
      ].style.backgroundImage = `url('http://openweathermap.org/img/wn/${iconText}@2x.png')`;
    })(j);
  }

  let oneDayMinArray = [];
  let oneDayMaxArray = [];
  function findMin(i) {
    let oneDay = allDays[i];
    oneDay.forEach(x => {
      oneDayMinArray.push(x.main.temp_min);
    });
    return Math.floor(Math.min.apply(null, oneDayMinArray));
  }
  function findMax(i) {
    let oneDay = allDays[i];
    oneDay.forEach(x => {
      oneDayMaxArray.push(x.main.temp_max);
    });
    return Math.floor(Math.max.apply(null, oneDayMaxArray));
  }

  const daysminarray = [];
  const daysmaxarray = [];
  for (let i = 0; i < 5; i++) {
    daysminarray.push(findMin(i));
    min[i].innerHTML = `&darr; ${daysminarray[i]}&deg;`;
  }
  for (let i = 0; i < 5; i++) {
    daysmaxarray.push(findMax(i));
    max[i].innerHTML = `&uarr; ${daysmaxarray[i]}&deg;`;
  }
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
week.style.fontWeight = "bolder";
/* switch (w) {
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
} */
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
//console.log(w);
let y = w;
for (let x = 0; x < 5; x++) {
  (function() {
    y++;
    if (y <= 7) {
      tableweekdays[x].innerText = weekContext[y - 1];
    } else if (y > 7 && y < 11) {
      tableweekdays[x].innerText = weekContext[y - 8];
    }
  })();
}

//put icon in table
