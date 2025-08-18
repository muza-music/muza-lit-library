import React from "react";
import type { UploadFormData, TrackMetadata } from "~/appData/uploadStore";
import type { Album, SongDetails } from "~/appData/models";
import MediaHeader from "~/components/MediaHeader";
import UploadSongLine from "~/components/upload/UploadSongLine";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import "./UploadStepThree.scss";

interface UploadStepThreeProps {
  formData: UploadFormData;
  trackMetadata: TrackMetadata[];
  coverImage: File | null;
  onSave?: () => void;
  onPublish?: () => void;
}

const UploadStepThree: React.FC<UploadStepThreeProps> = ({
  formData,
  trackMetadata,
  coverImage,
  onSave,
  onPublish,
}) => {
  const {
    selectedSong,
    setSelectedSong,
    setIsPlaying,
    isPlaying,
    togglePlayPause,
  } = useCurrentPlayerStore();

  const getCoverImageUrl = () => {
    if (coverImage) {
      return URL.createObjectURL(coverImage);
    }
    return "/art/muza.png"; // Fallback image
  };

  // Transform upload data into Album format
  const transformToAlbum = (): Album => {
    return {
      id: `upload-preview-${Date.now()}`,
      imageSrc: getCoverImageUrl(),
      title: formData.albumTitle || "Untitled Album",
      subTitle: `Album • ${trackMetadata.length} Song${trackMetadata.length !== 1 ? "s" : ""}`,
      artist: formData.mainArtist || "Unknown Artist",
      songs: trackMetadata.map((_, index) => index + 1),
    };
  };

  // Transform track metadata into SongDetails format
  const transformToSongDetails = (): SongDetails[] => {
    return trackMetadata.map((track, index) => {
      // Parse duration string to seconds
      const parseDuration = (durationStr: string): number => {
        if (!durationStr || durationStr === "0:00") return 0;
        const parts = durationStr.split(":");
        if (parts.length === 2) {
          const minutes = parseInt(parts[0]) || 0;
          const seconds = parseInt(parts[1]) || 0;
          return minutes * 60 + seconds;
        }
        return 0;
      };

      return {
        id: track.id,
        index: index + 1,
        title: track.songName || "Untitled",
        artist: track.composer || formData.mainArtist || "Unknown Artist",
        album: formData.albumTitle || "Untitled Album",
        time: parseDuration(track.duration),
        year: new Date().getFullYear(),
        imageSrc: getCoverImageUrl(),
        audioUrl: track.file ? URL.createObjectURL(track.file) : undefined,
      };
    });
  };

  const album = transformToAlbum();
  const songDetails = transformToSongDetails();

  return (
    <div className="upload-step-three">
      <div className="album-preview">
        <MediaHeader 
          media={album} 
          songs={songDetails} 
          mediaType="album"
          showBackButton={false}
        />
        <div className="album-song-list">
          {songDetails.map((song: SongDetails) => (
            <UploadSongLine
              key={song.id}
              details={song}
              onClick={() => {
                if (selectedSong?.id === song.id) {
                  togglePlayPause();
                } else {
                  setSelectedSong(song);
                  setIsPlaying(true);
                }
              }}
              isPlaying={song.id === selectedSong?.id && !!isPlaying}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadStepThree;
