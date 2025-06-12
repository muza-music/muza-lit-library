import type { SongDetails } from "~/appData/models";
import { useMusicLibraryStore } from "~/appData/musicStore";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { MusicPlayer } from "../sections/MusicPlayer";

export default function MuzaMusicPlayer() {
  const { recentlyPlayed } = useMusicLibraryStore();
  const { selectedSong, setSelectedSong, isPlaying, setIsPlaying } =
    useCurrentPlayerStore();

  const getCurrentSongIndex = () => {
    if (!selectedSong || !selectedSong.id) return -1;
    return recentlyPlayed.findIndex(
      (song: SongDetails) => song.id === selectedSong.id,
    );
  };

  const handlePreviousSong = () => {
    const currentIndex = getCurrentSongIndex();
    let prevSong;
    if (currentIndex <= 0) {
      prevSong = recentlyPlayed[recentlyPlayed.length - 1];
    } else {
      prevSong = recentlyPlayed[currentIndex - 1];
    }
    setSelectedSong({
      ...prevSong,
    });
  };

  const handleNextSong = () => {
    const currentIndex = getCurrentSongIndex();
    
    let nextSong;
    if (currentIndex === -1 || currentIndex === recentlyPlayed.length - 1) {
      nextSong = recentlyPlayed[0];
    } else {
      nextSong = recentlyPlayed[currentIndex + 1];
    }
    
    setSelectedSong({
      ...nextSong,
    });
    setIsPlaying(true); // Auto-play the next song
  };

  return (
    <>
      {selectedSong && (
        <MusicPlayer
          details={{
            audioUrl: selectedSong.audioUrl || "",
            imageSrc: selectedSong.imageSrc || "",
            title: selectedSong.title,
            artist: selectedSong.artist || "",
            album: selectedSong.album || "",
            year: selectedSong.year || new Date().getFullYear(),
            isPlaying: isPlaying || false,
            id: selectedSong.id,
          }}
          setIsPlaying={setIsPlaying}
          onUpdate={(updatedDetails) => {
            setSelectedSong({
              ...selectedSong,
              audioUrl: updatedDetails.audioUrl,
            });
          }}
          onPrevious={handlePreviousSong}
          onNext={handleNextSong}
          onSongEnded={handleNextSong}
        />
      )}
    </>
  );
}
