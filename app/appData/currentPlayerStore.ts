import { create } from "zustand";
import type { Album, SongDetails } from "./models";

type currentPlayerStore = {
  selectedSong: SongDetails | null;
  selectedPlaListOrAlbum: Album | null;
  isPlaying: Boolean;
  playCountIncremented: boolean;
  setIsPlaying: (isPlaying: Boolean) => void;
  setSelectedSong: (song: SongDetails) => void;
  setSelectedPlaListOrAlbum: (album: Album) => void;
  togglePlayPause: () => void;
  setPlayCountIncremented: (incremented: boolean) => void;
};

export const useCurrentPlayerStore = create<currentPlayerStore>((set, get) => ({
  selectedSong: null,
  isPlaying: false,
  selectedPlaListOrAlbum: null,
  playCountIncremented: false,

  setSelectedSong: (song: SongDetails) =>
    set({ selectedSong: song, playCountIncremented: false }),
  setIsPlaying: (play: Boolean) => set({ isPlaying: play }),

  setSelectedPlaListOrAlbum: (album: Album) =>
    set({ selectedPlaListOrAlbum: album }),

  togglePlayPause: () => set({ isPlaying: !get().isPlaying }),

  setPlayCountIncremented: (incremented: boolean) =>
    set({ playCountIncremented: incremented }),
}));
