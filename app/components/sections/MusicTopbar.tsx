import React, { useState } from "react";
import "./MusicTopbar.scss";

interface MusicTopbarProps {
  onSearchChange?: (searchText: string) => void;
  onUserIconClick?: () => void;
}

const MusicTopbar: React.FC<MusicTopbarProps> = ({
  onSearchChange,
  onUserIconClick,
}) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  return (
    <div className="music-topbar">
      <div className="topbar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for artists, albums or songs"
            onChange={handleSearchInput}
          />
        </div>
        <div className="controls">
          <button className="upload-music-button">Upload Music</button>
          <div className="user-menu">
            <div className="user-icon" onClick={onUserIconClick}>
              <img src="https://picsum.photos/100" alt="user" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MusicTopbar);
