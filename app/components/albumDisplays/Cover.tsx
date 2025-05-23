import React from "react";
import "./AlbumCover.css";

interface AlbumCoverProps {
  imageSrc: string;
  title: string;
  subTitle: string;
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
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.19259 9.62813C8.56078 9.62813 8.85925 9.32966 8.85925 8.96147C8.85925 8.59328 8.56078 8.2948 8.19259 8.2948C7.8244 8.2948 7.52592 8.59328 7.52592 8.96147C7.52592 9.32966 7.8244 9.62813 8.19259 9.62813Z"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.8593 9.62813C13.2274 9.62813 13.5259 9.32966 13.5259 8.96147C13.5259 8.59328 13.2274 8.2948 12.8593 8.2948C12.4911 8.2948 12.1926 8.59328 12.1926 8.96147C12.1926 9.32966 12.4911 9.62813 12.8593 9.62813Z"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.52592 9.62813C3.89411 9.62813 4.19259 9.32966 4.19259 8.96147C4.19259 8.59328 3.89411 8.2948 3.52592 8.2948C3.15773 8.2948 2.85925 8.59328 2.85925 8.96147C2.85925 9.32966 3.15773 9.62813 3.52592 9.62813Z"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button onClick={onClickDelete}>
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_19772_85)">
            <path
              d="M2.11554 4.96147H14.1155M12.7822 4.96147V14.2948C12.7822 14.9615 12.1155 15.6281 11.4489 15.6281H4.78221C4.11554 15.6281 3.44887 14.9615 3.44887 14.2948V4.96147M5.44887 4.96147V3.62813C5.44887 2.96147 6.11554 2.2948 6.78221 2.2948H9.44887C10.1155 2.2948 10.7822 2.96147 10.7822 3.62813V4.96147M6.78221 8.2948V12.2948M9.44887 8.2948V12.2948"
              stroke="#111827"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_19772_85">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(0.11554 0.961487)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button onClick={onClickEdit}>
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.03853 14.2948H14.0385M10.0385 4.29484L12.0385 6.29484M10.9559 3.37616C11.2212 3.11077 11.5812 2.96167 11.9565 2.96167C12.3318 2.96167 12.6918 3.11077 12.9572 3.37616C13.2226 3.64155 13.3717 4.0015 13.3717 4.37683C13.3717 4.75215 13.2226 5.1121 12.9572 5.37749L4.95052 13.3848C4.79192 13.5434 4.59587 13.6594 4.38052 13.7222L2.46585 14.2808C2.40849 14.2976 2.34768 14.2986 2.28979 14.2837C2.2319 14.2689 2.17907 14.2388 2.13682 14.1965C2.09456 14.1543 2.06444 14.1014 2.04961 14.0436C2.03478 13.9857 2.03579 13.9249 2.05252 13.8675L2.61118 11.9528C2.674 11.7377 2.79002 11.5419 2.94852 11.3835L10.9559 3.37616Z"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
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
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.19259 9.62813C8.56078 9.62813 8.85925 9.32966 8.85925 8.96147C8.85925 8.59328 8.56078 8.2948 8.19259 8.2948C7.8244 8.2948 7.52592 8.59328 7.52592 8.96147C7.52592 9.32966 7.8244 9.62813 8.19259 9.62813Z"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.8593 9.62813C13.2274 9.62813 13.5259 9.32966 13.5259 8.96147C13.5259 8.59328 13.2274 8.2948 12.8593 8.2948C12.4911 8.2948 12.1926 8.59328 12.1926 8.96147C12.1926 9.32966 12.4911 9.62813 12.8593 9.62813Z"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.52592 9.62813C3.89411 9.62813 4.19259 9.32966 4.19259 8.96147C4.19259 8.59328 3.89411 8.2948 3.52592 8.2948C3.15773 8.2948 2.85925 8.59328 2.85925 8.96147C2.85925 9.32966 3.15773 9.62813 3.52592 9.62813Z"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button onClick={onClickInfo}>
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_19772_83)">
            <path
              d="M8.11558 11.6282V8.9615M8.11558 6.29483H8.12225M14.7822 8.9615C14.7822 12.6434 11.7975 15.6282 8.11558 15.6282C4.43368 15.6282 1.44891 12.6434 1.44891 8.9615C1.44891 5.2796 4.43368 2.29483 8.11558 2.29483C11.7975 2.29483 14.7822 5.2796 14.7822 8.9615Z"
              stroke="#111827"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_19772_83">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(0.115601 0.961487)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button onClick={onClickPlus}>
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.37164 8.9615H12.705M8.03831 4.29483V13.6282"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
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
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.19259 9.62813C8.56078 9.62813 8.85925 9.32966 8.85925 8.96147C8.85925 8.59328 8.56078 8.2948 8.19259 8.2948C7.8244 8.2948 7.52592 8.59328 7.52592 8.96147C7.52592 9.32966 7.8244 9.62813 8.19259 9.62813Z"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.8593 9.62813C13.2274 9.62813 13.5259 9.32966 13.5259 8.96147C13.5259 8.59328 13.2274 8.2948 12.8593 8.2948C12.4911 8.2948 12.1926 8.59328 12.1926 8.96147C12.1926 9.32966 12.4911 9.62813 12.8593 9.62813Z"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.52592 9.62813C3.89411 9.62813 4.19259 9.32966 4.19259 8.96147C4.19259 8.59328 3.89411 8.2948 3.52592 8.2948C3.15773 8.2948 2.85925 8.59328 2.85925 8.96147C2.85925 9.32966 3.15773 9.62813 3.52592 9.62813Z"
            stroke="#111827"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

const AlbumCover: React.FC<AlbumCoverProps> = ({
  imageSrc,
  title,
  subTitle,
  onAlbumClicked,
  type,
  onClick3Dots,
  onClickEdit,
  onClickDelete,
  onClickPlus,
  onClickInfo,
  songCount,
}) => {
  return (
    <div className="album-cover" onClick={onAlbumClicked}>
      <div className="album-image-container">
        <img src={imageSrc} alt={title} className="album-image" />

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
            <svg
              viewBox="0 0 68 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 34C6 18.536 18.536 6 34 6C49.464 6 62 18.536 62 34C62 49.464 49.464 62 34 62C18.536 62 6 49.464 6 34Z"
                fill="#1D4ED8"
              />
              <path
                d="M25.4327 47.6154C25.1343 47.6154 24.8482 47.4969 24.6372 47.2859C24.4262 47.075 24.3077 46.7888 24.3077 46.4904V21.7404C24.3077 21.5449 24.3586 21.3528 24.4555 21.183C24.5523 21.0132 24.6918 20.8715 24.8601 20.772C25.0283 20.6725 25.2196 20.6185 25.4151 20.6155C25.6106 20.6124 25.8035 20.6604 25.9748 20.7546L48.4748 33.1296C48.6513 33.2267 48.7986 33.3694 48.9011 33.5428C49.0036 33.7162 49.0577 33.9139 49.0577 34.1154C49.0577 34.3168 49.0036 34.5146 48.9011 34.688C48.7986 34.8614 48.6513 35.0041 48.4748 35.1012L25.9748 47.4762C25.8087 47.5675 25.6222 47.6154 25.4327 47.6154Z"
                fill="#F9FAFB"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="album-title">{title}</div>

      {type === "album" ||
        (type === "myAlbum" && <div className="album-artist">{subTitle}</div>)}
      {type === "playlist" ||
        (type === "myPlaylist" && (
          <div className="album-artist">
            {songCount} Songs {subTitle}
          </div>
        ))}
    </div>
  );
};

export default AlbumCover;
