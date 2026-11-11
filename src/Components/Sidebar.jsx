
function Sidebar({onHomeClick, onSearchClick, onLibraryClick}) {
  return (
    <div className="sidebar">
      <h2>Spotify</h2>

      <nav>
        <p onClick={onHomeClick}> <b>Home</b></p>
        <p onClick={onSearchClick}> <b>Search</b></p>
        <p onClick={onLibraryClick}> <b>Library</b></p>
      </nav>
    </div>
  );
}

export default Sidebar;
