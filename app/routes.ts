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
  path: "routes/album",
  id: "album",
  index: true,
} as RouteConfigEntry;

const albums = {
  file: "routes/albums.tsx",
  path: "routes/albums",
  id: "albums",
} as RouteConfigEntry;

const artists = {
  file: "routes/artists.tsx",
  path: "routes/artists",
  id: "artists",
} as RouteConfigEntry;

const songs = {
  file: "routes/songs.tsx",
  path: "routes/songs",
  id: "songs",
} as RouteConfigEntry;

const explore = {
  file: "routes/explore.tsx",
  path: "routes/explore",
  id: "explore",
} as RouteConfigEntry;

const upload = {
  file: "routes/upload.tsx",
  path: "routes/upload",
  id: "upload",
} as RouteConfigEntry;

export default [
  home,
  album,
  albums,
  artists,
  songs,
  explore,
  upload,
] satisfies RouteConfig;
