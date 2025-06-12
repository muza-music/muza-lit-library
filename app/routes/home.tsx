import "../components/sections/MusicSidebar";
import type { Album } from "~/appData/models";
import MusicListSectionComponent from "~/components/listsDisplays/MusicListSection";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { useMusicLibraryStore } from "~/appData/musicStore";
import { useNavigate } from "react-router";

import "../styles/scrollbar.css";
import "../styles/variables.css";
import "../styles/main.css";

export default function Home() {
  const { selectedSong, setSelectedSong } = useCurrentPlayerStore();
  const { recentlyPlayed, newReleases, artists } = useMusicLibraryStore();

  const navigate = useNavigate();

  const onAlbumClick = (album: Album) => {
    navigate("/routes/album", { state: { album } });
  };

  const handleShowAll = (sectionTitle: string) => {
    switch (sectionTitle) {
      case "New Releases":
        navigate("/routes/albums");
        break;
      case "Recently Played":
        navigate("/routes/songs");
        break;
      case "Artists":
        navigate("/routes/artists");
        break;
      default:
        break;
    }
  };

  const sections = [
    {
      title: "New Releases",
      type: "album" as const,
      albums: newReleases,
    },
    {
      title: "Recently Played",
      type: "song" as const,
      songs: recentlyPlayed.slice(0, 30),
    },
    {
      title: "Artists",
      type: "artist" as const,
      artists: artists.slice(0, 6),
    },
  ];

  return (
    <main>
      <h1>Home</h1>
      <hr />

      {sections.map((section, index) => (
        <div key={section.title}>
          {section.type === "album" && (
            <MusicListSectionComponent
              title={section.title}
              type="album"
              list={section.albums}
              onShowAll={handleShowAll}
              onAlbumClick={onAlbumClick}
              albums={section.albums}
            />
          )}
          {section.type === "artist" && (
            <MusicListSectionComponent
              title={section.title}
              type="artist"
              list={[]}
              onShowAll={handleShowAll}
              artists={section.artists}
            />
          )}
          {section.type === "song" && (
            <MusicListSectionComponent
              title={section.title}
              type="song"
              list={[]}
              onShowAll={handleShowAll}
              songs={section.songs}
              onSongClick={setSelectedSong}
              selectedSong={selectedSong || undefined}
            />
          )}
          <hr />
        </div>
      ))}
    </main>
  );
}
