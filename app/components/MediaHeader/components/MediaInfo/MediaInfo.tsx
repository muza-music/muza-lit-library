import React from "react";
import "./MediaInfo.scss";

interface MediaInfoProps {
  title: string;
  creator: string;
  creatorLabel?: string;
  alignment?: "left" | "center";
}

const MediaInfo: React.FC<MediaInfoProps> = ({
  title,
  creator,
  creatorLabel = "",
  alignment = "left",
}) => {
  return (
    <div className={`title-info title-info--${alignment}`}>
      <div className="album-title">{title}</div>
      {creator && (
        <div className="creator-name">
          {creatorLabel && `${creatorLabel} `}
          {creator}
        </div>
      )}
    </div>
  );
};

export default MediaInfo;
