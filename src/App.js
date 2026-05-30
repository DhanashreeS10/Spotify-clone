import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import songs from "./data/songs";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [playlists, setPlaylists] = useState(() => {
    const stored = localStorage.getItem("playlists");
    return stored ? JSON.parse(stored) : [];
  });
  const [likedSongs, setLikedSongs] = useState(() => {
    const stored = localStorage.getItem("likedSongs");
    return stored ? JSON.parse(stored) : [];
  });
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!currentSong) {
      setCurrentSongIndex(null);
      return;
    }

    const index = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentSongIndex(index >= 0 ? index : null);
  }, [currentSong]);

  const addPlaylist = (name) => {
    const playlistName = name?.trim();
    if (!playlistName) return;

    setPlaylists((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: playlistName, songs: [] },
    ]);
  };

  const addSongToPlaylist = (song, playlistId) => {
    const targetPlaylist = playlists.find(
      (playlist) => playlist.id === playlistId,
    );
    if (!song || !targetPlaylist) return false;

    const alreadyAdded = targetPlaylist.songs.some((s) => s.id === song.id);
    if (alreadyAdded) {
      setToast(`"${song.title}" is already in "${targetPlaylist.name}".`);
      return false;
    }

    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id !== playlistId
          ? playlist
          : { ...playlist, songs: [...playlist.songs, song] },
      ),
    );

    setToast(`Added "${song.title}" to "${targetPlaylist.name}".`);
    return true;
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id !== playlistId
          ? playlist
          : {
              ...playlist,
              songs: playlist.songs.filter((song) => song.id !== songId),
            },
      ),
    );
  };

  const removePlaylist = (playlistId) => {
    setPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId),
    );
  };

  const toggleLike = (song) => {
    setLikedSongs((prev) => {
      const exists = prev.some((s) => s.id === song.id);
      return exists ? prev.filter((s) => s.id !== song.id) : [...prev, song];
    });
  };

  const handleSelectSong = (song) => {
    if (!song) return;
    setCurrentSong(song);
  };

  const handlePlayNext = () => {
    if (currentSongIndex === null || currentSongIndex < 0) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const handlePlayPrev = () => {
    if (currentSongIndex === null || currentSongIndex < 0) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar playlists={playlists} onCreatePlaylist={addPlaylist} />

        <div className="content-area">
          <Navbar />
          {toast && <div className="toast">{toast}</div>}

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  search={search}
                  setSearch={setSearch}
                  setCurrentSong={handleSelectSong}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search
                  search={search}
                  setSearch={setSearch}
                  setCurrentSong={handleSelectSong}
                />
              }
            />
            <Route
              path="/library"
              element={
                <Library
                  playlists={playlists}
                  likedSongs={likedSongs}
                  removeSongFromPlaylist={removeSongFromPlaylist}
                  removePlaylist={removePlaylist}
                  setCurrentSong={handleSelectSong}
                  addSongToPlaylist={addSongToPlaylist}
                  createPlaylist={addPlaylist}
                />
              }
            />
          </Routes>
        </div>

        <MusicPlayer
          currentSong={currentSong}
          onLike={toggleLike}
          likedSongs={likedSongs}
          onPrev={handlePlayPrev}
          onNext={handlePlayNext}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
