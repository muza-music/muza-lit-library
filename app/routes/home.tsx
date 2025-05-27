import "../components/sections/MusicSidebar";
import MusicSidebar from "~/components/sections/MusicSidebar";
import { useEffect, useState } from "react";
import { MusicPlayer } from "~/components/sections/MusicPlayer";
import MusicTopbar from "~/components/sections/MusicTopbar";
import "../styles/scrollbar.css";
import "../styles/variables.css";
import "../styles/main.css";
import SongLine from "~/components/songLineDisplays/SongLine";
import type { Album, SongDetails } from "~/appData/models";
import  MusicListSection  from "~/components/listsDisplays/MusicListSection";

// Removed the import as the module '../appData/model' does not exist

import AlbumDetails from "~/components/albumDisplays/AlbumDetails";
import ArtistDetails from "~/components/artistDisplays/ArtistDetails";
import LoadReleasesOnMount from "../api/Loader";

import { useMusicLibraryStore } from '../appData/musicStore'; 

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [selectedSong, setSelectSong] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const newReleases = useMusicLibraryStore((state) => state.newReleases);
  const recentlyPlayed = useMusicLibraryStore((state) => state.recentlyPlayed);
  const artists = useMusicLibraryStore((state) => state.artists);


  useEffect(() => {
    fetch("./mockData/allData.json") // or use a full URL: 'https://example.com/api/data'
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setSelectSong(data.songs[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;



  return (
    <div className="body">
      <LoadReleasesOnMount/>
      <MusicSidebar
        logoSrc="app/icons/icons/muza.svg"
        logoAlt="Music Library"
        sections={data.sidebar.sections}
      />

      <div className="content">
        <MusicTopbar />
        <main>
          <h1>Home</h1>
          <hr />
          <MusicListSection
            type={"album"}
            title={"New Releases"}
            subTitle={""}
            list={recentlyPlayed.map((song) => ({
              ...song,
              imageSrc: song.imageSrc || "default-image-path.jpg", // Provide a fallback image
            }))}
          />
          <h2>Recently Played</h2>
          <div className="song-list">
          {recentlyPlayed.map((s: SongDetails) => (
              <SongLine
                details={s}
                onClick={() => setSelectSong(s)}
                isPlaying={s.id === selectedSong.id}
              />
            ))}
          </div>
          <hr />
          <MusicListSection
            type={"artist"}
            title={"Artists"}
            subTitle={""}
            list={artists.map((artist: any) => ({
              imageSrc: artist.imageSrc || "default-image-path.jpg", 
              artistName: artist.artistName, 
              title: "",
              albumsCount: artist.albumsCount || 0,
              subTitle: artist.genre || "", 
            }))}
          />  
          <MusicPlayer details={selectedSong} />
        </main>
      </div>
    </div>
  );
}
