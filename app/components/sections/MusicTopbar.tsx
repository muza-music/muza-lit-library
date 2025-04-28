import React, { useState } from "react";
import "./MusicTopbar.css";
import VolumeControl from "../../controls/VolumeControl";

interface MusicTopbarProps {
  onSearchChange?: (searchText: string) => void;
  onUserIconClick?: () => void;
}

const MusicTopbar: React.FC<MusicTopbarProps> = ({
  onSearchChange,
  onUserIconClick,
}) => {
  const [volume, setVolume] = useState(75);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  return (
    <div className="music-topbar">
      <div className="topbar">
        <div className="search-container">
          <i className="fa-solid fa-search"></i>
          <input
            type="text"
            placeholder="Artist / Album / Song"
            onChange={handleSearchInput}
          />
        </div>
        <div className="controls">
          <div className="volume-control">
            <VolumeControl value={volume} onVolumeChange={handleVolumeChange} />
          </div>
          <div className="user-menu">
            <i
              className="fa-solid fa-circle-user user-icon"
              onClick={onUserIconClick}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicTopbar;
