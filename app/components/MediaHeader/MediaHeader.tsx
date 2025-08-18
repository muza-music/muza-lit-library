import React, { useState } from "react";
import "./MediaHeader.scss";
import type { Album, SongDetails, MusicPlaylist, Artist } from "~/appData/models";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { toast } from "react-toastify";
import AlbumInfoModal from "~/components/albumDisplays/AlbumInfoModal";
import { useTranslation } from "~/lib/i18n/translations";

// Import sub-components
import MediaHeaderLayout from "./components/MediaHeaderLayout/MediaHeaderLayout";
import MediaContentSection from "./components/MediaContentSection/MediaContentSection";
import BackButton from "./components/BackButton/BackButton";
import MediaCover from "./components/MediaCover/MediaCover";
import MediaInfo from "./components/MediaInfo/MediaInfo";
import MediaMetadata from "./components/MediaMetadata/MediaMetadata";
import PlayButton from "./components/PlayButton/PlayButton";
import ActionButtonGroup from "./components/ActionButtonGroup/ActionButtonGroup";
import IconActionButton from "./components/IconActionButton/IconActionButton";

interface MediaHeaderProps {
  // Generic media object that works for albums, playlists, etc.
  media: Album | MusicPlaylist | Artist;
  songs: SongDetails[];
  mediaType: 'album' | 'playlist' | 'artist';
  // Optional customization
  showBackButton?: boolean;
  customActions?: React.ReactNode;
}

const MediaHeader: React.FC<MediaHeaderProps> = ({ 
  media, 
  songs, 
  mediaType,
  showBackButton = true,
  customActions 
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

  // Dynamic content based on media type
  const getCreatorInfo = () => {
    switch (mediaType) {
      case 'album':
        return { creator: (media as Album).artist, label: "" };
      case 'playlist':
        return { creator: (media as MusicPlaylist).author || '', label: t("common.by") };
      case 'artist':
        return { creator: '', label: '' }; // Artists don't have creators
      default:
        return { creator: '', label: '' };
    }
  };

  const getMetadataProps = () => {
    switch (mediaType) {
      case 'album':
        const album = media as Album;
        return {
          type: 'album' as const,
          year: album.year,
          songCount: songs.length
        };
      case 'playlist':
        const playlist = media as MusicPlaylist;
        return {
          type: 'playlist' as const,
          songCount: songs.length,
          isPublic: playlist.visibility === 'public'
        };
      case 'artist':
        const artist = media as Artist;
        return {
          type: 'artist' as const,
          followerCount: 0 // Would need to be added to Artist interface
        };
      default:
        return {
          type: 'album' as const,
          songCount: songs.length
        };
    }
  };

  const getPlayButtonText = () => {
    const action = isPlaying ? 'pause' : 'play';
    switch (mediaType) {
      case 'album':
        return isPlaying ? t("common.pause") : t("common.playAlbum");
      case 'playlist':
        return isPlaying ? t("common.pause") : t("common.playPlaylist");
      case 'artist':
        return isPlaying ? t("common.pause") : t("common.playArtist");
      default:
        return isPlaying ? t("common.pause") : t("common.play");
    }
  };

  const { creator, label } = getCreatorInfo();
  const metadataProps = getMetadataProps();

  return (
    <>
      <MediaHeaderLayout hasBackButton={showBackButton}>
        {showBackButton && <BackButton onClick={goBack} />}
        
        <div className="media-header" data-name="Media-Header">
          <MediaContentSection>
            <MediaCover 
              imageSrc={media.imageSrc || ''}
              title={media.title || (media as any).name || ''}
              mediaType={mediaType}
            />
            
            <div className="info-section">
              <div className="titles-section" data-name="Titles">
                <MediaInfo 
                  title={media.title || (media as any).name || ''}
                  creator={creator}
                  creatorLabel={label}
                />
                
                <MediaMetadata {...metadataProps} />

                <div className="actions-section">
                  <PlayButton 
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    text={getPlayButtonText()}
                    disabled={songs.length === 0}
                  />
                  
                  <ActionButtonGroup alignment="end">
                    {customActions || (
                      <>
                        <IconActionButton 
                          iconName="plus" 
                          onClick={addToLibrary}
                          data-name="Add-Download Button"
                        />
                        <IconActionButton 
                          iconName="info" 
                          onClick={() => setModalOpen(true)}
                          data-name="Info Button"
                        />
                        <IconActionButton 
                          iconName="ellipsis"
                          onClick={() => {}}
                          data-name="Menu Button"
                        />
                      </>
                    )}
                  </ActionButtonGroup>
                </div>
              </div>
            </div>
          </MediaContentSection>
        </div>
      </MediaHeaderLayout>

      <AlbumInfoModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default MediaHeader;
