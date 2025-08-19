import React, { useState } from "react";
import "./MediaHeader.scss";
import type {
  Album,
  SongDetails,
  MusicPlaylist,
  Artist,
} from "~/appData/models";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { toast } from "react-toastify";
import AlbumInfoModal from "~/components/albumDisplays/AlbumInfoModal";
import { useTranslation } from "~/lib/i18n/translations";

// Import remaining sub-components
import MediaCover from "./components/MediaCover/MediaCover";
import MediaMetadata from "./components/MediaMetadata/MediaMetadata";
import MuzaButton from "~/controls/MuzaButton";
import { FaPause, FaPlay } from "react-icons/fa";

interface MediaHeaderProps {
  // Generic media object that works for albums, playlists, etc.
  media: Album | MusicPlaylist | Artist;
  songs: SongDetails[];
  mediaType: "album" | "playlist" | "artist";
  // Optional customization
  showBackButton?: boolean;
  customActions?: React.ReactNode;
}

const MediaHeader: React.FC<MediaHeaderProps> = ({
  media,
  songs,
  mediaType,
  showBackButton = true,
  customActions,
}) => {
  const { t } = useTranslation();
  const {
    selectedSong,
    setSelectedSong,
    setSelectedPlaListOrAlbum,
    isPlaying,
    setIsPlaying,
  } = useCurrentPlayerStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const addToLibrary = () => {
    toast(t(`${mediaType}.addedToLibrary`), {
      position: "bottom-center",
      hideProgressBar: true,
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      // If currently playing, pause
      setIsPlaying(false);
    } else {
      // If not playing, start playing the media
      if (songs.length > 0) {
        setSelectedSong(songs[0]);
        setSelectedPlaListOrAlbum(media);
        setIsPlaying(true);
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };

  // Helper function to safely get title
  const getMediaTitle = () => {
    if (mediaType === "artist") {
      return (media as Artist).name || "";
    }
    return (media as Album | MusicPlaylist).title || "";
  };

  // Helper function to safely get image
  const getMediaImageSrc = () => {
    if (mediaType === "artist") {
      return (media as Artist).imageUrl || "";
    }
    return (media as Album | MusicPlaylist).imageSrc || "";
  };

  // Dynamic content based on media type
  const getCreatorInfo = () => {
    switch (mediaType) {
      case "album":
        return { creator: (media as Album).artist, label: "" };
      case "playlist":
        return {
          creator: (media as MusicPlaylist).author || "",
          label: t("common.by"),
        };
      case "artist":
        return { creator: "", label: "" }; // Artists don't have creators
      default:
        return { creator: "", label: "" };
    }
  };

  const getMetadataProps = () => {
    switch (mediaType) {
      case "album":
        const album = media as Album;
        return {
          type: "album" as const,
          year: album.year,
          songCount: songs.length,
        };
      case "playlist":
        const playlist = media as MusicPlaylist;
        return {
          type: "playlist" as const,
          songCount: songs.length,
          isPublic: playlist.visibility === "public",
        };
      case "artist":
        const artist = media as Artist;
        return {
          type: "artist" as const,
          followerCount: 0, // Would need to be added to Artist interface
        };
      default:
        return {
          type: "album" as const,
          songCount: songs.length,
        };
    }
  };

  const getPlayButtonText = () => {
    const action = isPlaying ? "pause" : "play";
    switch (mediaType) {
      case "album":
        return isPlaying ? t("common.pause") : t("common.playAlbum");
      case "playlist":
        return isPlaying ? t("common.pause") : t("common.playPlaylist");
      case "artist":
        return isPlaying ? t("common.pause") : t("common.playArtist");
      default:
        return isPlaying ? t("common.pause") : t("common.play");
    }
  };

  const { creator, label } = getCreatorInfo();
  const metadataProps = getMetadataProps();

  return (
    <>
      <div
        className={`media-header-layout ${showBackButton ? "has-back-button" : ""}`}
      >
        {showBackButton && (
          <div className="back-close-section" data-name="back & close">
            <MuzaButton
              iconName="ChevronDown"
              onClick={goBack}
              size="small"
              className="back-button"
              data-name="back"
            />
          </div>
        )}

        <div className="media-header" data-name="Media-Header">
          <div className="media-content-section media-content-section--horizontal">
            <MediaCover
              imageSrc={getMediaImageSrc()}
              title={getMediaTitle()}
              mediaType={mediaType}
            />

            <div className="info-section">
              <div className="titles-section" data-name="Titles">
                <div className="title-metadata-group">
                  {/* MediaInfo content inlined */}
                  <div className="title-info title-info--left">
                    <div className="album-title">{getMediaTitle()}</div>
                    {creator && (
                      <div className="creator-name">
                        {label && `${label} `}
                        {creator}
                      </div>
                    )}
                  </div>

                  <MediaMetadata {...metadataProps} />
                </div>

                <div className="actions-section">
                  {/* PlayButton content inlined */}
                  <div className="ctas-section" data-name="CTAs">
                    <button
                      className="play-album-button"
                      onClick={handlePlayPause}
                      disabled={songs.length === 0}
                      data-name="Button"
                    >
                      <div className="play-icon">
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </div>
                      <span className="play-text">{getPlayButtonText()}</span>
                    </button>
                  </div>

                  {/* ActionButtonGroup content inlined */}
                  <div className="action-buttons action-buttons--end action-buttons--gap-medium">
                    {customActions || (
                      <>
                        <MuzaButton
                          iconName="plus"
                          onClick={addToLibrary}
                          size="medium"
                          data-name="Add-Download Button"
                        />
                        <MuzaButton
                          iconName="info"
                          onClick={() => setModalOpen(true)}
                          size="medium"
                          data-name="Info Button"
                        />
                        <MuzaButton
                          iconName="ellipsis"
                          onClick={() => {}}
                          size="medium"
                          data-name="Menu Button"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlbumInfoModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default MediaHeader;
