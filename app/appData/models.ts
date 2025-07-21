export interface SongDetails {
  index?: number;
  title: string;
  time?: number;
  imageSrc?: string;
  artist?: string;
  audioUrl?: string;
  album?: string;
  year?: number;
  id?: string;
}

export interface MenuItem {
  svg: string;
  text: string;
  action?: string;
}

export interface Section {
  title: string;
  items: MenuItem[];
}
export interface Album {
  id: string;
  imageSrc: string;
  title: string;
  subTitle: string;
  artist: string;
  songs?: number[];
  genre?: string;
  year?: number;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  albumsCount: number;
}

interface MusicListItem {
  imageSrc: string;
  title: string;
  subTitle?: string;
  artistName?: string;
  songsCount?: number;
  albumsCount?: number;
}

export type MusicListSection = {
  title: string;
  subTitle?: string;
  type: "album" | "artist" | "playlist" | "song";
  list: MusicListItem[];
  onShowAll?: (sectionTitle: string) => void;
};

export type MusicPlaylist = {
  title: string;
  author: string;
  imageSrc?: string;
  songs: SongDetails[];
  suggestions: SongDetails[];
};

export type PlayerDetails = {
  audioUrl?: string;
  imageSrc?: string;
  isPlaying: Boolean;
  title?: string;
  artist?: string;
  album?: string;
  year?: number;
  id?: string;
};
