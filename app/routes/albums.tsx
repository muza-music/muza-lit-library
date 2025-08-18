import "../components/sections/MusicSidebar";
import type { Album, SongDetails } from "~/appData/models";
import AlbumDetails from "~/components/albumDisplays/AlbumDetails";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { useMusicLibraryStore } from "~/appData/musicStore";
import { useNavigate } from "react-router";
import { useTranslation } from "~/lib/i18n/translations";

import "../styles/scrollbar.scss";
import "../styles/variables.scss";
import "../styles/main.scss";

export default function Albums() {
  const { t } = useTranslation();
  const { setSelectedSong } = useCurrentPlayerStore();
  const { newReleases, featured, recommended } = useMusicLibraryStore();

  const navigate = useNavigate();

  const onAlbumClick = (album: Album) => {
    navigate("/album", { state: { album } });
  };

  return (
    <main>
      <h1>{t("page.albums")}</h1>

      <hr />
      <h2>{t("section.featuredAlbums")}</h2>
      <div className="album-list">
        {featured.map((a: Album) => (
          <AlbumDetails
            key={a.id}
            details={a}
            onAlbumClick={() => onAlbumClick(a)}
          />
        ))}
      </div>

      <hr />
      <h2>{t("section.newReleases")}</h2>
      <div className="album-list">
        {newReleases.map((a: Album) => (
          <AlbumDetails
            key={a.id}
            details={a}
            onAlbumClick={() => onAlbumClick(a)}
          />
        ))}
      </div>

      <hr />
      <h2>{t("section.recommendedAlbums")}</h2>
      <div className="album-list">
        {recommended.map((a: Album) => (
          <AlbumDetails
            key={a.id}
            details={a}
            onAlbumClick={() => onAlbumClick(a)}
          />
        ))}
      </div>
    </main>
  );
}
