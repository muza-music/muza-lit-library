import React, { useState, useEffect } from "react";
import "./CreatePlaylistModal.scss";
import MuzaInputField from "~/controls/MuzaInputField";
import MuzaIcon from "~/icons/MuzaIcon";

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
  const [playlistName, setPlaylistName] = useState("");
  const [visibility, setVisibility] = useState("Public");
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
      setVisibility("Public");
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
        setVisibility(visibility === "Public" ? "Private" : "Public");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        setVisibility(visibility === "Private" ? "Public" : "Private");
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
    { value: "Public", label: "Public", icon: "globe" },
    { value: "Private", label: "Private", icon: "lock" },
  ];

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="create-playlist-modal">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              <MuzaIcon iconName="Close" />
            </button>
            <h1 className="modal-title">New Playlist</h1>
          </div>
          <div className="modal-content-inner">
            <div className="form-group">
              <MuzaInputField
                label="Title"
                placeholder="Your Playlist's Name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Visibility</label>
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
                        iconName={visibility === "Public" ? "globe" : "lock"}
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
              Cancel
            </button>
            <button type="submit" className="create-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
