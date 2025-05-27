
import { useEffect } from 'react';
import { useMusicLibraryStore } from '../appData/musicStore';
import { fetchNewReleases, fetchRecentlyPlayed, fetchArtists } from './api';

export function useLoadMusicDataOnMount() {
  const setNewReleases = useMusicLibraryStore((state) => state.setNewReleases);
  const setRecentlyPlayed = useMusicLibraryStore((state) => state.setRecentlyPlayed);
  const setArtists = useMusicLibraryStore((state) => state.setArtists);

  useEffect(() => {
    fetchNewReleases()
      .then((albums) => {
        setNewReleases(albums);
        console.log('New releases loaded:', albums);
      })
      .catch((error) => {
        console.error('Failed to fetch new releases:', error);
      });
  }, [setNewReleases]);

  useEffect(() => {
    fetchRecentlyPlayed()
      .then((songs) => {
        setRecentlyPlayed(songs);
        console.log('Recently played loaded:', songs);
      })
      .catch((error) => {
        console.error('Failed to fetch recently played:', error);
      });
  }, [setRecentlyPlayed]);

  useEffect(() => {
    fetchArtists()
      .then((artists) => {
        setArtists(artists);
        console.log('Artists loaded:', artists);
      })
      .catch((error) => {
        console.error('Failed to fetch artists:', error);
      });
  }, [setArtists]);
}
