import React from "react";
import "./ArtistDetails.scss";
import { useTranslation } from "~/lib/i18n/translations";

interface Artist {
  id: number;
  imageSrc: string;
  artistName: string;
  albumsCount: string;
}

interface ArtistDetailsProps {
  details: Artist;
}

const ArtistDetails: React.FC<ArtistDetailsProps> = ({ details }) => {
  const { t } = useTranslation();
  return (
    <div className="artist-details-card">
      <div className="image-container">
        <img src={details.imageSrc} alt={details.artistName} />
      </div>
      <div className="info">
        <div className="title">{details.artistName}</div>
        <div className="subtitle">
          {details.albumsCount} {t("common.albums")}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
