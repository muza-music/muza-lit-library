import React, { useState } from "react";
import "./MediaHeader.scss";
import type { Album, SongDetails } from "~/appData/models";
import { FaPause, FaPlay } from "react-icons/fa";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { toast } from "react-toastify";
import AlbumInfoModal from "./AlbumInfoModal";
import MuzaIcon from "~/icons/MuzaIcon";
import { useTranslation } from "~/lib/i18n/translations";

interface MediaHeaderProps {
  album: Album;
  songs: SongDetails[];
}

const MediaHeader: React.FC<MediaHeaderProps> = ({ album, songs }) => {
  const { t } = useTranslation();
  const {
    selectedSong,
    setSelectedSong,
    setSelectedPlaListOrAlbum,
    isPlaying,
    setIsPlaying,
  } = useCurrentPlayerStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const addToLibrary = () => {
    toast(t("album.addedToLibrary"), {
      position: "bottom-center",
      hideProgressBar: true,
    });
  };

  const Play = () => {
    setSelectedSong(songs[0]);
    setSelectedPlaListOrAlbum(album);
    setIsPlaying(true);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="media-header" data-name="Media-Header">
      <div className="back-close-section" data-name="back & close">
        <div className="back-button" data-name="back" onClick={goBack}>
          <div className="back-icon">
            <MuzaIcon iconName="ChevronDown" />
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="cover-section" data-name="cover">
          <div className="cover-frame" data-name="cover frame">
            <img src={album.imageSrc} alt={album.title} />
            <div className="overlay" data-name="Overlay" />
          </div>
        </div>

        <div className="info-section">
          <div className="titles-section" data-name="Titles">
            <div className="title-info">
              <div className="album-title">{album.title}</div>
              <div className="artist-name">{album.artist}</div>
              <div className="album-metadata">
                <span>{t("common.album")}</span>
                <span>•</span>
                <span>{album.year || "1976"}</span>
                <span>•</span>
                <span>{album.songs?.length} {t("common.songs")}</span>
              </div>
            </div>

            <div className="actions-section">
              <div className="ctas-section" data-name="CTAs">
                <button className="play-album-button" onClick={Play} data-name="Button">
                  <div className="play-icon">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </div>
                  <span className="play-text">
                    {isPlaying ? t("common.pause") : t("common.playAlbum")}
                  </span>
                </button>
              </div>

              <div className="action-buttons" data-name="buttons">
                <button 
                  className="action-button add-button" 
                  onClick={addToLibrary}
                  data-name="Add-Download Button"
                >
                  <MuzaIcon iconName="plus" />
                </button>
                <button 
                  className="action-button info-button" 
                  onClick={() => setModalOpen(true)}
                  data-name="Info Button"
                >
                  <MuzaIcon iconName="info" />
                </button>
                <button className="action-button menu-button" data-name="Menu Button">
                  <MuzaIcon iconName="ellipsis" />
                </button>
              </div>
            </div>
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

export default MediaHeader;
