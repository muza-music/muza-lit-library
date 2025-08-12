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

## Internationalization (i18n)

Muza includes a built-in translation system that supports multiple languages for all user-facing text.

### Using Translations in Components

Import the `useTranslation` hook in any component to access translated strings:

```jsx
import { useTranslation } from "~/lib/i18n/translations";

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("page.home")}</h1>
      <button>{t("playlist.create")}</button>
      <span>{t("common.unknown")}</span>
    </div>
  );
}
```

### Available Translation Keys

The translation system includes keys for:

- **Navigation**: `nav.home`, `nav.explore`, `nav.playlists`, etc.
- **Page Titles**: `page.home`, `page.explore`
- **Section Titles**: `section.newReleases`, `section.recentlyPlayed`
- **Common Labels**: `common.album`, `common.songs`, `common.unknown`
- **Player Controls**: `player.shuffle`, `player.repeat`, `player.playPause`
- **Forms**: `form.required`, `form.searchPlaceholder`
- **Modals**: `playlist.new`, `playlist.visibility`

### Adding New Languages

1. Create a new translation file in `app/lib/i18n/translations/`:

```typescript
// app/lib/i18n/translations/hebrew.ts
const hebrew = {
  "nav.home": "בית",
  "nav.explore": "גלה",
  "nav.playlists": "רשימות השמעה",
  "nav.albums": "אלבומים",
  "nav.artists": "אמנים",
  "nav.songs": "שירים",
  "page.home": "בית",
  "page.explore": "גלה",
  // ... add all other keys
};

export default hebrew;
```

2. Change language programmatically:

```jsx
function LanguageSwitcher() {
  const { changeLanguage, currentLanguage } = useTranslation();

  return (
    <select
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="english">English</option>
      <option value="hebrew">עברית</option>
    </select>
  );
}
```

### Translation File Structure

```typescript
const english = {
  // Navigation and Sidebar
  "nav.home": "Home",
  "nav.explore": "Explore",

  // Page Titles
  "page.home": "Home",

  // Section Titles
  "section.newReleases": "New Releases",

  // Common Labels
  "common.album": "Album",
  "common.songs": "Songs",

  // Player Controls
  "player.shuffle": "Shuffle",
  "player.repeat": "Repeat",

  // Forms and Inputs
  "form.required": "*",
  "form.searchPlaceholder": "Search...",

  // Modals
  "playlist.new": "New Playlist",
  "playlist.create": "Create",
};

export default english;
```

### Features

- **Fallback Support**: Automatically falls back to English if a translation is missing
- **Dynamic Loading**: Language files are loaded on-demand
- **Type Safety**: No separate types file needed - uses simple key-value pairs
- **Easy Integration**: Works seamlessly with all Muza components

## Documentation

For complete documentation and examples, visit our documentation site.

## Contributing

Contributions are welcome! Please see our **Contributing Guide** for details.

## License

MIT License – See `LICENSE` file for details.
