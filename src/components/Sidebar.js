import { NavLink } from "react-router-dom";
import { useState } from "react";
import libraryIcon from "../assets/library_icon.png";

function Sidebar({ playlists = [], onCreatePlaylist }) {
  const [playlistName, setPlaylistName] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    const trimmedName = playlistName.trim();
    if (!trimmedName) return;

    onCreatePlaylist(trimmedName);
    setPlaylistName("");
  };

  return (
    <div className="sidebar">
      <div className="nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-option${isActive ? " active" : ""}`}
        >
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) => `nav-option${isActive ? " active" : ""}`}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Search</span>
        </NavLink>

        <NavLink
          to="/library"
          className={({ isActive }) => `nav-option${isActive ? " active" : ""}`}
        >
          <i className="fa-solid fa-book"></i>
          <span>Library</span>
        </NavLink>
      </div>

      <div className="library">
        <div className="library-header">
          <div className="library-title">
            <img src={libraryIcon} alt="Library" />
            <span>Your Library</span>
          </div>
        </div>

        <div className="playlist-section">
          <h4>Create a playlist</h4>
          <p>Give your playlist a name.</p>
          <form className="playlist-form" onSubmit={handleCreate}>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Playlist name"
              className="playlist-input"
            />
            <button
              type="submit"
              className="create-playlist-btn"
              disabled={!playlistName.trim()}
            >
              Create playlist
            </button>
          </form>
        </div>

        <div className="playlist-heading">Previous playlists</div>

        <div className="playlist-list">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <div key={playlist.id} className="playlist-item">
                <span className="playlist-name">{playlist.name}</span>
                <span className="playlist-count">
                  {playlist.songs.length}{" "}
                  {playlist.songs.length === 1 ? "song" : "songs"}
                </span>
              </div>
            ))
          ) : (
            <div className="playlist-empty">No previous playlists yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;