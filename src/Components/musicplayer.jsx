import { useState } from "react";

function MusicPlayer({selectedSong}) {


const [isPlaying, setisPlaying] = useState(false);// tracks whether the music is playing or not
const [audio, setAudio] = useState(null); ///stores the object that we cam control it later
const handlePlayPause = () => {
  if(!audio){
    const newAudio = new Audio("/songs/sample.mp3");

    newAudio.onended = () => {
      setisPlaying(false);
    };
    
    setAudio(newAudio);
    newAudio.play();
    setisPlaying(true);
  }
  else if (isPlaying){
    audio.pause();
    setisPlaying(false);
  }
  else{
    audio.play();
    setisPlaying(true);
  }
};
  return (
    <div className="music-player">
      <div className="song-info">
        {selectedSong && (
        <img
            className="player-image"
            src={selectedSong.image}
            alt={selectedSong.title}
          />
          )}
        <h4>{selectedSong? selectedSong.title : "no song selected"} </h4>
        <p>{selectedSong? selectedSong.description : "Select a playlist to start" }</p>
      </div>

      <div className="player-controls">
        <button>⏮</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button>⏭</button>
      </div>

      <div className="volume">
        🔊 Volume
      </div>
    </div>
  );
}

export default MusicPlayer;
