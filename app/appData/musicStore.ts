import { create } from "zustand";
import type { Album, Artist, MusicListSection, SongDetails } from "./models";

type musicLibraryStore = {
  newReleases: Album[];
  recentlyPlayed: SongDetails[];
  artists: Artist[];
  labels: Artist[];
  musicSections: MusicListSection[];
};

export const useMusicLibraryStore = create<musicLibraryStore>((set) => ({
  newReleases: [],
  recentlyPlayed: [],
  artists: [],
  labels: [],
  musicSections: [],

  setNewReleases: (albums: Album[]) => set({ newReleases: albums }),

  setRecentlyPlayed: (songs: SongDetails[]) => set({ recentlyPlayed: songs }),

  setArtists: (artists: Artist[]) => set({ artists }),

  setLabels: (labels: Artist[]) => set({ labels }),

  setMusicSections: (sections: MusicListSection[]) =>
    set({ musicSections: sections }),
}));
