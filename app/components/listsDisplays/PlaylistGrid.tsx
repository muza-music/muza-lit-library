import React from "react";
import "./PlaylistGrid.scss";
import CreatePlaylistCard from "./CreatePlaylistCard";
import PlaylistCover from "../albumDisplays/PlaylistCover";

interface PlaylistGridProps {
  playlists: any[];
  onPlaylistClick: (playlist: any) => void;
  onCreatePlaylist: () => void;
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({
  playlists,
  onPlaylistClick,
  onCreatePlaylist,
}) => {
  return (
    <div className="playlist-grid">
      <CreatePlaylistCard onClick={onCreatePlaylist} />

      {playlists.map((playlist, index) => (
        <PlaylistCover
          key={playlist.id || index}
          albumImages={
            playlist.albumImages || [playlist.imageSrc || "/art/muza.png"]
          }
          title={playlist.title || playlist.name}
          songsCount={playlist.songs?.length?.toString() || "0"}
          userName={playlist.userName || playlist.author || "Unknown"}
          onSelect={() => onPlaylistClick(playlist)}
        />
      ))}
    </div>
  );
};

export default PlaylistGrid;
