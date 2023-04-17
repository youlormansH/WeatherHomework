var Cityform = document.getElementById("city-search");
var inputCity = document.getElementById("city");
var key = "431dd6371869dd989989366774b6e8c7";
var dataEl = document.getElementById("name");
var tempEl = document.getElementById("temp");
var humidEl = document.getElementById("humid");
var windEl = document.getElementById("wind");
var futureEl = document.getElementById("future-w");
var dataBack = document.getElementById("search-history");
// var searchHistory = JSON.parse(localStorage.getItem("history")) || {};
var containerEl = document.getElementById("container");
var clearEl = document.getElementById("clear-history")


function showMeWeatherData(city) {
    console.log(city);
    fetch('https://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q='+city+'&cnt=6&units=imperial')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);  

       console.log(data.city.name); 
    console.log(data.list[0].humidity); 
    
    var currentDate = new Date().toLocaleDateString();
    var iconUrl = 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png';
    dataEl.innerHTML = '' + data.city.name + ' (' + currentDate + ')<img src="' + iconUrl + '">';
    humidEl.textContent = 'Humidity: ' + data.list[0].humidity + '%';
    tempEl.textContent = 'Temperature: ' + data.list[0].temp.day + '°F';
    windEl.textContent = 'wind:' + data.list[0].speed + 'MPH';  
    document.getElementById("future-header").textContent = "5 Day Forecast: "
    futureEl.innerHTML = "";
    for (var i = 0; i < 5; i++) {
      var col = document.createElement("div");
      col.setAttribute("class","col");
      var card = document.createElement("div");
      card.setAttribute("class","card" );
      var cardbody = document.createElement("div");
      cardbody.setAttribute("class","card-body");
      // Create a new Date object and format it to your desired string
  var currentDate = new Date(Date.now() + (i * 24 * 60 * 60 * 1000)).toLocaleDateString();
  var iconUrl = 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';

  // Create the HTML for the forecast card
  var cardHtml = `
    <h6 class="card-title">${currentDate}</h6>
    <img src="${iconUrl}">
    <p class="card-text">Temperature: ${data.list[i].temp.day}°F</p>
    <p class="card-text">Humidity: ${data.list[i].humidity}%</p>
    <p class="card-text">wind: ${data.list[i].speed}</p>
  `;
  cardbody.innerHTML = cardHtml;
  card.appendChild(cardbody);
  col.appendChild(card);
  futureEl.appendChild(col);   
    }
  });
  
}

function saveSearch(city){
const searchhistory = window.localStorage.getItem("history") ? JSON.parse(window.localStorage.getItem("history")) : []
!searchhistory.includes(city.toLowerCase()) && searchhistory.push(city.toLowerCase()) 
window.localStorage.setItem("history",JSON.stringify(searchhistory))
}

function displayhistory(){
  dataBack.innerHTML = ""
let storageitem = JSON.parse( window.localStorage.getItem("history"))
if (storageitem){
for (let i = 0; i < storageitem.length; i++) {
  const element = storageitem[i];
  let listitem = document.createElement("li")
  listitem.classList.add("list-group-item","history-city", "cursor-pointer")
  listitem.textContent = element
  dataBack.append(listitem)
}
}
}
displayhistory()

// // containerEl.addEventListener("click", function(e){
// //   console.log(e.target);
// //   var city = e.target.getAttrinute(data-city);
// //   showMeWeatherData(city)
// })
document.getElementById("city-search").addEventListener("click", function(event){
  event.preventDefault()
  let city = document.getElementById("city").value;
  saveSearch(city);
  // get the value from the form
  showMeWeatherData(city)
  displayhistory()

})

document.addEventListener("click",  function(event){
  event.preventDefault()
  if (event.target && event.target.matches(".history-city")) {
    
    showMeWeatherData(event.target.textContent) 
  }
})
document.getElementById("clear-history").addEventListener("click", function(event){
  event.preventDefault()
  localStorage.removeItem("history")
  location.reload()
})


