import { useEffect, useState } from "react";
import styles from "./musicplayer.module.css"

function formattime(time){
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2,"0")}`;
}

function MusicPlayer({selectedSong, onNext, onPrevious} ) {


const [isPlaying, setisPlaying] = useState(false);// tracks whether the music is playing or not
const [audio, setAudio] = useState(null); ///stores the object that we cam control it later
const [currentTime, setCurrentTime] = useState(0)
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
      setCurrentTime(newAudio.currentTime);
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
        <div className="time-info">
          <span className={styles.ct}>{formattime(currentTime)}</span>
          <span className={styles.dt}>{formattime(duration)}</span>
        </div>
        <div className="playercentre">
        <input 
            className={styles.progressbar}
            type="range"
            min="0"
            max={ duration || 0}
            value={currentTime}
            onChange={(e) => {
              const newTime = Number(e.target.value);
              setCurrentTime(newTime);

              if(audio){
                audio.currentTime = newTime;
              }
            }}
            />
        <button className={styles.btnprev} onClick={onPrevious} disabled={!selectedSong}>⏮</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="btnnext" onClick={onNext} disabled={!selectedSong}>⏭</button>
      </div>
      </div>
      <div className="volume">
        🔊 Volume
      </div>
    </div>
  );
}

export default MusicPlayer;
