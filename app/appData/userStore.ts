import { create } from "zustand";
import type { Album, SongDetails } from "./models";

type usertore = {
  selectedSong: SongDetails | null;
  selectedPlaListOrAlbum: Album | null;
  setSelectedSong: (song: SongDetails) => void;
  setSelectedPlaListOrAlbum: (album: Album) => void;
};

export const useUserStore = create<usertore>((set) => ({
  selectedSong: null,
  selectedPlaListOrAlbum: null,

  setSelectedSong: (song: SongDetails) => set({ selectedSong: song }),

  setSelectedPlaListOrAlbum: (album: Album) =>
    set({ selectedPlaListOrAlbum: album }),
}));
