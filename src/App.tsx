import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Youtube, {YouTubeEvent, YouTubePlayer, YouTubeProps} from 'react-youtube';

function App() {

  const refTest = useRef<HTMLDivElement>(null);

  const onReady = (e: YouTubeEvent) => {
    e.target.mute();
  };

  const onPlay = (e: YouTubeEvent) => {
    setTimeout(() => {
      e.target.loadVideoById('SPjB51Sy9zY', undefined, undefined);
    }, 5000);
  };

  const opts: YouTubeProps['opts'] = {
    height: '300',
    width: '500',
    playerVars: {
      autoplay: 1,
      // controls: 0,
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
          <Youtube videoId="2g811Eo7K8U" opts={opts} onReady={onReady} onPlay={onPlay}/>
        </div>
      </header>
    </div>
  );
}

export default App;
