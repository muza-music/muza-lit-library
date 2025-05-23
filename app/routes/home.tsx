import "../components/sections/MusicSidebar";
import MusicSidebar from "~/components/sections/MusicSidebar";
import { useEffect, useState } from "react";
import { MusicPlayer } from "~/components/sections/MusicPlayer";
import MusicTopbar from "~/components/sections/MusicTopbar";
import "../styles/scrollbar.css";
import "../styles/variables.css";
import "../styles/main.css";
import SongLine from "~/components/songLineDisplays/SongLine";
import type { SongDetails } from "~/appData/models";
import MuzaMusicPlaylist from "~/components/listsDisplays/MusicPlaylist";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [selectedSong, setSelectSong] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentSongIndex = () => {
    if (!selectedSong || !selectedSong.id) return -1;
    return data.songs.findIndex(
      (song: SongDetails) => song.id === selectedSong.id,
    );
  };

  const handlePreviousSong = () => {
    const currentIndex = getCurrentSongIndex();
    if (currentIndex <= 0) {
      setSelectSong(data.songs[data.songs.length - 1]);
    } else {
      setSelectSong(data.songs[currentIndex - 1]);
    }
  };

  const handleNextSong = () => {
    const currentIndex = getCurrentSongIndex();
    if (currentIndex === -1 || currentIndex === data.songs.length - 1) {
      setSelectSong(data.songs[0]);
    } else {
      setSelectSong(data.songs[currentIndex + 1]);
    }
  };

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
        logoSrc="app/icons/icons/muza.svg"
        logoAlt="Music Library"
        sections={data.sidebar.sections}
      ></MusicSidebar>

      <div className="content">
        <MusicTopbar></MusicTopbar>
        {data.songs.map((s: SongDetails) => (
          <SongLine details={s} onClick={() => setSelectSong(s)}></SongLine>
        ))}
        <MusicPlayer
          details={selectedSong}
          onUpdate={(updatedDetails) => setSelectSong(updatedDetails)}
          onPrevious={() => handlePreviousSong()}
          onNext={() => handleNextSong()}
          onSongEnded={() => handleNextSong()}
        ></MusicPlayer>
      </div>

      <MuzaMusicPlaylist
        songs={data.songs.slice(0, 3)}
        suggestions={data.songs.slice(3, 7)}
        title="playlist 3"
        author="me"
      />
    </div>
  );
}
