function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar-wrap">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        type="text"
        className="search-input"
        placeholder="Search songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;