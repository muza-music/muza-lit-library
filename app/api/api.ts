import type { Album, SongDetails, Artist } from "./../appData/models";

export async function fetchNewReleases(): Promise<Album[]> {
  const res = await fetch("./mockData/allData.json");
  if (!res.ok) throw new Error("Failed to fetch new releases");
  const data = await res.json();
  return data.albums.newReleases;
}

export async function fetchRecentlyPlayed(): Promise<SongDetails[]> {
  const res = await fetch("./mockData/allData.json");
  if (!res.ok) throw new Error("Failed to fetch new releases");
  const data = await res.json();
  console.log(data);
  return data.songs;
}

export async function fetchArtists(): Promise<Artist[]> {
  const res = await fetch("./mockData/allData.json");
  if (!res.ok) throw new Error("Failed to fetch new releases");
  const data = await res.json();
  return data.artists;
}
