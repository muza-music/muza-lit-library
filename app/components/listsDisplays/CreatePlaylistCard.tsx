import React from "react";
import "./CreatePlaylistCard.scss";
import MuzaIcon from "~/icons/MuzaIcon";
import { useTranslation } from "~/lib/i18n/translations";

interface CreatePlaylistCardProps {
  onClick: () => void;
}

const CreatePlaylistCard: React.FC<CreatePlaylistCardProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button className="create-playlist-card" onClick={onClick}>
      <div className="create-playlist-content">
        <div className="plus-icon-container">
          <div className="plus-icon-circle">
            <MuzaIcon iconName="plus" className="plus-icon" />
          </div>
        </div>
        <p className="create-playlist-text">{t("playlist.createNew")}</p>
      </div>
    </button>
  );
};

export default CreatePlaylistCard;
