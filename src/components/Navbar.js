import { useNavigate } from "react-router-dom";
import spotifyLogo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="sticky-nav">
      <div className="sticky-nav-icons">
        <button
          type="button"
          className="nav-item"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() => navigate(1)}
          aria-label="Go forward"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div className="spotify-brand">
  <img src={spotifyLogo} alt="Spotify logo" className="spotify-logo" />
  <span>Spotify</span>
</div>

      <div className="sticky-nav-options">
        <button type="button" className="badge dark-badge">
          Explore Premium
        </button>
        <button type="button" className="badge dark-badge">
          Install App
        </button>
      </div>
    </div>
  );
}

export default Navbar;