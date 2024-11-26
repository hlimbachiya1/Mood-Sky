<<<<<<< HEAD
// Select DOM elements for user interaction and display
=======
>>>>>>> feb2a0b (Initial commit)
const weatherButton = document.getElementById("get-weather");
const zipcodeInput = document.getElementById("zipcode");
const weatherInfoSection = document.getElementById("weather-info");
const temperatureElement = document.getElementById("temperature");
const conditionElement = document.getElementById("condition");
const songTilesElement = document.getElementById("song-tiles");

<<<<<<< HEAD
// Api endpoints
=======
>>>>>>> feb2a0b (Initial commit)
const openMeteoAPI = "https://geocoding-api.open-meteo.com/v1/search?name=";
const weatherAPI = "https://api.open-meteo.com/v1/forecast?";
const spotifyAPI = "https://api.spotify.com/v1/recommendations?limit=5&seed_genres=";

<<<<<<< HEAD
// Fetch weather data based on the provided zipcode
async function getWeatherData(zipcode) {
  try {
    const location = await getLocation(zipcode); // Get latitude and longitude from zipcode
    if (!location) return;

    const weatherData = await fetchWeather(location.latitude, location.longitude); // Fetch weather data
    const temperature = weatherData.temperature_2m.pop(); // Get the latest temperature
    const weatherCode = weatherData.weathercode.pop(); // Get the Latest weather code
=======
async function getWeatherData(zipcode) {
  try {
    const location = await getLocation(zipcode);
    if (!location) return;

    const weatherData = await fetchWeather(location.latitude, location.longitude);
    const temperature = weatherData.temperature_2m.pop();
    const weatherCode = weatherData.weathercode.pop();
>>>>>>> feb2a0b (Initial commit)

    const weatherCondition = getWeatherCondition(weatherCode);

    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    conditionElement.textContent = `Condition: ${weatherCondition}`;

<<<<<<< HEAD
    weatherInfoSection.style.display = "block"; // Show the weather info section

    
    getSpotifySongs(weatherCondition); // Fetch and display Spotify songs based on weather condition
=======
    weatherInfoSection.style.display = "block";
    getSpotifySongs(weatherCondition);
>>>>>>> feb2a0b (Initial commit)
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

<<<<<<< HEAD
// Get geographic coordinates (latitude and longitude) using a zipcode
=======
>>>>>>> feb2a0b (Initial commit)
async function getLocation(zipcode) {
  const url = `${openMeteoAPI}${zipcode}&count=1&language=en&format=json`;
  const response = await fetch(url);
  const data = await response.json();
<<<<<<< HEAD

  // Validate the response and handle errors
=======
>>>>>>> feb2a0b (Initial commit)
  if (!data.results || !data.results[0]) {
    alert("Invalid Zipcode or location not found.");
    return null;
  }
<<<<<<< HEAD
  const { latitude, longitude } = data.results[0]; // Extract coordinates from the response
  return { latitude, longitude };
}

// Fetch weather data using the provided latitude and longitude
=======
  const { latitude, longitude } = data.results[0];
  return { latitude, longitude };
}

>>>>>>> feb2a0b (Initial commit)
async function fetchWeather(latitude, longitude) {
  const url = `${weatherAPI}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode`;
  const response = await fetch(url);
  const data = await response.json();
<<<<<<< HEAD
  return data.hourly; // Return hourly weather data
}

// Map weather code to a readable weather condition
=======
  return data.hourly;
}

>>>>>>> feb2a0b (Initial commit)
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
<<<<<<< HEAD
  
  // Return mapped condition or "Unknown" if not found
  return conditions[weatherCode] || "Unknown";
}

// Fetch Spotify songs based on the weather condition
=======
  return conditions[weatherCode] || "Unknown";
}


>>>>>>> feb2a0b (Initial commit)
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

<<<<<<< HEAD
  const genre = moodMapping[weatherCondition] || "ambient"; // Map weather to genre
  
  const response = await fetch(`/api/recommendations?genre=${genre}`); // Fetch song recommendations
=======
  const genre = moodMapping[weatherCondition] || "ambient";
  //const url = `${spotifyAPI}${genre}`;
  //const token = 
  //const response = await fetch(url, {
  //  headers: {
  //    Authorization: `Bearer ${token}`,
  //  },
  //});
  const response = await fetch(`/api/recommendations?genre=${genre}`);
>>>>>>> feb2a0b (Initial commit)
  console.log(response);

  if (!response.ok) {
    console.error("Failed to fetch Spotify songs.");
    return;
  }

  const data = await response.json();
<<<<<<< HEAD
  displaySongs(data); // display recommended songs
}

// Display song recommendations in the UI
function displaySongs(songs) {
  songTilesElement.innerHTML = "";  //clear previous songs titles
=======
  displaySongs(data);
}


function displaySongs(songs) {
  songTilesElement.innerHTML = "";  //clear previous songs
>>>>>>> feb2a0b (Initial commit)
  songs.forEach((song) => {
    const tile = document.createElement("div");
    tile.className = "song-tile";
    

<<<<<<< HEAD
    const songImage = document.createElement("img"); // Add album image
    songImage.src = song.album.images[0].url;

    const songTitle = document.createElement("p"); // Add song title
    songTitle.textContent = song.name;

    // Append elements to the song tile and display it
=======
    const songImage = document.createElement("img");
    songImage.src = song.album.images[0].url;

    const songTitle = document.createElement("p");
    songTitle.textContent = song.name;

>>>>>>> feb2a0b (Initial commit)
    tile.appendChild(songImage);
    tile.appendChild(songTitle);
    songTilesElement.appendChild(tile);
  });
}

<<<<<<< HEAD


// Add event listener to the "Get Weather" button
weatherButton.addEventListener("click", () => {
  const zipcode = zipcodeInput.value.trim(); // Get user-inputted zipcode
=======
weatherButton.addEventListener("click", () => {
  const zipcode = zipcodeInput.value.trim();
>>>>>>> feb2a0b (Initial commit)
  if (!zipcode) {
    alert("Please enter a valid Zipcode.");
    return;
  }
<<<<<<< HEAD
  getWeatherData(zipcode); // Fetch weather data for the entered zipcode
});

=======
  getWeatherData(zipcode);
});

//const clientId = //import.meta.env.VITE_SPOTIFY_CLIENT_ID;
//const clientSecret = //import.meta.env.VITE_SPOTIFY_SECRET;


/*async function fetchSpotifyAccessToken() {
  //const clientId = process.env.SPOTIFY_CLIENT_ID;
  //const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenUrl = "https://accounts.spotify.com/api/token";

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    console.error("Failed to fetch Spotify access token.");
    return null;
  }

  const data = await response.json();
  return data.access_token;
}*/
>>>>>>> feb2a0b (Initial commit)
