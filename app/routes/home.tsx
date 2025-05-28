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
import MusicListSection from "~/components/listsDisplays/MusicListSection";

// Removed the import as the module '../appData/model' does not exist

import { useLoadMusicDataOnMount } from "../api/musicDataApi";

import MuzaMusicPlaylist from "~/components/listsDisplays/MusicPlaylist";
import AlbumDetails from "~/components/albumDisplays/AlbumDetails";
import ArtistDetails from "~/components/artistDisplays/ArtistDetails";
import { useUserStore } from "~/appData/userStore";
import { useMusicLibraryStore } from "~/appData/musicStore";

export default function Home() {
  const { selectedSong, setSelectedSong } = useUserStore();
  const {
    newReleases,
    recentlyPlayed,
    artists,
    setNewReleases,
    setRecentlyPlayed,
    setArtists,
  } = useMusicLibraryStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLoadMusicDataOnMount();

  const [sidebarSections, setSidebarSections] = useState([]);

  const getCurrentSongIndex = () => {
    if (!selectedSong || !selectedSong.id) return -1;
    return recentlyPlayed.findIndex(
      (song: SongDetails) => song.id === selectedSong.id,
    );
  };

  const handlePreviousSong = () => {
    const currentIndex = getCurrentSongIndex();
    if (currentIndex <= 0) {
      setSelectedSong(recentlyPlayed[recentlyPlayed.length - 1]);
    } else {
      setSelectedSong(recentlyPlayed[currentIndex - 1]);
    }
  };

  const handleNextSong = () => {
    const currentIndex = getCurrentSongIndex();
    if (currentIndex === -1 || currentIndex === recentlyPlayed.length - 1) {
      setSelectedSong(recentlyPlayed[0]);
    } else {
      setSelectedSong(recentlyPlayed[currentIndex + 1]);
    }
  };

  useEffect(() => {
    fetch("./mockData/allData.json")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setNewReleases(data.albums.newReleases);
        setRecentlyPlayed(data.songs);
        setArtists(data.artists);
        setSidebarSections(data.sidebar.sections);

        if (data.songs.length > 0) {
          setSelectedSong(data.songs[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [setNewReleases, setRecentlyPlayed, setArtists, setSelectedSong]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="body">
      <MusicSidebar
        logoSrc="app/icons/icons/muza.svg"
        logoAlt="Music Library"
        sections={sidebarSections}
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
                key={s.id}
                details={s}
                onClick={() => setSelectedSong(s)}
                isPlaying={s.id === selectedSong?.id}
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

          {selectedSong && (
            <MusicPlayer
              details={{
                audioUrl: selectedSong.audioUrl || "",
                imageSrc: selectedSong.imageSrc || "",
                title: selectedSong.title,
                artist: selectedSong.artist || "",
                album: selectedSong.album || "",
                year: selectedSong.year || new Date().getFullYear(),
                isPlaying: selectedSong.isPlaying || false,
                id: selectedSong.id,
              }}
              onUpdate={(updatedDetails) =>
                setSelectedSong({
                  ...selectedSong,
                  isPlaying: updatedDetails.isPlaying,
                  audioUrl: updatedDetails.audioUrl,
                })
              }
              onPrevious={handlePreviousSong}
              onNext={handleNextSong}
              onSongEnded={handleNextSong}
            />
          )}
        </main>
      </div>
    </div>
  );
}
