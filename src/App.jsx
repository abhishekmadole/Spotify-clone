import Sidebar from "./Components/Sidebar";
import Maincontent from "./Components/maincontent";
import Musicplayer from "./Components/musicplayer";
import {useState} from "react";
import { Analytics } from "@vercel/analytics/next"
// the above import analytics is used to enable web analytics for my web applicatiion

import "./App.css";

//Moved playlists array from maincontent to app.jsx so all components can access currrent playlist, prev playlist, next playlist
const playlists = [
        {
            id :1,
            title: "Abhi's Mix",
            description: "My favourite music",
            image: "/images/abhi.jpg",
            song: "/songs/Jhumritalaiyya Jagga Jasoos 128 Kbps.mp3"

        },
        {
            id: 2,
            title: "Chill Hits",
            description: "Relax and listen",
            image: "/images/chill.jpg",
            song: "/songs/Ullu Ka Pattha Jagga Jasoos 128 Kbps.mp3"
        },
        {
            id: 3,
            title: "top picks",
            description: "Popular Songs",
            image: "/images/coding.jpg",
            song: "/songs/Kyon Barfi 128 Kbps.mp3"

        },
        {
            id : 4,
            title: "My Playist",
            description: "Created By me",
            image: "/images/hits.jpg",
            song: "/songs/Galti Se Mistake Jagga Jasoos 128 Kbps.mp3"
        },
        {
            id: 5,
            title: "Coding Beats",
            description: "Music While coding",
            image: "/images/top.jpg",
            song: "/songs/sample.mp3"
        },
        {
            id: 6,
            title: "Workout mix",
            description: "Energy and Motivation",
            image: "/images/workout.jpg",
            song: "/songs/Kar Har Maidaan Fateh Sanju 128 Kbps.mp3"
        }
    ];

function App(){
  const [selectedSong, setSelectedSong] = useState(null);

  const handlenext = () => {
    if(!selectedSong){
      return 
    }

    const currindex = playlists.findIndex(
      playlist => playlist.id == selectedSong.id
    );

    const nxtindex = (currindex + 1)% playlists.length;

    setSelectedSong(playlists[nxtindex]);
  }

  const handleprev =() => {
    if(!selectedSong){
      return;
    }

    const currindex = playlists.findIndex(
     playlist => playlist.id == selectedSong.id
    );

    const previndex = (currindex - 1 + playlists.length) % playlists.length;

    setSelectedSong(playlists[previndex]);

  }

  return (
    <div className="app">
    
      <div className="main-layout">
        <Sidebar/>
        <Maincontent setSelectedSong={setSelectedSong} playlists={playlists} />
      </div>

      <Musicplayer selectedSong={selectedSong} onNext={handlenext} onPrevious={handleprev} />

    </div>
  );
}

export default App;