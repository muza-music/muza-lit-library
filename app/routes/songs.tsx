import { useEffect, useState } from "react";
import MusicSidebar from "~/components/sections/MusicSidebar";
import MusicTopbar from "~/components/sections/MusicTopbar";
import SongLine from "~/components/songLineDisplays/SongLine";
import type { SongDetails } from "~/appData/models";
import { useCurrentPlayerStore } from "~/appData/currentPlayerStore";
import { useMusicLibraryStore } from "~/appData/musicStore";
import { useTranslation } from "~/lib/i18n/translations";

import "../styles/scrollbar.scss";
import "../styles/variables.scss";
import "../styles/main.scss";

export default function Songs() {
  const { t } = useTranslation();
  const { setSelectedSong } = useCurrentPlayerStore();
  const { recentlyPlayed, sidebarSections } = useMusicLibraryStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (loading) return <p>{t("general.loading")}</p>;
  if (error)
    return <p>{t("general.errorWithMessage").replace("{error}", error)}</p>;

  return (
    <div className="body">
      <MusicSidebar
        logoSrc="/app/icons/icons/muza.svg"
        logoAlt="Music Library"
        sections={sidebarSections}
      />

      <div className="content">
        <MusicTopbar />

        <main>
          <h1>{t("page.songs")}</h1>
          <hr />
          <div className="song-list">
            {recentlyPlayed.map((s: SongDetails) => (
              <SongLine
                key={s.id}
                details={s}
                onClick={() => setSelectedSong(s)}
                isPlaying={false}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
