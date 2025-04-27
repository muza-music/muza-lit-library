import React from "react";
import "./SmallAlbumDetails.css";

interface SmallAlbumDetailsProps {
  title: string;
  author: string;
  imageSrc: string;
}

const SmallAlbumDetails: React.FC<SmallAlbumDetailsProps> = ({
  title,
  author,
  imageSrc,
}) => {
  return (
    <div className="small-album-details">
      <img src={imageSrc} alt={title} width="148px" height="148px" />
      <h3>{title} </h3>
      <p> {author} </p>
    </div>
  );
};

export default SmallAlbumDetails;
