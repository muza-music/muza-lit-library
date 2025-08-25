import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./MusicTopbar.scss";
import { useTranslation } from "~/lib/i18n/translations";
import MuzaIcon from "~/icons/MuzaIcon";

interface MusicTopbarProps {
  onSearchChange?: (searchText: string) => void;
  onUserIconClick?: () => void;
}

const MusicTopbar: React.FC<MusicTopbarProps> = ({
  onSearchChange,
  onUserIconClick,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  const handleUploadClick = () => {
    navigate("/upload");
  };

  return (
    <div className="music-topbar">
      <div className="topbar">
        <div className="search-container">
          <div className="search-input-wrapper">
            <div className="search-input">
              <div className="search-input-content">
                <div className="search-icon">
                  <MuzaIcon iconName="search" />
                </div>
                <input
                  type="text"
                  placeholder={t("form.searchPlaceholder")}
                  onChange={handleSearchInput}
                  className="search-field"
                />
              </div>
              <div className="search-border" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="controls">
          <button className="upload-music-button" onClick={handleUploadClick}>
            {t("upload.uploadMusic")}
          </button>
          <div className="user-menu">
            <div className="user-icon" onClick={onUserIconClick}>
              <img src="/art/logo.jpg" alt={t("topbar.user")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MusicTopbar);
