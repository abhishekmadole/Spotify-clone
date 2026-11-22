
function Navbar({sortOptions, setSortOptions}) {
  return (
    <div className="navbar">
      <div className="navigation-buttons">
        <button>←</button>
        <button>→</button>
      </div>

      <div className="sorting">
        <select
          value={sortOptions}
          onChange={(e) => setSortOptions(e.target.value)}
          >
            <option value="newest">Recently Created</option>
            <option value="oldest">Oldest</option>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
          </select>
      </div>

      <div className="profile">
        <button>Explore Premium</button>
        <button>Profile</button>
      </div>
    </div>
  );
}

export default Navbar;
