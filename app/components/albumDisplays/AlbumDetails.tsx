import React, { useState } from "react";
import "./AlbumDetails.scss";
import type { Album } from "~/appData/models";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import MuzaIcon from "~/icons/MuzaIcon";
import AlbumInfoModal from "./AlbumInfoModal";
import { addToLibrary } from "~/lib/utils";
import HoverOverlay from "~/components/ui/HoverOverlay";

interface AlbumDetailsProps {
  details: Album;
  onAlbumClick: () => void;
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({
  details,
  onAlbumClick,
}) => {
  const { isPlaying, setIsPlaying } = useCurrentPlayerStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="album-details-card">
      <div className="image-container" onClick={onAlbumClick}>
        <img src={details.imageSrc} alt={details.title} />
        <HoverOverlay
          isPlaying={!!isPlaying}
          onPlayPause={handlePlayPause}
          actions={[
            {
              icon: "ellipsis",
              onClick: (e) => e.stopPropagation(),
              title: "More options",
            },
            {
              icon: "info",
              onClick: (e) => {
                e.stopPropagation();
                setModalOpen(true);
              },
              title: "Album info",
            },
            {
              icon: "plus",
              onClick: (e) => {
                e.stopPropagation();
                addToLibrary();
              },
              title: "Add to library",
            },
          ]}
        />
      </div>
      <div className="info">
        <div className="title">{details.title}</div>
        <div className="artist">{details.artist}</div>
        <div className="subtitle">{details.genre && `${details.genre} • `}</div>
        <div className="buttons">
          <button className="icon-button">
            <MuzaIcon iconName="dots" />
          </button>
          <button className="icon-button">
            <MuzaIcon iconName="info" />
          </button>
          <button className="icon-button">
            <MuzaIcon iconName="plus" />
          </button>
          <button className="icon-button">
            <MuzaIcon iconName="shuffle" />
          </button>
        </div>
      </div>
      <AlbumInfoModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default AlbumDetails;
