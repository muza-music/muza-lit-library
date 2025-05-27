import React from "react";
import "./MuzaCover.css";
import MuzaIcon from "../../icons/MuzaIcon";
import type { SongDetails } from "../../appData/models";

interface CoverProps {
  songDetails: SongDetails;
  onAlbumClicked?: () => void;
  type: "album" | "playlist" | "myAlbum" | "myPlaylist";
  onClick3Dots?: () => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  onClickPlus?: () => void;
  onClickInfo?: () => void;
  songCount?: number;
}

interface MyAlbumButtonProps {
  onClick3Dots?: () => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
}

interface AlbumButtonProps {
  onClick3Dots?: () => void;
  onClickPlus?: () => void;
  onClickInfo?: () => void;
}

const MyButtons: React.FC<MyAlbumButtonProps> = ({
  onClick3Dots,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <div className="my-album-button">
      <button onClick={onClick3Dots}>
        <MuzaIcon iconName="three-dots" />
      </button>
      <button onClick={onClickDelete}>
        <MuzaIcon iconName="delete" />
      </button>
      <button onClick={onClickEdit}>
        <MuzaIcon iconName="edit" />
      </button>
    </div>
  );
};

const AlbumButton: React.FC<AlbumButtonProps> = ({
  onClick3Dots,
  onClickPlus,
  onClickInfo,
}) => {
  return (
    <div className="my-album-button">
      <button onClick={onClick3Dots}>
        <MuzaIcon iconName="three-dots" />
      </button>
      <button onClick={onClickInfo}>
        <MuzaIcon iconName="info" />
      </button>
      <button onClick={onClickPlus}>
        <MuzaIcon iconName="plus" />
      </button>
    </div>
  );
};

interface playlistButtonProps {
  onClick3Dots?: () => void;
}

const PlaylistButtons: React.FC<playlistButtonProps> = ({ onClick3Dots }) => {
  return (
    <div className="my-album-button">
      <button onClick={onClick3Dots}>
        <MuzaIcon iconName="three-dots" />
      </button>
    </div>
  );
};

const MuzaCover: React.FC<CoverProps> = ({
  songDetails,
  onAlbumClicked,
  type,
  onClick3Dots,
  onClickEdit,
  onClickDelete,
  onClickPlus,
  onClickInfo,
  songCount,
}) => {
  console.log(songDetails);
  return (
    <div className="album-cover" onClick={onAlbumClicked}>
      <div className="album-image-container">
        <img src={songDetails.imageSrc} alt={songDetails.title} className="album-image" />

        <div className="album-image-overlay">
          {type === "myAlbum" && (
            <MyButtons
              onClick3Dots={onClick3Dots}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
            />
          )}
          {type === "album" && (
            <AlbumButton
              onClick3Dots={onClick3Dots}
              onClickPlus={onClickPlus}
              onClickInfo={onClickInfo}
            />
          )}
          {type === "myPlaylist" && (
            <MyButtons
              onClick3Dots={onClick3Dots}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
            />
          )}
          {type === "playlist" && (
            <PlaylistButtons onClick3Dots={onClick3Dots} />
          )}

          <div className="album-image-overlay-icon-container">
            <MuzaIcon iconName="play-circle"
            />
          </div>
        </div>
      </div>

      <div className="album-title">{songDetails.title}</div>

      {(type === "album" || type === "myAlbum") && (
        <div className="album-artist">{songDetails.artist}</div>
      )}
      {(type === "playlist" || type === "myPlaylist") && (
        <div className="album-artist">
          {songCount} Songs {songDetails.artist}
        </div>
      )}
    </div>
  );
};

export default MuzaCover;
