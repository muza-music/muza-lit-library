import "../components/sections/MusicSidebar";
import { useEffect, useState } from "react";
import { MusicPlayer } from "~/components/sections/MusicPlayer";
import SongLine from "~/components/songLineDisplays/SongLine";
import type { Album, SongDetails } from "~/appData/models";
import AlbumDetails from "~/components/albumDisplays/AlbumDetails";
import ArtistDetails from "~/components/artistDisplays/ArtistDetails";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { useMusicLibraryStore } from "~/appData/musicStore";
import { useNavigate } from "react-router";

import "../styles/scrollbar.scss";
import "../styles/variables.scss";
import "../styles/main.scss";

export default function Home() {
  const { selectedSong, setSelectedSong } = useCurrentPlayerStore();
  const { recentlyPlayed, newReleases, artists } = useMusicLibraryStore();

  const navigate = useNavigate();

  const onAlbumClick = (album: Album) => {
    navigate("/routes/album", { state: { album } });
  };

  return (
    <main>
      <h1>Home</h1>
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>New Releases</h2>
        <button
          onClick={() => navigate("/routes/albums")}
          className="show-more-btn"
        >
          Show more
        </button>
      </div>
      <div className="album-list">
        {newReleases.map((a: Album) => (
          <AlbumDetails
            key={a.id}
            details={a}
            onAlbumClick={() => onAlbumClick(a)}
          />
        ))}
      </div>

      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Recently Played</h2>
        <button
          onClick={() => navigate("/routes/songs")}
          className="show-more-btn"
        >
          Show more
        </button>
      </div>
      <div className="song-list">
        {recentlyPlayed.slice(0, 30).map((s: SongDetails) => (
          <SongLine
            key={s.id}
            details={s}
            onClick={() => setSelectedSong(s)}
            isPlaying={s.id === selectedSong?.id}
          />
        ))}
      </div>

      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Artists</h2>
        <button
          onClick={() => navigate("/routes/artists")}
          className="show-more-btn"
        >
          Show more
        </button>
      </div>
      <div className="artist-list">
        {artists.slice(0, 6).map((artist: any) => (
          <ArtistDetails key={artist.id} details={artist} />
        ))}
      </div>
    </main>
  );
}
