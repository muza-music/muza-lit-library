import React from "react";
import "./PlaylistItem.css";
import type { SongDetails } from "../../appData/models";
import { formatSongNumber } from "../../appData/utils";
import SongDetailsView from "./SongDetails";
import MuzaButton from "../../controls/MuzaButton";

interface PlaylistItemProps {
  details: SongDetails;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ details }) => {
  return (
    <div className="playlist-item">
      <span className="left">
        <span className="track-number">
          {formatSongNumber(details.index || 1)}
        </span>
        <SongDetailsView details={details} />
      </span>
      <MuzaButton content="•••" />
    </div>
  );
};

export default PlaylistItem;
