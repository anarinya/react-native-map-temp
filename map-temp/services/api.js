import { API_KEY } from '../config/config';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}`;

const kelvinToFahrenheit = (k) => {
  return Math.round((k - 273.15) * 1.8 + 32) + ' ˚F';
};

module.exports = (latitude, longitude) => {
  const url = `${ROOT_URL}&lat=${latitude}&lon=${longitude}`;

  return fetch(url).then((response) => {
    return response.json();
  }).then((json) => {
    return {
      city: json.name,
      temperature: kelvinToFahrenheit(json.main.temp),
      description: json.weather[0].description
    };
  }).catch(err => console.log(err));
};