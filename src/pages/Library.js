import songs from "../data/songs";
import { useState } from "react";

function Library({
  playlists = [],
  likedSongs = [],
  removeSongFromPlaylist,
  removePlaylist,
  setCurrentSong,
  addSongToPlaylist,
  createPlaylist,
}) {
  const [openSongId, setOpenSongId] = useState(null);
  const [songQuery, setSongQuery] = useState("");

  const handleCreatePlaylist = () => {
    const name = prompt("Enter playlist name");

    if (!name) return;

    createPlaylist(name);
  };

  const filteredSongs = songs.filter((song) =>
    [song.title, song.artist, song.info].some((field) =>
      field.toLowerCase().includes(songQuery.trim().toLowerCase()),
    ),
  );

  const handleAdd = (song, playlistId) => {
    addSongToPlaylist(song, playlistId);
  };

  return (
    <div className="main-content">
      <h2>Your Library</h2>

      {/* PLAYLIST SECTION */}

      <section className="library-section">
        <div className="section-header">
          <h3>Playlists</h3>

          <button
            type="button"
            className="plus-btn"
            onClick={handleCreatePlaylist}
          >
            +
          </button>
        </div>

        <div className="playlist-vertical-list">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
              <div className="playlist-card-header">
                <div>
                  <h4>{playlist.name}</h4>

                  <p className="playlist-meta">{playlist.songs.length} songs</p>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="playlist-action-row">
                <button
                  type="button"
                  className="playlist-action-btn small-btn"
                  onClick={() =>
                    setOpenSongId(
                      openSongId === playlist.id ? null : playlist.id,
                    )
                  }
                >
                  Add song
                </button>

                <button
                  type="button"
                  className="playlist-action-btn small-btn"
                  onClick={() => removePlaylist(playlist.id)}
                >
                  Remove playlist
                </button>
              </div>

              {/* SEARCH + SONGS */}

              {openSongId === playlist.id && (
                <div className="add-to-playlist-box">
                  <input
                    type="text"
                    className="playlist-input"
                    placeholder="Search song..."
                    value={songQuery}
                    onChange={(e) => setSongQuery(e.target.value)}
                  />

                  {/* SHOW SONG ONLY AFTER SEARCH */}

                  {songQuery.trim() !== "" && (
                    <div className="song-search-list">
                      {filteredSongs.length > 0 ? (
                        filteredSongs.map((song) => {
                          const isAlreadyAdded = playlist.songs.some(
                            (s) => s.id === song.id,
                          );

                          return (
                            <div className="song-search-item" key={song.id}>
                              <div className="song-search-left">
                                <img
                                  src={song.image}
                                  alt={song.title}
                                  className="song-search-img"
                                />

                                <div>
                                  <p className="song-search-title">
                                    {song.title}
                                  </p>

                                  <p className="song-search-artist">
                                    {song.artist}
                                  </p>
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  gap: "0.5rem",
                                }}
                              >
                                <button
                                  className="playlist-action-btn small-btn"
                                  onClick={() => setCurrentSong(song)}
                                >
                                  Play
                                </button>

                                <button
                                  type="button"
                                  className="playlist-action-btn small-btn"
                                  onClick={() => handleAdd(song, playlist.id)}
                                  disabled={isAlreadyAdded}
                                >
                                  {isAlreadyAdded ? "Added" : "Add"}
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="playlist-empty">No songs found.</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* PLAYLIST SONG LIST */}

              <div className="playlist-song-list">
                {playlist.songs.length > 0 ? (
                  playlist.songs.map((song) => (
                    <div key={song.id} className="playlist-song">
                      <div>
                        <button
                          type="button"
                          className="playlist-song-title"
                          onClick={() => setCurrentSong(song)}
                        >
                          {song.title}
                        </button>

                        <div className="playlist-song-artist">
                          {song.artist}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="playlist-action-btn small-btn"
                        onClick={() =>
                          removeSongFromPlaylist(playlist.id, song.id)
                        }
                      >
                        Remove song
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="playlist-empty">
                    No songs in this playlist yet.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIKED SONGS */}

      <section className="library-section">
        <div className="section-header">
          <h3>Liked Songs</h3>
        </div>

        {likedSongs.length > 0 ? (
          likedSongs.map((song) => (
            <div key={song.id} className="playlist-song">
              <div>
                <button
                  type="button"
                  className="playlist-song-title"
                  onClick={() => setCurrentSong(song)}
                >
                  {song.title}
                </button>

                <div className="playlist-song-artist">{song.artist}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No liked songs yet.</p>
        )}
      </section>
    </div>
  );
}

export default Library;
