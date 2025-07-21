import { useEffect, useState } from "react";
import type { Album, SongDetails } from "~/appData/models";
import { useMusicLibraryStore } from "~/appData/musicStore";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import Hero from "~/components/albumDisplays/Hero";
import { MusicPlayer } from "~/components/sections/MusicPlayer";
import MusicSidebar from "~/components/sections/MusicSidebar";
import MusicTopbar from "~/components/sections/MusicTopbar";
import SongLine from "~/components/songLineDisplays/SongLine";
import { useLocation } from "react-router";

import "../styles/scrollbar.scss";
import "../styles/variables.scss";
import "../styles/main.scss";

interface AlbumPageState {
  album: Album;
}

export default function AlbumPage() {
  const { selectedSong, setSelectedSong } = useCurrentPlayerStore();
  const { recentlyPlayed } = useMusicLibraryStore();

  const [albumSongsDetails, setAlbumSongsDetails] = useState<SongDetails[]>([]);
  const location = useLocation();
  const { album }: AlbumPageState = location.state;

  useEffect(() => {
    const allSongsDetails = recentlyPlayed;
    let details: SongDetails[] = [];
    album?.songs?.map((songIndex) =>
      details.push(allSongsDetails[songIndex - 1]),
    );
    setAlbumSongsDetails(details);
  }, [album]);

  return (
    <main>
      <Hero album={album} songs={albumSongsDetails} />
      <hr />
      <div className="album-song-list">
        {albumSongsDetails.map((s: SongDetails) => (
          <SongLine
            key={s.id}
            details={s}
            onClick={() => setSelectedSong(s)}
            isPlaying={s.id === selectedSong?.id}
          />
        ))}
      </div>

      <hr />
    </main>
  );
}
