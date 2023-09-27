import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Youtube, {YouTubeEvent, YouTubePlayer, YouTubeProps} from 'react-youtube';

function App() {

  const refTest = useRef<HTMLDivElement>(null);

  const onReady = (e: YouTubeEvent) => {
    const iframe = refTest.current?.querySelector("iframe");
    e.target.setVolume(0);
    console.log(iframe);
    setTimeout(() => {
      iframe?.click();
      console.log("왜안됨");
    }, 2000);
  };

  const opts: YouTubeProps['opts'] = {
    height: '300',
    width: '500',
    playerVars: {
      autoplay: 1,
    },
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
          <Youtube videoId="2g811Eo7K8U" opts={opts} onReady={onReady} style={{pointerEvents:"none"}}/>
        </div>
      </header>
    </div>
  );
}

export default App;
