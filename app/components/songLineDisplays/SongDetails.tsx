import React from "react";
import "./SongDetails.css";
import type { SongDetails } from "../../appData/models";

interface SongDetailsViewProps {
  details: SongDetails;
}

const SongDetailsView: React.FC<SongDetailsViewProps> = ({ details }) => {
  return (
    <div className="song-details-view">
      <img
        width="38px"
        height="38px"
        src={details.imageSrc}
        alt={details.title}
      />
      <div className="song-details">
        <span className="song-title">{details.title}</span>
        <span className="song-artist">{details.artist}</span>
      </div>
    </div>
  );
};

export default SongDetailsView;
