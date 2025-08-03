import type { Album } from "~/appData/models";
import MusicListSectionComponent from "~/components/listsDisplays/MusicListSection";
import { useMusicLibraryStore } from "~/appData/musicStore";
import { useNavigate } from "react-router";
import { useTranslation } from "~/lib/i18n/translations";

import "../styles/scrollbar.scss";
import "../styles/variables.scss";
import "../styles/main.scss";

export default function Explore() {
  const { t } = useTranslation();
  const { newReleases, featured, recommended } = useMusicLibraryStore();
  const navigate = useNavigate();

  const onAlbumClick = (album: Album) => {
    navigate("/routes/album", { state: { album } });
  };

  const handleShowAll = (sectionTitle: string) => {
    navigate("/routes/albums");
  };

  // Define sections configuration for the loop
  const sections = [
    {
      title: t("section.newReleases"),
      albums: newReleases,
    },
    {
      title: t("section.theClassics"),
      albums: featured,
    },
    {
      title: t("section.uncoveredGems"),
      albums: recommended,
    },
    {
      title: t("nav.albums"),
      albums: featured.concat(recommended),
    },
    {
      title: t("section.theOnesYouMissed"),
      albums: recommended,
    },
  ];

  return (
    <main>
      <h1>{t("page.explore")}</h1>
      <hr />

      {sections.map((section, index) => (
        <div key={section.title}>
          <MusicListSectionComponent
            title={section.title}
            type="album"
            list={section.albums}
            onShowAll={handleShowAll}
            onAlbumClick={onAlbumClick}
            albums={section.albums}
          />
          <hr />
        </div>
      ))}
    </main>
  );
}
