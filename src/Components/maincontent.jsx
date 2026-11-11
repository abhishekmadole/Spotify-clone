import Navbar from "./navbar";
import MusicCard from "./MusicCard";
import MusicPlayer from "./musicplayer";
import { useState } from "react";

// function MainContent() {
//   return (
//     <div className="main-content">
//       <Navbar />

//       <h1>Good evening</h1>

//       <div className="music-cards">

     

//         <MusicCard 
//         title="Abhi's Mix"
//         description="Your favourite music"
//         />

//         <MusicCard
//             title="Chill hits"
//             description="relax and listen"
//             />

//         <MusicCard
//             title="Top Picks"
//             description="lets goo"
//             />

//         <MusicCard
//             title="My playist"
//             description="Created by me"
//             />
//       </div>
//     </div>
//   );
// }

function MainContent({ selectedSong, setSelectedSong , playlists}){
    // const playlists = [
    //     {
    //         id :1,
    //         title: "Abhi's Mix",
    //         description: "My favourite music",
    //         image: "/images/abhi.jpg",
    //         song: "/songs/Jhumritalaiyya Jagga Jasoos 128 Kbps.mp3"

    //     },
    //     {
    //         id: 2,
    //         title: "Chill Hits",
    //         description: "Relax and listen",
    //         image: "/images/chill.jpg",
    //         song: "/songs/Ullu Ka Pattha Jagga Jasoos 128 Kbps.mp3"
    //     },
    //     {
    //         id: 3,
    //         title: "top picks",
    //         description: "Popular Songs",
    //         image: "/images/coding.jpg",
    //         song: "/songs/Kyon Barfi 128 Kbps.mp3"

    //     },
    //     {
    //         id : 4,
    //         title: "My Playist",
    //         description: "Created By me",
    //         image: "/images/hits.jpg",
    //         song: "/songs/Galti Se Mistake Jagga Jasoos 128 Kbps.mp3"
    //     },
    //     {
    //         id: 5,
    //         title: "Coding Beats",
    //         description: "Music While coding",
    //         image: "/images/top.jpg",
    //         song: "/songs/sample.mp3"
    //     },
    //     {
    //         id: 6,
    //         title: "Workout mix",
    //         description: "Energy and Motivation",
    //         image: "/images/workout.jpg",
    //         song: "/songs/Kar Har Maidaan Fateh Sanju 128 Kbps.mp3"
    //     }
    // ];

    const [searchQuery, setSearchQuery] = useState("")
    const filteredPlaylists = playlists.filter((playlist) =>
            playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
return(
    <div className="main-content">
        <Navbar/>

        <div className="search-container">
            <input 
                type="text"
                placeholder="search playlists...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        <h1> Welcome back, Cuties!!</h1>

        <div className="music-cards">
            {filteredPlaylists.length > 0 ? (
                filteredPlaylists.map((playlist) => (
                    <MusicCard
                        key={playlist.id}
                        title={playlist.title}
                        description={playlist.description}
                        image={playlist.image}
                        onClick={() => setSelectedSong(playlist)}
                        isSelected={selectedSong?.id === playlist.id}
                    />
                ))
            ) : (
                    <p className="no-results">
                            No playlists found for "{searchQuery}"
                    </p>
            )   }
        </div>
    </div>
  );
}



export default MainContent;
