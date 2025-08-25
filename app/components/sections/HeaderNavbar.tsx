import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./MusicTopbar.scss";
import { useTranslation } from "~/lib/i18n/translations";

interface HeaderNavbarProps {
  onSearchChange?: (searchText: string) => void;
  onUserIconClick?: () => void;
}

const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
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
    <div className="header-navbar">
      <div className="header-navbar-container">
        <div className="search-section">
          <div className="input-wrapper">
            <div className="input-container">
              <div className="input-content">
                <div className="search-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0001 14L11.1335 11.1333M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
                      stroke="var(--colors_foreground_light)"
                      strokeWidth="1.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={t("form.searchPlaceholder")}
                  onChange={handleSearchInput}
                  className="search-input"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="actions-section">
          <button className="upload-button" onClick={handleUploadClick}>
            <span className="upload-text">{t("upload.uploadMusic")}</span>
            <div className="upload-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.66657 9.93284C2.17126 9.42679 1.79761 8.81465 1.57392 8.1428C1.35023 7.47095 1.28237 6.75701 1.37547 6.05504C1.46858 5.35308 1.7202 4.68151 2.1113 4.0912C2.50239 3.50089 3.02269 3.00732 3.63279 2.64788C4.24289 2.28843 4.92678 2.07255 5.63268 2.01656C6.33858 1.96058 7.04795 2.06597 7.70708 2.32475C8.36621 2.58353 8.95778 2.98892 9.43706 3.5102C9.91631 4.03149 10.2706 4.655 10.4732 5.33351H11.6666C12.3102 5.33344 12.9369 5.54039 13.4539 5.9238C13.9709 6.30722 14.3509 6.84675 14.5377 7.46271C14.7246 8.07868 14.7084 8.7384 14.4915 9.34443C14.2746 9.95045 13.8685 10.4707 13.3332 10.8282M8 8.00016V14.0002M8 8.00016L10.6667 10.6668M8 8.00016L5.33333 10.6668"
                  stroke="var(--colors_foreground_light)"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
          <div className="avatar-container" onClick={onUserIconClick}>
            <img
              src="/art/logo.jpg"
              alt={t("topbar.user")}
              className="avatar-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeaderNavbar);
