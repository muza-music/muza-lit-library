import { useEffect, useState } from "react";
import MusicSidebar from "~/components/sections/MusicSidebar";
import MusicTopbar from "~/components/sections/MusicTopbar";
import ArtistDetails from "~/components/artistDisplays/ArtistDetails";
import { useMusicLibraryStore } from "~/appData/musicStore";
import { useTranslation } from "~/lib/i18n/translations";

import "../styles/scrollbar.scss";
import "../styles/variables.scss";
import "../styles/main.scss";

export default function Artists() {
  const { t } = useTranslation();
  const { artists, sidebarSections } = useMusicLibraryStore();

  return (
    <main>
      <h1>{t("page.artists")}</h1>
      <hr />
      <div className="artist-list">
        {artists.map((artist: any) => (
          <ArtistDetails key={artist.id} details={artist} />
        ))}
      </div>
    </main>
  );
}
