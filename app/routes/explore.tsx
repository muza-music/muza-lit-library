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

import "../styles/scrollbar.css";
import "../styles/variables.css";
import "../styles/main.css";

export default function Explore() {
  const { selectedSong, setSelectedSong } = useCurrentPlayerStore();
  const { recentlyPlayed, newReleases, artists, featured, recommended } =
    useMusicLibraryStore();

  const navigate = useNavigate();

  const onAlbumClick = (album: Album) => {
    navigate("/routes/album", { state: { album } });
  };

  return (
    <main>
      <h1>Explore</h1>

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
        <h2>The Classics</h2>
        <button
          onClick={() => navigate("/routes/albums")}
          className="show-more-btn"
        >
          Show more
        </button>
      </div>
      <div className="album-list">
        {featured.map((a: Album) => (
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
        <h2>Uncovered Gems</h2>
        <button
          onClick={() => navigate("/routes/albums")}
          className="show-more-btn"
        >
          Show more
        </button>
      </div>
      <div className="album-list">
        {recommended.map((a: Album) => (
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
        <h2>Albums</h2>
        <button
          onClick={() => navigate("/routes/albums")}
          className="show-more-btn"
        >
          Show more
        </button>
      </div>
      <div className="album-list">
        {featured.concat(recommended).map((a: Album) => (
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
        <h2>The Ones You Missed</h2>
        <button
          onClick={() => navigate("/routes/albums")}
          className="show-more-btn"
        >
          Show more
        </button>
      </div>
      <div className="album-list">
        {recommended.map((a: Album) => (
          <AlbumDetails
            key={a.id}
            details={a}
            onAlbumClick={() => onAlbumClick(a)}
          />
        ))}
      </div>
    </main>
  );
}
