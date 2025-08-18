import "../components/sections/MusicSidebar";
import type { Album } from "~/appData/models";
import MusicListSectionComponent from "~/components/listsDisplays/MusicListSection";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { useMusicLibraryStore } from "~/appData/musicStore";
import { useNavigate } from "react-router";
import { useTranslation } from "~/lib/i18n/translations";

import "../styles/scrollbar.scss";
import "../styles/variables.scss";
import "../styles/main.scss";

export default function Home() {
  const { t } = useTranslation();
  const { selectedSong, setSelectedSong } = useCurrentPlayerStore();
  const { recentlyPlayed, newReleases, artists } = useMusicLibraryStore();

  const navigate = useNavigate();

  const onAlbumClick = (album: Album) => {
    navigate("/album", { state: { album } });
  };

  const handleShowAll = (sectionTitle: string) => {
    switch (sectionTitle) {
      case t("section.newReleases"):
        navigate("/albums");
        break;
      case t("section.recentlyPlayed"):
        navigate("/songs");
        break;
      case t("section.artists"):
        navigate("/artists");
        break;
      default:
        break;
    }
  };

  const sections = [
    {
      title: t("section.newReleases"),
      type: "album" as const,
      albums: newReleases,
    },
    {
      title: t("section.recentlyPlayed"),
      type: "song" as const,
      songs: recentlyPlayed.slice(0, 30),
    },
    {
      title: t("section.artists"),
      type: "artist" as const,
      artists: artists.slice(0, 6),
    },
  ];

  return (
    <main>
      <h1>{t("page.home")}</h1>
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
