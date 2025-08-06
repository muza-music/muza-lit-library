import React, { useState } from "react";
import "./PlaylistItem.scss";
import type { SongDetails } from "../../appData/models";
import { formatSongNumber } from "../../appData/utils";
import SongDetailsView from "./SongDetails";
import MuzaButton from "../../controls/MuzaButton";
import MuzaContainer from "../ui/MuzaContainer";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@radix-ui/react-context-menu";

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
        <SongDetailsView details={details} onClick={() => {}} />
      </span>
      <ContextMenu>
        <ContextMenuTrigger>
          <MuzaButton content="•••" />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <MuzaContainer>context menu </MuzaContainer>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default PlaylistItem;
