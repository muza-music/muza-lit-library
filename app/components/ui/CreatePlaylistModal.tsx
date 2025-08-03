import React, { useState, useEffect } from "react";
import "./CreatePlaylistModal.scss";
import MuzaInputField from "~/controls/MuzaInputField";
import MuzaIcon from "~/icons/MuzaIcon";
import { useTranslation } from "~/lib/i18n/translations";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlaylist: (name: string, visibility: string) => void;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  onClose,
  onCreatePlaylist,
}) => {
  const { t } = useTranslation();
  const [playlistName, setPlaylistName] = useState("");
  const [visibility, setVisibility] = useState(t('playlist.public'));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playlistName.trim()) {
      onCreatePlaylist(playlistName.trim(), visibility);
      setPlaylistName("");
      setVisibility(t('playlist.public'));
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleVisibilitySelect = (value: string) => {
    setVisibility(value);
    setIsDropdownOpen(false);
  };

  const handleVisibilityKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        setVisibility(visibility === t('playlist.public') ? t('playlist.private') : t('playlist.public'));
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        setVisibility(visibility === t('playlist.private') ? t('playlist.public') : t('playlist.private'));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
        break;
      case "Escape":
        e.preventDefault();
        setIsDropdownOpen(false);
        break;
      default:
        break;
    }
  };

  const visibilityOptions = [
    { value: t('playlist.public'), label: t('playlist.public'), icon: "globe" },
    { value: t('playlist.private'), label: t('playlist.private'), icon: "lock" },
  ];

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="create-playlist-modal">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              <MuzaIcon iconName="Close" />
            </button>
            <h1 className="modal-title">{t('playlist.new')}</h1>
          </div>
          <div className="modal-content-inner">
            <div className="form-group">
              <MuzaInputField
                label={t('playlist.title')}
                placeholder={t('playlist.titlePlaceholder')}
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>{t('playlist.visibility')}</label>
              <div className="custom-select">
                <div
                  className="select-trigger"
                  tabIndex={0}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onKeyDown={handleVisibilityKeyDown}
                >
                  <div className="select-content">
                    <span className="select-icon">
                      <MuzaIcon
                        iconName={visibility === t('playlist.public') ? "globe" : "lock"}
                      />
                    </span>
                    <span>{visibility}</span>
                  </div>
                  <span className="chevron">
                    <MuzaIcon iconName="ChevronDown" />
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="select-dropdown">
                    {visibilityOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`select-option ${option.value === visibility ? "selected" : ""}`}
                        onClick={() => handleVisibilitySelect(option.value)}
                      >
                        <span className="option-icon">
                          <MuzaIcon iconName={option.icon} />
                        </span>
                        <span>{option.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              {t('playlist.cancel')}
            </button>
            <button type="submit" className="create-button">
              {t('playlist.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
