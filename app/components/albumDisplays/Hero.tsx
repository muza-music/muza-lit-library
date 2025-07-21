import React, { useState } from "react";
import "./Hero.scss";
import type { Album, SongDetails } from "~/appData/models";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { toast } from "react-toastify";
import AlbumInfoModal from "./AlbumInfoModal";
import MuzaIcon from "~/icons/MuzaIcon";
import { useNavigate } from "react-router";

interface HeroProps {
  album: Album;
  songs: SongDetails[];
}

const Hero: React.FC<HeroProps> = ({ album, songs }) => {
  const {
    selectedSong,
    setSelectedSong,
    setSelectedPlaListOrAlbum,
    isPlaying,
    setIsPlaying,
  } = useCurrentPlayerStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const GetRandomSong = () => {
    return Math.floor(Math.random() * songs.length);
  };

  const addToLibrary = () => {
    toast("Album added successfully to your library", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setSelectedSong(songs[0]);
      setSelectedPlaListOrAlbum(album);
      setIsPlaying(true);
    }
  };

  return (
    <div className="hero-card">
      <div className="hero-back">
        <button
          className="hero-back-btn"
          onClick={() => navigate("/routes/albums")}
        >
          <MuzaIcon iconName="ChevronLeft" />
        </button>
      </div>
      <div className="hero-cover">
        <img src={album.imageSrc} alt={album.title} />
      </div>
      <div className="hero-info">
        <div className="hero-info-text">
          <div className="hero-title">{album.title}</div>
          <div className="hero-artist">{album.artist}</div>
          <div className="hero-meta">
            <span>Album</span>
            <span className="hero-dot">&bull;</span>
            <span>{album.year ? album.year : "2025"}</span>
            <span className="hero-dot">&bull;</span>
            <span>{album.songs?.length} Songs</span>
          </div>
        </div>
        <div className="hero-info-actions">
          <div className="hero-CTAs">
            <button className="hero-play-btn" onClick={handlePlayPause}>
              {isPlaying ? (
                <MuzaIcon iconName="pause" />
              ) : (
                <MuzaIcon iconName="play" />
              )}
              <span className="hero-play-label">Play Album</span>
            </button>
          </div>
          <div className="hero-buttons">
            <button
              className="hero-icon-btn"
              title="Add to Library"
              onClick={addToLibrary}
            >
              <MuzaIcon iconName="Plus" />
            </button>
            <button
              className="hero-icon-btn"
              title="Album Info"
              onClick={() => setModalOpen(true)}
            >
              <MuzaIcon iconName="Info" />
            </button>
            <button className="hero-icon-btn" title="More">
              <MuzaIcon iconName="Ellipsis" />
            </button>
          </div>
        </div>
      </div>
      <AlbumInfoModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Hero;
