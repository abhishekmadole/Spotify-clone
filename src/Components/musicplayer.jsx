import { useEffect, useState } from "react";

function MusicPlayer({selectedSong, onNext, onPrevious} ) {


const [isPlaying, setisPlaying] = useState(false);// tracks whether the music is playing or not
const [audio, setAudio] = useState(null); ///stores the object that we cam control it later
const [currtime, setCurrtime] = useState(0)
const [duration, setDuration] = useState(0);

useEffect(() => {
  if(audio){
    audio.pause();
    setAudio(null);
    setisPlaying(false);
  }
},[selectedSong])

const handlePlayPause = () => {
  if(!audio){

if(!selectedSong || !selectedSong.song){
  return;
}
    const newAudio = new Audio(selectedSong.song);

    newAudio.addEventListener("loadedmetadata" , () => {
      setDuration(newAudio.duration);
    });

    newAudio.addEventListener("timeupdate" , () => {
      setCurrtime(newAudio.currTime);
    });

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
        <button onClick={onPrevious} disabled={!selectedSong}>⏮</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={onNext} disabled={!selectedSong}>⏭</button>
      </div>

      <div className="volume">
        🔊 Volume
      </div>
    </div>
  );
}

export default MusicPlayer;
