import Navbar from "./navbar";
import MusicCard from "./MusicCard";
import MusicPlayer from "./musicplayer";
import { useState, useRef, useEffect } from "react";

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

// function MainContent({ selectedSong, setSelectedSong , playlists}){
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
function MainContent({ selectedSong, setSelectedSong ,playlists = [], activePage, savedPlaylists, toggleSavePlaylist}){
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([]) //Create a state to search from directly Mongodb database through Express search API. 
    
    const searchPlaylists = async () => {

        try {
            const response = await fetch(
                `http://localhost:5000/api/playlists/query/search?search=${encodeURIComponent(searchQuery)}`
            );

            if(!response.ok){
                throw new Error("Failed to search playlists");
            }

            const result = await response.json();
            // console.log(typeof(result))
            // console.log(Object.keys(result).length)
            // console.log("Search API response:", result);
            setSearchResults(result.data);
            
// const result = await response.text();
            
// console.log("Search API response:", result);

        }catch (error) {
            console.error("search error:", error.message)
        }
    };

    //Used the below two functions to display the library and saved playlist when the playlist were saved locally 
    // const filteredPlaylists = playlists.filter((playlist) =>
    //         playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    // const displayedPlaylists = activePage === "library" ? savedPlaylists : filteredPlaylists;

    //Using the below function to Display the playlist in the library and saved playlist by connecting MongoDB to the frontend through the Express API. 
    const displayPlaylists =
        activePage == "library"?
        savedPlaylists 
        : activePage == "search"?
        searchResults
        :playlists 

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (activePage === "search"  && searchQuery.trim() != "") {
            // searchInputRef.current?.focus();
            
            searchPlaylists()
        }else if (activePage === "search"){
            setSearchResults([])
        }
    }, [activePage, searchQuery]); 
    console.log("ok ", activePage);
return(
    <div className="main-content">
        <Navbar/>
    {activePage !== "library" &&  (
        <div className="search-container">
            <input 
                ref={searchInputRef}
                type="text"
                placeholder="search playlists...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )}
        {/* <h1> Welcome back, Cuties!!</h1> */}
        <h1>
                {activePage === "home" && "Welcome back, Cuties!!"}
                {activePage === "search" && "Search Playlists"}
                {activePage === "library" && "Your Library"}
        </h1>
        {/* <div className="music-cards">
           
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
        </div> */}
        {/* <div className="music-cards">
            {(activePage === "library" ? playlists : filteredPlaylists).length > 0 ? (
                (activePage === "library" ? playlists : filteredPlaylists).map((playlist) => (
                    <MusicCard
                        key={playlist.id}
                        title={playlist.title}
                        description={playlist.description}
                        image={playlist.image}
                        onClick={() => setSelectedSong(playlist)}
                        isSelected={selectedSong?.id === playlist.id}
                    />
                )   )
                ) : (
            <p className="no-results">
                No playlists found for "{searchQuery}"
            </p>
            )}
        </div> */}
        <div className="music-cards">
            {displayPlaylists.length > 0 ? (
                displayPlaylists.map((playlist) => (
                    <MusicCard
                        key={playlist._id}
                        title={playlist.title}
                        description={playlist.description}
                        image={playlist.image}
                        onClick={() => setSelectedSong(playlist)}
                        isSelected={selectedSong?._id === playlist._id}

                        isSaved={savedPlaylists.some(
                            saved => saved._id === playlist._id
                        )}

                        onSaveToggle ={() => toggleSavePlaylist(playlist)}
                        />
                    ))
            ):(
                <p className="no-results">
                    {activePage === "library"
                        ? "Your library is empty. save some playlists!"
                        : `No playlists found for "${searchQuery}"`}
                </p>
            )}
        </div>
    </div>
  );
}



export default MainContent;
