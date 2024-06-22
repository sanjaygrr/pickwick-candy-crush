import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import Menu from './components/Menu';
import './App.css';
import logo from './assets/logo.png';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App">
      {!gameStarted ? (
        <Menu onStart={() => setGameStarted(true)} />
      ) : (
        <>
          <header className="App-header">
            <img src={logo} alt="Pickwick Candy Crush" className="logo" />
            <h1>Pickwick Candy Crush</h1>
          </header>
          <GameBoard />
        </>
      )}
    </div>
  );
}

export default App;
