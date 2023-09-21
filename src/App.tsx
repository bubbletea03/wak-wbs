import React from 'react';
import logo from './logo.svg';
import './App.css';
import Youtube, {YouTubeProps} from 'react-youtube';

function App() {
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

        <Youtube videoId="2g811Eo7K8U"/>
      </header>
    </div>
  );
}

export default App;
