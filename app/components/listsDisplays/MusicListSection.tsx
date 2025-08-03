import React from "react";
import "./MusicListSection.scss";
import AlbumDetails from "../albumDisplays/AlbumDetails";
import ArtistDetails from "../artistDisplays/ArtistDetails";
import PlaylistCover from "../albumDisplays/PlaylistCover";
import SongLine from "../songLineDisplays/SongLine";
import type {
  MusicListSection,
  Album,
  SongDetails,
  Artist,
} from "~/appData/models";
import { useTranslation } from "~/lib/i18n/translations";

const MusicListSectionComponent: React.FC<
  MusicListSection & {
    onAlbumClick?: (album: Album) => void;
    albums?: Album[];
    songs?: SongDetails[];
    onSongClick?: (song: SongDetails) => void;
    selectedSong?: SongDetails;
    artists?: Artist[];
  }
> = ({
  title,
  subTitle,
  type,
  list,
  onShowAll,
  onAlbumClick,
  albums,
  songs,
  onSongClick,
  selectedSong,
  artists,
}) => {
  const { t } = useTranslation();
  const handleShowAll = () => {
    if (onShowAll) {
      onShowAll(title);
    }
  };

  const renderContent = () => {
    switch (type) {
      case "album":
        return albums!.map((album) => (
          <AlbumDetails
            key={album.id}
            details={album}
            onAlbumClick={() => onAlbumClick?.(album)}
          />
        ));
      case "artist":
        return artists!.map((artist: any) => (
          <ArtistDetails
            key={artist.id}
            details={{
              id: parseInt(artist.id.toString()),
              imageSrc: artist.imageSrc || artist.imageUrl,
              artistName: artist.artistName || artist.name,
              albumsCount: artist.albumsCount.toString(),
            }}
          />
        ));
      case "playlist":
        return list.map((item, idx) => (
          <PlaylistCover
            key={idx}
            albumImages={[item.imageSrc || ""]}
            title={item.title}
            songsCount={item.songsCount?.toString() || ""}
            userName={item.author || t('common.unknown')}
          />
        ));
      case "song":
        return songs!.map((song) => (
          <SongLine
            key={song.id}
            details={song}
            onClick={() => onSongClick?.(song)}
            isPlaying={song.id === selectedSong?.id}
          />
        ));
      default:
        return null;
    }
  };

  // Determine the appropriate CSS class based on type
  const getContentClass = () => {
    switch (type) {
      case "album":
        return "album-list";
      case "artist":
        return "artist-list";
      case "playlist":
        return "album-list"; // Use album-list styling for playlists
      case "song":
        return "song-list";
      default:
        return "album-list";
    }
  };

  return (
    <div className="music-list-section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{title}</h2>
        <button className="show-more-btn" onClick={handleShowAll}>
          Show more
        </button>
      </div>
      {subTitle && <p>{subTitle}</p>}
      <div className={getContentClass()}>{renderContent()}</div>
    </div>
  );
};

export default MusicListSectionComponent;
