import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Youtube, {YouTubeEvent, YouTubePlayer, YouTubeProps} from 'react-youtube';

function App() {

  const [isPlayerSelected, setIsPlayerSelected] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer>();

  const onReady = (e: YouTubeEvent) => {
    console.log("Ready!");
    setIsPlayerSelected(true);
    setPlayer(e.target);
  };

  const opts: YouTubeProps['opts'] = {
    height: '300',
    width: '500',
    playerVars: {
      controls: 0,
    },
  };

  useEffect(() => {
    if(isPlayerSelected) {
      console.log("ㅇㅇ");
    } 
  }, [player]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Youtube videoId="2g811Eo7K8U" opts={opts} onReady={onReady}/>
      </header>
    </div>
  );
}

export default App;
