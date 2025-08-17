import express from "express";
import { fileURLToPath } from "url";
import axios from "axios";
import path from "path";
import https from "https";
import http from "http";
import * as fs from "fs";
 

const AUDIO_FILES_ENDPOINT =
  process.env.AUDIO_FILES_ENDPOINT ||
  "https://ec2-34-244-32-40.eu-west-1.compute.amazonaws.com/api/upload/files";

const IMG_FILES_ENDPOINT =
  process.env.IMG_FILES_ENDPOINT ||
  "https://ec2-34-244-32-40.eu-west-1.compute.amazonaws.com/api/upload/files";

const PORT = process.env.PORT || 3000;
const STOCK_PHOTO = "https://picsum.photos/400"; // Placeholde photo URL

// File paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDir = path.resolve("./server/reactServer/client");
const publicDir = path.resolve("./public");
const staticDataFilePath = path.join(publicDir, "/staticData/allData.json");

// HTTP client setup
const isHttps = GRAPHQL_ENDPOINT.startsWith("https://");
const agent = isHttps
  ? new https.Agent({ rejectUnauthorized: false })
  : new http.Agent();
const instance = axios.create({
  httpsAgent: isHttps ? agent : undefined,
  httpAgent: !isHttps ? agent : undefined,
});

// GraphQL queries
const ALBUMS_QUERY = `{
  allAlbums {
    id albumTitle albumCover label labelLogo bandName artistPhoto
    artistMain instrument otherArtistPlaying otherInstrument
    yearRecorded yearReleased songTitle composer songFile createdAt
  }
}`;

const TRACKS_QUERY = `{
  allTracks {
    id uuid songTitle artistMain bandName albumTitle yearRecorded
    yearReleased instrument otherArtistPlaying otherInstrument
    songFile composer label createdAt albumCover
  }
}`;

const ARTISTS_QUERY = `{
  allArtists {
    id uuid songTitle artistMain bandName albumTitle yearRecorded
    yearReleased instrument otherArtistPlaying otherInstrument
    songFile composer label createdAt albumCover
  }
}`;

// Utility functions
function transformAudioUrl(url) {
  if (!url) return url;

  // Extract filename from URL
  const filename = url.split("/").pop();
  if (!filename) return url;

  // Create new URL with AUDIO_FILES_ENDPOINT
  return `${AUDIO_FILES_ENDPOINT.replace(/\/$/, "")}/${filename}`;
}

function transformImageUrl(url) {
  if (!url || url === STOCK_PHOTO) return url;

  // Extract filename from URL
  const filename = url.split("/").pop();
  if (!filename) return url;

  // Create new URL with IMG_FILES_ENDPOINT
  return `${IMG_FILES_ENDPOINT.replace(/\/$/, "")}/${filename}`;
}

function getRandomItems(array, count) {
  if (array.length <= count) {
    return array;
  }

  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function transformAlbumData(albums, transformedTracks) {
  return albums.map((album) => ({
    id: album.id,
    imageSrc: transformImageUrl(album.albumCover || STOCK_PHOTO),
    title: album.albumTitle,
    subTitle: album.yearReleased,
    artist: album.artistMain,
    songs: transformedTracks
      .filter(
        (track) =>
          track.album === album.albumTitle && track.artist === album.artistMain,
      )
      .map((track) => track.id),
  }));
}

function transformTrackData(tracks) {
  return tracks
    .filter((track) => track.songFile)
    .map((track) => ({
      id: track.id,
      index: track.id,
      title: track.songTitle,
      time: 185,
      albumId: track.albumTitle,
      audioUrl: transformAudioUrl(track.songFile),
      imageSrc: transformImageUrl(track.albumCover || STOCK_PHOTO),
      artist: track.artistMain,
      album: track.albumTitle,
      year: track.yearReleased,
    }));
}

function transformArtistData(artists, transformedAlbums) {
  const albumsByArtist = transformedAlbums.reduce((acc, album) => {
    acc[album.artist] = (acc[album.artist] || 0) + 1;
    return acc;
  }, {});

  return artists
    .filter((artist) => artist.artistMain)
    .map((artist, index) => ({
      id: artist.id || index + 1,
      index: index + 1,
      imageSrc: transformImageUrl(artist.albumCover) || STOCK_PHOTO,
      artistName: artist.artistMain,
      albumsCount: String(albumsByArtist[artist.artistMain] || 0),
    }));
}

// GraphQL API functions
async function fetchGraphQLData(query) {
  try {
    const response = await instance.post(GRAPHQL_ENDPOINT, { query });
    return response.data.data;
  } catch (error) {
    console.error("GraphQL request failed:", error.message);
    throw error;
  }
}

async function fetchAlbums() {
  const data = await fetchGraphQLData(ALBUMS_QUERY);
  return data.allAlbums || [];
}

async function fetchTracks() {
  const data = await fetchGraphQLData(TRACKS_QUERY);
  return data.allTracks || [];
}

async function fetchArtists() {
  const data = await fetchGraphQLData(ARTISTS_QUERY);
  return data.allArtists || [];
}

// File operations
function loadStaticData() {
  console.log("Loading mock data from:", staticDataFilePath);
  return new Promise((resolve, reject) => {
    fs.readFile(staticDataFilePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading mock data file:", err);
        console.log("Proceeding without mock data");
        resolve({});
        return;
      }
      try {
        const parsedData = JSON.parse(data);
        console.log("Mock data loaded successfully");
        resolve(parsedData);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        console.log("Proceeding with empty mock data");
        resolve({});
      }
    });
  });
}

