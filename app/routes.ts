import {
  type RouteConfig,
  type RouteConfigEntry,
} from "@react-router/dev/routes";

const home = {
  file: "routes/home.tsx",
  id: "home",
  index: true,
} as RouteConfigEntry;

const album = {
  file: "routes/album.tsx",
  path: "album",
  id: "album",
  index: true,
} as RouteConfigEntry;

const albums = {
  file: "routes/albums.tsx",
  path: "albums",
  id: "albums",
} as RouteConfigEntry;

const artists = {
  file: "routes/artists.tsx",
  path: "artists",
  id: "artists",
} as RouteConfigEntry;

const songs = {
  file: "routes/songs.tsx",
  path: "songs",
  id: "songs",
} as RouteConfigEntry;

const explore = {
  file: "routes/explore.tsx",
  path: "explore",
  id: "explore",
} as RouteConfigEntry;

const upload = {
  file: "routes/upload.tsx",
  path: "upload",
  id: "upload",
} as RouteConfigEntry;

const playlists = {
  file: "routes/playlists.tsx",
  path: "playlists",
  id: "playlists",
} as RouteConfigEntry;

export default [
  home,
  album,
  albums,
  artists,
  songs,
  explore,
  upload,
  playlists,
] satisfies RouteConfig;
