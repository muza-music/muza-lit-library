import React, { useEffect, useState } from "react";
import "./AlbumHeader.scss";
import type { Album, SongDetails } from "~/appData/models";
import { FaPause, FaPlay } from "react-icons/fa";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { toast } from "react-toastify";
import AlbumInfoModal from "./AlbumInfoModal";
import MuzaIcon from "~/icons/MuzaIcon";
import { useTranslation } from "~/lib/i18n/translations";

interface AlbumHeaderProps {
  album: Album;
  songs: SongDetails[];
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({ album, songs }) => {
  const { t } = useTranslation();
  const {
    selectedSong,
    setSelectedSong,
    setSelectedPlaListOrAlbum,
    isPlaying,
    setIsPlaying,
  } = useCurrentPlayerStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const GetRandomSong = () => {
    return Math.floor(Math.random() * songs.length);
  };

  const addToLibrary = () => {
    toast(t('album.addedToLibrary'), {
      position: "bottom-center",
      hideProgressBar: true,
    });
  };

  const Play = () => {
    setSelectedSong(songs[0]);
    setSelectedPlaListOrAlbum(album);
    setIsPlaying(true);
  };

  return (
    <div className="album-header-card">
      <div className="image-container">
        <img src={album.imageSrc} />
      </div>
      <div className="info">
        <div className="title">{album.title}</div>
        <div className="artist">{album.artist}</div>
        <div className="atrist">{t('common.album')} • {album.songs?.length} {t('common.songs')}</div>
        <button className="icon-button" onClick={() => Play()}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className="icon-button"
          onClick={() => setSelectedSong(songs[GetRandomSong()])}
        >
          <span className="icon icon-shuffle">
            <MuzaIcon iconName="shuffle" />
          </span>
        </button>
        <button className="icon-button" onClick={addToLibrary}>
          <span className="icon icon-plus" />
        </button>
        <button className="icon-button" onClick={() => setModalOpen(true)}>
          <span className="icon icon-info" />
        </button>
      </div>
      <AlbumInfoModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      ></AlbumInfoModal>
    </div>
  );
};

export default AlbumHeader;
