import React from 'react';
import './Menu.css';
import logo from '../assets/logo.png';  // Asegúrate de tener el logo en la carpeta assets

const Menu = ({ onStart }) => {
  return (
    <div className="menu">
      <img src={logo} alt="Pickwick Candy Crush" className="logo" />
      <h1>Pickwick Candy Crush</h1>
      <button onClick={onStart}>Start Game</button>
      <div className="settings">
        <h2>Settings</h2>
        <label>
          Music:
          <input type="checkbox" />
        </label>
        <label>
          Sound Effects:
          <input type="checkbox" />
        </label>
      </div>
    </div>
  );
};

export default Menu;
