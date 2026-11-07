import Sidebar from "./Components/Sidebar";
import Maincontent from "./Components/maincontent";
import Musicplayer from "./Components/musicplayer";
import {useState} from "react";

import "./App.css";

function App(){
  const [selectedSong, setSelectedSong] = useState(null);
  console.log("Selected song in App:", selectedSong);
  return (
    <div className="app">
    
      <div className="main-layout">
        <Sidebar/>
        <Maincontent setSelectedSong={setSelectedSong} />
      </div>

      <Musicplayer selectedSong={selectedSong} />

    </div>
  );
}

export default App;