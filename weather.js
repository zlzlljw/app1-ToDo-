const weather = document.querySelector(".js-weather");
const locationPoint = document.querySelector(".js-place");
const API_KEY = "2ec7aa04c7f1f66c805d74e2e63fd166";
const COORDS = "coords";



function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}`;
        locationPoint.innerText = `${place}`;
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
       latitude,
       longitude
   };
   saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }else {
        const parsedCoords = JSON.parse(loadedCords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
        
    }
}

function init(){
    loadCoords();
}

init();