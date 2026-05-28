import songs from "../data/songs";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

function Home({ search, setSearch, setCurrentSong }) {
  const query = search.trim().toLowerCase();

  const filteredSongs = songs.filter((song) =>
    [song.title, song.artist, song.info].some((field) =>
      field.toLowerCase().includes(query)
    )
  );

  return (
    <div className="main-content">
      <h2>Trending Songs</h2>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="cards-container">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <Card
              key={song.id}
              image={song.image}
              title={song.title}
              info={song.artist}
              onClick={() => setCurrentSong(song)}
            />
          ))
        ) : (
          <p>No songs found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;