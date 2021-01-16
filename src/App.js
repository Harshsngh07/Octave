import React, { useState, useRef } from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //refs
  const audioRef = useRef(null);

  //states
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animatePercent: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  //handlers
  const timeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const currentPercent = Math.round(current);
    const durationPercent = Math.round(duration);
    const animate = Math.round((currentPercent / durationPercent) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animatePercent: animate,
    });
  };

  const songEndedHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song isPlaying={isPlaying} currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />

      <audio
        onTimeUpdate={timeUpdate}
        onLoadedMetadata={timeUpdate}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndedHandler}
      />
    </div>
  );
}

export default App;
