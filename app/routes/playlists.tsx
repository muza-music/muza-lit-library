import { useNavigate } from "react-router";
import { useMusicLibraryStore } from "~/appData/musicStore";
import PlaylistGrid from "~/components/listsDisplays/PlaylistGrid";
import CreatePlaylistModal from "~/components/ui/CreatePlaylistModal";
import { useState } from "react";

import "../styles/scrollbar.scss";
import "../styles/variables.scss";
import "../styles/main.scss";

export default function Playlists() {
  const { playlists, createPlaylist } = useMusicLibraryStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlaylistClick = (playlist: any) => {
    // Navigate to individual playlist view - can be implemented later
    console.log("Clicked playlist:", playlist);
  };

  const handleCreatePlaylist = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreatePlaylistSubmit = (name: string, visibility: string) => {
    // Create the new playlist
    const newPlaylist = {
      id: Date.now().toString(), // Simple ID generation
      title: name,
      name,
      visibility,
      songs: [],
      suggestions: [],
      imageSrc: "", // Will be set when songs are added
      createdAt: new Date().toISOString(),
    };

    // Add to store if the function exists
    if (createPlaylist) {
      createPlaylist(newPlaylist);
    }

    console.log("Created playlist:", newPlaylist);
    setIsModalOpen(false);
  };

  return (
    <main>
      <h1>Playlists</h1>
      <hr />

      <PlaylistGrid
        playlists={playlists}
        onPlaylistClick={handlePlaylistClick}
        onCreatePlaylist={handleCreatePlaylist}
      />

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreatePlaylist={handleCreatePlaylistSubmit}
      />
    </main>
  );
}
