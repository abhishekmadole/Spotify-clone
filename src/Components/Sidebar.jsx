
function Sidebar({onHomeClick, onSearchClick, onLibraryClick, activePage}) {
  return (
    <div className="sidebar">
      <h2>Spotify</h2>

      <nav>
        <p 
        className={activePage === "home"? "active" : ""}
        onClick={onHomeClick}> 
        <b>Home</b>
        </p>
        <p 
        className={activePage === "search"? "active": ""}
        onClick={onSearchClick}> 
        <b>Search</b>
        </p>
        <p 
        className={activePage === "library"? "active" : ""}
        onClick={onLibraryClick}> 
        <b>Library</b>
        </p>
      </nav>
    </div>
  );
}

export default Sidebar;
