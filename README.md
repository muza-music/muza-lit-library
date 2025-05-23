# Muza - React Music Player UI Library

![Muza Library Screenshot](public/art/muza.png)

1. ContextMenu and MuzaContainer and MuzaButton
   <ContextMenu>
   <ContextMenuTrigger>
   <MuzaButton content="•••" />
   </ContextMenuTrigger>
   <ContextMenuContent>
   <MuzaContainer>context menu </MuzaContainer>
   </ContextMenuContent>
   </ContextMenu>

## Overview

**Muza** is a modern React component library for building music player interfaces. This library provides a comprehensive set of components to create beautiful and functional music applications with minimal effort.

## Features

- **Rich Component Library**: Display songs, albums, playlists, and artists with pre-styled components
- **Player Controls**: Full-featured music player with progress bar and playback controls
- **Navigation Components**: Sidebar navigation and top search bar
- **Context Menus**: Right-click functionality for additional options
- **Customization**: Easy styling with CSS variables
- **Responsive Design**: Components work across different screen sizes

## Installation

```bash
npm install muza-react-library
```

## Usage

### Music Player

```jsx
import { MusicPlayer } from "muza-react-library";

<MusicPlayer
  details={{
    audioUrl: "song.mp3",
    imageSrc: "album.jpg",
    title: "Song Title",
    artist: "Artist Name",
    album: "Album Name",
    year: 2023,
    isPlaying: true,
  }}
  onPrevious={() => console.log("Previous")}
  onNext={() => console.log("Next")}
/>;
```

### Song Components

```jsx
import { SongLine, PlaylistItem } from 'muza-react-library';

<SongLine
  details={{
    index: 1,
    title: "Song Title",
    time: 180,
    artist: "Artist Name",
    imageSrc: "album.jpg"
  }}
  onClick={handleSongClick}
/>

<PlaylistItem
  details={{
    index: 1,
    title: "Playlist Song",
    artist: "Artist Name",
    imageSrc: "album.jpg"
  }}
/>
```

### Navigation Components

```jsx
import { MusicSidebar, MusicTopbar } from 'muza-react-library';

<MusicSidebar
  logoSrc="logo.jpg"
  logoAlt="Music App"
  sections={[
    {
      title: "My Music",
      items: [
        { icon: "house", text: "Home" },
        { icon: "search", text: "Explore" }
      ]
    }
  ]}
/>

<MusicTopbar
  onSearchChange={(term) => console.log(`Searching for: ${term}`)}
  onUserIconClick={() => console.log('User profile clicked')}
/>
```

### Album and Playlist Displays

```jsx
import { MusicListSection, MuzaMusicPlaylist } from 'muza-react-library';

<MusicListSection
  title="Featured Albums"
  type="album"
  list={[
    {
      imageSrc: "album1.jpg",
      title: "Album Title",
      subTitle: "Artist Name"
    }
  ]}
  onShowAll={() => console.log('Show all albums')}
/>

<MuzaMusicPlaylist
  title="My Playlist"
  author="User Name"
  imageSrc="playlist.jpg"
  songs={songs}
  suggestions={recommendedSongs}
/>
```

## Documentation

For complete documentation and examples, visit our documentation site.

## Contributing

Contributions are welcome! Please see our **Contributing Guide** for details.

## License

MIT License – See `LICENSE` file for details.
