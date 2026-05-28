import { useEffect, useState } from "react";
import songs from "../data/songs";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

function Search({
  search,
  setSearch,
  setCurrentSong,
  playlists = [],
  addSongToPlaylist,
}) {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (playlists.length > 0 && !playlists.some((p) => p.id === selectedPlaylist)) {
      setSelectedPlaylist(playlists[0].id);
    }
    if (playlists.length === 0) {
      setSelectedPlaylist("");
    }
  }, [playlists, selectedPlaylist]);

  const query = search.trim().toLowerCase();

  const filteredSongs = songs.filter((song) =>
    [song.title, song.artist, song.info].some((field) =>
      field.toLowerCase().includes(query)
    )
  );

  const getPlaylistSongIds = () => {
    if (!selectedPlaylist) return [];
    const playlist = playlists.find((p) => p.id === selectedPlaylist);
    return playlist ? playlist.songs.map((s) => s.id) : [];
  };

  const playlistSongIds = getPlaylistSongIds();

  return (
    <div className="main-content">
      <h2>Search</h2>

      <SearchBar search={search} setSearch={setSearch} />

      {playlists.length > 0 ? (
        <div className="playlist-select-row">
          <label htmlFor="playlist-select">Add to playlist</label>
          <select
            id="playlist-select"
            className="playlist-select"
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
          >
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="note-text">Create a playlist first to add songs.</p>
      )}

      <div className="cards-container">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => {
            const isAdded = playlistSongIds.includes(song.id);

            return (
              <Card
                key={song.id}
                image={song.image}
                title={song.title}
                info={song.artist}
                onClick={() => setCurrentSong(song)}
                onAddToPlaylist={
                  playlists.length > 0 && selectedPlaylist
                    ? () => addSongToPlaylist(song, selectedPlaylist)
                    : undefined
                }
                addDisabled={!selectedPlaylist || isAdded}
                isAdded={isAdded}
              />
            );
          })
        ) : (
          <p>No songs found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;