// Main application logic
async function initializeApp() {
  try {
    console.log("Initializing application...");
    const app = express();

    // API endpoints
    app.get("/staticData/allData.json", async (req, res) => {
      try {
        console.log("GET /staticData/allData.json - Request received");

        console.log("Loading data from multiple sources...");

        // Load data
        const [allData, albumsData, tracksData, artistsData] =
          await Promise.all([
            loadStaticData(),
            fetchAlbums(),
            fetchTracks(),
            fetchArtists(),
          ]);

        console.log(`Loaded ${albumsData.length} albums from GraphQL`);
        console.log(`Loaded ${tracksData.length} tracks from GraphQL`);
        console.log(`Loaded ${artistsData.length} artists from GraphQL`);

        // Transform data
        console.log("Transforming data...");
        const transformedTracks = transformTrackData(tracksData);
        const transformedAlbums = transformAlbumData(
          albumsData,
          transformedTracks,
        );
        const transformedArtists = transformArtistData(
          albumsData,
          transformedAlbums,
        );

        console.log(
          `Transformed ${transformedAlbums.length} albums with covers`,
        );
        console.log(
          `Transformed ${transformedTracks.length} tracks with files and covers`,
        );
        console.log(
          `Transformed ${transformedArtists.length} artists with photos`,
        );

        const response = {
          albums: {
            featured: getRandomItems(transformedAlbums, 125),
            newReleases: getRandomItems(transformedAlbums, 125),
            recommended: getRandomItems(transformedAlbums, 125),
          },
          artists: getRandomItems(transformedArtists, 125),
          songs: getRandomItems(transformedTracks, 100000),
          sidebar: allData.sidebar,
        };

        console.log(
          `Sending response with ${response.albums?.newReleases?.length || 0} albums, ${response.artists?.length || 0} artists and ${response.songs?.length || 0} songs`,
        );
        res.json(response);
      } catch (error) {
        console.error(
          "Error handling /staticData/allData.json request:",
          error,
        );
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Static file serving
    console.log("Setting up static file serving from:", clientDir);
    app.use(express.static(clientDir));

    // Serve static assets from app directory
    const appDir = path.resolve("./app");
    console.log("Setting up app static file serving from:", appDir);
    app.use("/app", express.static(appDir));

    // Serve static files from the public directory
    console.log("Setting up public file serving from:", publicDir);
    app.use(express.static(publicDir));

    app.get("/", (req, res) => {
      console.log("GET / - Serving index.html");
      res.sendFile(path.join(clientDir, "index.html"));
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log(`📁 Serving static files from: ${clientDir}`);
      console.log(`📊 GraphQL endpoint: ${GRAPHQL_ENDPOINT}`);
      console.log(`🎵 Audio files endpoint: ${AUDIO_FILES_ENDPOINT}`);
      console.log(`🖼️  Image files endpoint: ${IMG_FILES_ENDPOINT}`);
    });
  } catch (error) {
    console.error("❌ Failed to initialize application:", error);
    process.exit(1);
  }
}

// Start the application
initializeApp();