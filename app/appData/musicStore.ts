import { create } from "zustand";
import type {
  Album,
  Artist,
  MusicListSectionType,
  SongDetails,
} from "./models";

type musicLibraryStore = {
  newReleases: Album[];
  recentlyPlayed: SongDetails[];
  artists: Artist[];
  labels: Artist[];
  musicSections: MusicListSectionType[];

  // ✅ Add setter definitions:
  setNewReleases: (albums: Album[]) => void;
  setRecentlyPlayed: (songs: SongDetails[]) => void;
  setArtists: (artists: Artist[]) => void;
  setLabels: (labels: Artist[]) => void;
  setMusicSections: (sections: MusicListSectionType[]) => void;
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

  setMusicSections: (sections: MusicListSectionType[]) =>
    set({ musicSections: sections }),
}));
