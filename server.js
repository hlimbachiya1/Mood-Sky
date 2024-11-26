require("dotenv").config(); // Load environment variables from a .env file

// Import necessary modules (look at package files)
const express = require("express"); // Framework for building web applications
const app = express(); // Create an instance of an Express application

// Load Spotify API credentials from environment variables (VITE)
const SPOTIFY_CLIENT_ID = process.env["SPOTIFY_CLIENT_ID"];
const SPOTIFY_SECRET = process.env["SPOTIFY_CLIENT_SECRET"];

// Variables to store the cached Spotify access token and its expiration time
let cachedToken = null;
let tokenExpiration = null;

// Fetch a Spotify API access token using the client credentials flow.
// The token is cached to avoid unnecessary API calls/requests.
async function getToken() {
  // If a valid token is already cached, return it
  if (cachedToken && Date.now() < tokenExpiration) {
    return cachedToken;
  }

  // Request a new access token from Spotify using the client credentials flow
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }), // reqyest type
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // required content type
      Authorization:
        "Basic " +
        Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_SECRET).toString(
          "base64",
        ),
    },
  });
  // Parse the response and extract the access token and its expiration time
  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiration = Date.now() + data.expires_in * 1000; // Convert expiration time to milliseconds
  return data.access_token;
}

// Endpoint to fetch recommendations from spotify
app.get("/api/recommendations", async (req, res) => {
  const { genre } = req.query; // Extract the genre from the query parameters

  if (!genre) {
    // If the genre is not provided, return an error
    return res.status(400).json({ error: "Genre is required" });
  }

  try {
    // fetch a valid spotify access token
    const token = await getToken();

    // Make a request to the Spotify API for recommendations based on the genre
    const response = await fetch(
      `https://api.spotify.com/v1/recommendations?limit=5&seed_genres=${genre}`,
      {
        headers: { Authorization: `Bearer ${token}` }, // Include the access token in the request
      },
    );

    // handle the errors when the Spotify API requests fails
    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }

    // Parse (breakdown) the Spotify API response
    const data = await response.json();
    console.log("Tracks found!");

    // Send the list of recommended tracks to the client
    res.json(data.tracks);
  } catch (error) {
    //log error and return 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server, [specified default port = 3000]
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
