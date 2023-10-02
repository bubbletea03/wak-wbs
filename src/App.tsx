import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Youtube, {YouTubeEvent, YouTubePlayer, YouTubeProps} from 'react-youtube';

function App() {

  const refTest = useRef<HTMLDivElement>(null);

  const onReady = (e: YouTubeEvent) => {
  };

  const [isPlaying, setIsPlaying] = useState(false);
  
  // TODO 현재 시각에 동기화하여, 현재 시각에 일치하는 동영상을 재생위치에 맞게 틀어줘야 함
  const currentVideoId = 'lM-G5ScFOEw';
  
  
  
  const onPlay = (e: YouTubeEvent) => {
    if ( ! isPlaying) {
      setIsPlaying(true);
      e.target.loadVideoById(currentVideoId, 30, undefined);
    }
  };

  const opts: YouTubeProps['opts'] = {
    height: '300',
    width: '500',
    playerVars: {
      controls: 0,
    }
  };

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

        <div ref={refTest}>
          <Youtube videoId="2g811Eo7K8U" opts={opts} onReady={onReady} onPlay={onPlay} onPause={(e) => e.target.playVideo()}/>
        </div>
      </header>
    </div>
  );
}

export default App;
