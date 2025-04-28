import "../components/sections/MusicSidebar";
import MusicSidebar from "~/components/sections/MusicSidebar";
import { useEffect, useState } from "react";
import MusicPlaylist from "~/components/listsDisplays/MusicPlaylist";
import { MusicPlayer } from "~/components/sections/MusicPlayer";
import MusicTopbar from "~/components/sections/MusicTopbar";
import "../styles/scrollbar.css";
import "../styles/variables.css";
import "../styles/main.css";
import SongLine from "~/components/songLineDisplays/SongLine";
import type { SongDetails } from "~/appData/models";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [selectedSong, setSelectSong] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <MusicSidebar
        logoSrc="./art/logo.jpg"
        logoAlt="Music Library"
        sections={data.sidebar.sections}
      ></MusicSidebar>

      <div className="content">
        <MusicTopbar></MusicTopbar>
        {data.songs.map((s: SongDetails) => (
          <SongLine details={s} onClick={() => setSelectSong(s)}></SongLine>
        ))}
        <MusicPlayer details={selectedSong}></MusicPlayer>
      </div>

      <MusicPlaylist
        songs={data.songs.slice(0, 3)}
        suggestions={data.songs.slice(3, 7)}
        title="playlist 3"
        author="me"
      />
    </div>
  );
}
