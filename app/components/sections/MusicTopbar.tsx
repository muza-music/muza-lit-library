import React, { useState } from "react";
import "./MusicTopbar.scss";
import { useTranslation } from "~/lib/i18n/translations";

interface MusicTopbarProps {
  onSearchChange?: (searchText: string) => void;
  onUserIconClick?: () => void;
}

const MusicTopbar: React.FC<MusicTopbarProps> = ({
  onSearchChange,
  onUserIconClick,
}) => {
  const { t } = useTranslation();
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  return (
    <div className="music-topbar">
      <div className="topbar">
        <div className="search-container">
          <input
            type="text"
            placeholder={t('form.searchPlaceholder')}
            onChange={handleSearchInput}
          />
        </div>
        <div className="controls">
          <button className="upload-music-button">{t('upload.uploadMusic')}</button>
          <div className="user-menu">
            <div className="user-icon" onClick={onUserIconClick}>
              <img src="https://picsum.photos/100" alt={t('topbar.user')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MusicTopbar);
