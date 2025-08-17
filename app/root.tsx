import { ThemeModeScript } from "flowbite-react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";

import "./app.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MusicSidebar from "./components/sections/MusicSidebar";
import MusicTopbar from "./components/sections/MusicTopbar";
import { useMusicLibraryStore } from "./appData/musicStore";
import { useEffect, useState } from "react";
import { useCurrentPlayerStore } from "./appData/currentPlayerStore";
import MuzaMusicPlayer from "./components/componentsWithLogic/MuzaMusicPlayer";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { setIsPlaying } = useCurrentPlayerStore();
  const sidebarSections = useMusicLibraryStore(
    (state) => state.sidebarSections,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if we're on the upload page
  const isUploadPage = location.pathname === "/routes/upload";

  // Stop music when navigating to upload page
  useEffect(() => {
    if (isUploadPage) {
      setIsPlaying(false);
    }
  }, [isUploadPage, setIsPlaying]);

  useEffect(() => {
    const {
      setNewReleases,
      setFeatured,
      setArtists,
      setRecommended,
      setRecentlyPlayed,
      setPlaylists,
      setSidebarSections,
    } = useMusicLibraryStore.getState();

    const { selectedSong, setSelectedSong } = useCurrentPlayerStore.getState();

    fetch("/staticData/allData.json")
      .then((response) => {
        if (!response.ok) {
          console.log("response not ok");
          fetch("./staticData/allData.json").then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setFeatured(data.albums.featured || []);
        setNewReleases(data.albums.newReleases.slice(0, 5) || []);
        setRecommended(data.albums.recommended || []);
        setArtists(data.artists);
        setRecentlyPlayed(data.songs);
        setPlaylists(data.playlists || []);
        setSidebarSections(data.sidebar.sections);

        if (data.songs.length > 0 && !selectedSong) {
          setSelectedSong(data.songs[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const content = loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error: {error}</p>
  ) : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ThemeModeScript />
      </head>
      <body>
        <div className="body">
          <MusicSidebar
            logoSrc="/icons/muza.svg"
            logoAlt="Music Library"
            sections={sidebarSections}
          />

          <div className="content">
            <MusicTopbar />
            {content || children}
            {!isUploadPage && <MuzaMusicPlayer />}
          </div>
        </div>
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
