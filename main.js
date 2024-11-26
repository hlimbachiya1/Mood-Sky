// Select DOM elements for user interaction and display
const weatherButton = document.getElementById("get-weather");
const zipcodeInput = document.getElementById("zipcode");
const weatherInfoSection = document.getElementById("weather-info");
const temperatureElement = document.getElementById("temperature");
const conditionElement = document.getElementById("condition");
const songTilesElement = document.getElementById("song-tiles");

// Api endpoints
const openMeteoAPI = "https://geocoding-api.open-meteo.com/v1/search?name=";
const weatherAPI = "https://api.open-meteo.com/v1/forecast?";
const spotifyAPI = "https://api.spotify.com/v1/recommendations?limit=5&seed_genres=";

// Fetch weather data based on the provided zipcode
async function getWeatherData(zipcode) {
  try {
    const location = await getLocation(zipcode); // Get latitude and longitude from zipcode
    if (!location) return;

    const weatherData = await fetchWeather(location.latitude, location.longitude); // Fetch weather data
    const temperature = weatherData.temperature_2m.pop(); // Get the latest temperature
    const weatherCode = weatherData.weathercode.pop(); // Get the Latest weather code

    const weatherCondition = getWeatherCondition(weatherCode);

    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    conditionElement.textContent = `Condition: ${weatherCondition}`;

    weatherInfoSection.style.display = "block"; // Show the weather info section

    
    getSpotifySongs(weatherCondition); // Fetch and display Spotify songs based on weather condition
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Get geographic coordinates (latitude and longitude) using a zipcode
async function getLocation(zipcode) {
  const url = `${openMeteoAPI}${zipcode}&count=1&language=en&format=json`;
  const response = await fetch(url);
  const data = await response.json();

  // Validate the response and handle errors
  if (!data.results || !data.results[0]) {
    alert("Invalid Zipcode or location not found.");
    return null;
  }
  const { latitude, longitude } = data.results[0]; // Extract coordinates from the response
  return { latitude, longitude };
}

// Fetch weather data using the provided latitude and longitude
async function fetchWeather(latitude, longitude) {
  const url = `${weatherAPI}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode`;
  const response = await fetch(url);
  const data = await response.json();
  return data.hourly; // Return hourly weather data
}

// Map weather code to a readable weather condition
function getWeatherCondition(weatherCode) {
  const conditions = {
    0: 'Clear sky',
    1: 'Mainly clear, partly cloudy, and overcast',
    2: 'Mainly clear, partly cloudy, and overcast',
    3: 'Mainly clear, partly cloudy, and overcast',
    45: 'Fog and depositing rime fog',
    48: 'Fog and depositing rime fog',
    51: 'Drizzle: Light, moderate, and dense intensity',
    53: 'Drizzle: Light, moderate, and dense intensity',
    55: 'Drizzle: Light, moderate, and dense intensity',
    56: 'Freezing Drizzle: Light and dense intensity',
    57: 'Freezing Drizzle: Light and dense intensity',
    61: 'Rain: Slight, moderate, and heavy intensity',
    63: 'Rain: Slight, moderate, and heavy intensity',
    65: 'Rain: Slight, moderate, and heavy intensity',
    66: 'Freezing Rain: Light and heavy intensity',
    67: 'Freezing Rain: Light and heavy intensity',
    71: 'Snow fall: Slight, moderate, and heavy intensity',
    73: 'Snow fall: Slight, moderate, and heavy intensity',
    75: 'Snow fall: Slight, moderate, and heavy intensity',
    77: 'Snow grains',
    80: 'Rain showers: Slight, moderate, and violent',
    81: 'Rain showers: Slight, moderate, and violent',
    82: 'Rain showers: Slight, moderate, and violent',
    85: 'Snow showers: Slight and heavy',
    86: 'Snow showers: Slight and heavy',
    95: 'Thunderstorm: Slight or moderate',
    96: 'Thunderstorm with slight and heavy hail',
    99: 'Thunderstorm with slight and heavy hail'
    // Add other mappings as needed
  };
  
  // Return mapped condition or "Unknown" if not found
  return conditions[weatherCode] || "Unknown";
}

// Fetch Spotify songs based on the weather condition
async function getSpotifySongs(weatherCondition) {
  const moodMapping = {
    'Clear sky': 'chill',
    'Mainly clear, partly cloudy, and overcast': 'indie',
    'Fog and depositing rime fog': 'ambient',
    'Drizzle: Light, moderate, and dense intensity': 'acoustic',
    'Freezing Drizzle: Light and dense intensity': 'classical',
    'Rain: Slight, moderate, and heavy intensity': 'jazz',
    'Freezing Rain: Light and heavy intensity': 'blues',
    'Snow fall: Slight, moderate, and heavy intensity': 'classical',
    'Snow grains': 'folk',
    'Rain showers: Slight, moderate, and violent': 'pop',
    'Snow showers: Slight and heavy': 'instrumental',
    'Thunderstorm: Slight or moderate': 'rock',
    'Thunderstorm with slight and heavy hail': 'metal',
    'Unknown': 'electronic',
  };

  const genre = moodMapping[weatherCondition] || "ambient"; // Map weather to genre
  
  const response = await fetch(`/api/recommendations?genre=${genre}`); // Fetch song recommendations
  console.log(response);

  if (!response.ok) {
    console.error("Failed to fetch Spotify songs.");
    return;
  }

  const data = await response.json();
  displaySongs(data); // display recommended songs
}

// Display song recommendations in the UI
function displaySongs(songs) {
  songTilesElement.innerHTML = "";  //clear previous songs titles
  songs.forEach((song) => {
    const tile = document.createElement("div");
    tile.className = "song-tile";
    

    const songImage = document.createElement("img"); // Add album image
    songImage.src = song.album.images[0].url;

    const songTitle = document.createElement("p"); // Add song title
    songTitle.textContent = song.name;

    // Append elements to the song tile and display it
    tile.appendChild(songImage);
    tile.appendChild(songTitle);
    songTilesElement.appendChild(tile);
  });
}



// Add event listener to the "Get Weather" button
weatherButton.addEventListener("click", () => {
  const zipcode = zipcodeInput.value.trim(); // Get user-inputted zipcode
  if (!zipcode) {
    alert("Please enter a valid Zipcode.");
    return;
  }
  getWeatherData(zipcode); // Fetch weather data for the entered zipcode
});

