const API_KEY = '217d1274250f47cea4c14638243011';
const CITY = 'Buffalo';

// Temperature ranges (in Fahrenheit)
const TEMP_RANGES = {
  freezing: 32,
  cold: 45,
  cool: 60,
  mild: 75,
  warm: 85
};

// Get temperature-appropriate icon
function getTemperatureIcon(temp) {
  if (temp <= TEMP_RANGES.freezing) return '🥶';
  if (temp <= TEMP_RANGES.cold) return '❄️';
  if (temp <= TEMP_RANGES.cool) return '😌';
  if (temp <= TEMP_RANGES.mild) return '😊';
  if (temp <= TEMP_RANGES.warm) return '😅';
  return '🥵';
}

// Weather condition icons
const weatherIcons = {
  1000: '☀️', // Sunny/Clear
  1003: '🌤️', // Partly cloudy
  1006: '☁️', // Cloudy
  1009: '☁️', // Overcast
  1030: '🌫️', // Mist
  1063: '🌦️', // Patchy rain
  1066: '🌨️', // Patchy snow
  1069: '🌧️', // Patchy sleet
  1072: '🌧️', // Patchy freezing drizzle
  1087: '⛈️', // Thundery outbreaks
  1114: '🌨️', // Blowing snow
  1117: '🌨️', // Blizzard
  1135: '🌫️', // Fog
  1147: '🌫️', // Freezing fog
  1150: '🌧️', // Patchy light drizzle
  1153: '🌧️', // Light drizzle
  1168: '🌧️', // Freezing drizzle
  1171: '🌧️', // Heavy freezing drizzle
  1180: '🌧️', // Patchy light rain
  1183: '🌧️', // Light rain
  1186: '🌧️', // Moderate rain
  1189: '🌧️', // Moderate rain
  1192: '🌧️', // Heavy rain
  1195: '🌧️', // Heavy rain
  1198: '🌧️', // Light freezing rain
  1201: '🌧️', // Moderate/heavy freezing rain
  1204: '🌨️', // Light sleet
  1207: '🌨️', // Moderate/heavy sleet
  1210: '🌨️', // Patchy light snow
  1213: '🌨️', // Light snow
  1216: '🌨️', // Patchy moderate snow
  1219: '🌨️', // Moderate snow
  1222: '🌨️', // Patchy heavy snow
  1225: '🌨️', // Heavy snow
  1237: '🌨️', // Ice pellets
  1240: '🌧️', // Light rain shower
  1243: '🌧️', // Moderate/heavy rain shower
  1246: '🌧️', // Torrential rain shower
  1249: '🌨️', // Light sleet showers
  1252: '🌨️', // Moderate/heavy sleet showers
  1255: '🌨️', // Light snow showers
  1258: '🌨️', // Moderate/heavy snow showers
  1261: '🌨️', // Light showers of ice pellets
  1264: '🌨️', // Moderate/heavy showers of ice pellets
  1273: '⛈️', // Patchy light rain with thunder
  1276: '⛈️', // Moderate/heavy rain with thunder
  1279: '🌩️', // Patchy light snow with thunder
  1282: '🌩️', // Moderate/heavy snow with thunder
};

function getFeelsLikeDescription(actual, feelsLike) {
  const diff = feelsLike - actual;
  if (Math.abs(diff) < 3) return '';
  if (diff > 0) return `Feels like ${Math.round(feelsLike)}°F`;
  return `Feels like ${Math.round(feelsLike)}°F`;
}

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`
    );
    const data = await response.json();
    
    const weatherInfo = document.getElementById('weather');
    const tempElement = weatherInfo.querySelector('.temp');
    const conditionElement = weatherInfo.querySelector('.condition');
    const iconElement = weatherInfo.querySelector('.weather-icon');
    const feelsLikeElement = weatherInfo.querySelector('.feels-like');
    
    const temp = Math.round(data.current.temp_f);
    const feelsLike = data.current.feelslike_f;
    const condition = data.current.condition.text;
    const conditionCode = data.current.condition.code;
    
    // Combine temperature icon with weather condition icon
    const tempIcon = getTemperatureIcon(temp);
    const weatherIcon = weatherIcons[conditionCode] || '🌡️';
    
    tempElement.textContent = `${temp}°F`;
    conditionElement.textContent = condition;
    iconElement.textContent = `${tempIcon} ${weatherIcon}`;
    iconElement.setAttribute('title', condition);
    
    const feelsLikeText = getFeelsLikeDescription(temp, feelsLike);
    feelsLikeElement.textContent = feelsLikeText;
    feelsLikeElement.style.display = feelsLikeText ? 'block' : 'none';
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

// Fetch weather immediately and update every 10 minutes
getWeather();
setInterval(getWeather, 600000);
