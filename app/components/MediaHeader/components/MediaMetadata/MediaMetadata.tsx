import React from "react";
import "./MediaMetadata.scss";
import { useTranslation } from "~/lib/i18n/translations";

interface MediaMetadataProps {
  type: "album" | "playlist" | "artist";
  year?: string | number;
  songCount?: number;
  duration?: string;
  isPublic?: boolean;
  followerCount?: number;
  separator?: string;
}

const MediaMetadata: React.FC<MediaMetadataProps> = ({
  type,
  year,
  songCount,
  duration,
  isPublic,
  followerCount,
  separator = "•",
}) => {
  const { t } = useTranslation();

  const renderMetadataItems = () => {
    const items: React.ReactNode[] = [];

    // Add type
    items.push(<span key="type">{t(`common.${type}`)}</span>);

    // Add year for albums
    if (type === "album" && year) {
      items.push(<span key="separator1">{separator}</span>);
      items.push(<span key="year">{year}</span>);
    }

    // Add song count
    if (songCount) {
      items.push(<span key="separator2">{separator}</span>);
      items.push(
        <span key="songCount">
          {songCount} {t("common.songs")}
        </span>,
      );
    }

    // Add duration if provided
    if (duration) {
      items.push(<span key="separator3">{separator}</span>);
      items.push(<span key="duration">{duration}</span>);
    }

    // Add public/private status for playlists
    if (type === "playlist" && typeof isPublic === "boolean") {
      items.push(<span key="separator4">{separator}</span>);
      items.push(
        <span key="visibility">
          {isPublic ? t("common.public") : t("common.private")}
        </span>,
      );
    }

    // Add follower count for artists
    if (type === "artist" && followerCount) {
      items.push(<span key="separator5">{separator}</span>);
      items.push(
        <span key="followers">
          {followerCount.toLocaleString()} {t("common.followers")}
        </span>,
      );
    }

    return items;
  };

  return <div className="album-metadata">{renderMetadataItems()}</div>;
};

export default MediaMetadata;
