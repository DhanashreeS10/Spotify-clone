function Card({
  image,
  title,
  info,
  onClick,
  onAddToPlaylist,
  addDisabled,
  isAdded,
}) {
  const handleKeyDown = (event) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="card"
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <img src={image} alt={title} className="card-img" />

      <p className="card-title">{title}</p>

      <p className="card-info">{info}</p>

      {onAddToPlaylist && (
        <button
          type="button"
          className={`card-add-btn ${isAdded ? "added" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!addDisabled) {
              onAddToPlaylist();
            }
          }}
          disabled={addDisabled}
        >
          {isAdded ? "Added" : "Add"}
        </button>
      )}
    </div>
  );
}

export default Card;
