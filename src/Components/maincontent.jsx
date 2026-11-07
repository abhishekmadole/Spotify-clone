import Navbar from "./navbar";
import MusicCard from "./MusicCard";

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

function MainContent({ setSelectedSong }){
    const playlists = [
        {
            id :1,
            title: "Abhi's Mix",
            description: "My favourite music",
            image: "/images/abhi.jpg"
        },
        {
            id: 2,
            title: "Chill Hits",
            description: "Relax and listen",
            image: "/images/chill.jpg"
        },
        {
            id: 3,
            title: "top picks",
            description: "Popular Songs",
            image: "/images/coding.jpg"

        },
        {
            id : 4,
            title: "My Playist",
            description: "Created By me",
            image: "/images/hits.jpg"
        },
        {
            id: 5,
            title: "Coding Beats",
            description: "Music While coding",
            image: "/images/top.jpg"
        },
        {
            id: 6,
            title: "Workout mix",
            description: "Energy and Motivation",
            image: "/images/workout.jpg"
        }
    ];

return(
    <div className="main-content">
        <Navbar/>

        <h1> Welcome back, Cuties!!</h1>

        <div className="music-cards">
            {playlists.map((playlist) => (

                <MusicCard 

                    key={playlist.id}
                    title={playlist.title}
                    description={playlist.description} 
                    image={playlist.image}
                    onClick={() => setSelectedSong(playlist)}
                    />
            ))}
        </div>
    </div>
  );
}



export default MainContent;
