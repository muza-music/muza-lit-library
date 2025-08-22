import React, { useState, useEffect } from "react";
import "./CreatePlaylistModal.scss";
import MuzaInputField from "~/controls/MuzaInputField";
import MuzaIcon from "~/icons/MuzaIcon";
import ToggleButton from "~/controls/ToggleButton";
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
  const [isPrivate, setIsPrivate] = useState(false);

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
      const visibility = isPrivate
        ? t("playlist.private")
        : t("playlist.public");
      onCreatePlaylist(playlistName.trim(), visibility);
      setPlaylistName("");
      setIsPrivate(false);
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToggleChange = (checked: boolean) => {
    setIsPrivate(checked);
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="create-playlist-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">{t("playlist.new")}</h1>
          </div>

          <div className="modal-content-inner">
            <div className="form-group">
              <MuzaInputField
                label={t("playlist.title")}
                placeholder={t("playlist.titlePlaceholder")}
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="privacy-toggle-wrapper">
                <ToggleButton
                  checked={isPrivate}
                  onChange={handleToggleChange}
                  label={t("playlist.makePrivate")}
                />
              </div>
            </div>
          </div>

          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              {t("playlist.cancel")}
            </button>
            <button
              type="button"
              className="create-button"
              onClick={handleSubmit}
              disabled={!playlistName.trim()}
            >
              {t("playlist.create")}
            </button>
          </div>

          <button className="close-button" onClick={onClose}>
            <MuzaIcon iconName="Close" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
