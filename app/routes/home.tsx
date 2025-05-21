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
import SongList from "~/components/songLineDisplays/songList";

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

  const handleSelectSong = (song: SongDetails) => {
    // Check if the selected song is already playing
    const isCurrentlyPlaying = data.songs.find(
      (s: SongDetails) => s.id === song.id && s.isPlaying,
    );

    // If this song is already playing, we want to pause it
    const shouldPlay = !isCurrentlyPlaying;

    // Update the selected song state
    setSelectSong({ ...song, isPlaying: shouldPlay });

    // Only update the songs array if we have data
    if (data && data.songs) {
      // Update the isPlaying property for all songs
      const updatedSongs = data.songs.map((s: SongDetails) => ({
        ...s,
        isPlaying: shouldPlay && s.id === song.id,
      }));

      // Update the data state with the modified songs
      setData({ ...data, songs: updatedSongs });
    }
  };

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
        <SongList
          songs={data.songs}
          // title="All Songs"
          onSelectSong={handleSelectSong}
        />
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
