import React from 'react';
import './Tile.css';
import waferImg from '../assets/wafer.jpg';
import superPowerImg from '../assets/superPower.png';
import waffleImg from '../assets/waffle.jpg';

const Tile = ({ type, onClick }) => {
  const getImage = () => {
    switch (type) {
      case 'wafer':
        return waferImg;
      case 'superPower':
        return superPowerImg;
      case 'waffle':
        return waffleImg;
      default:
        return null;
    }
  };

  return (
    <div className="tile" onClick={onClick}>
      <img src={getImage()} alt={type} />
    </div>
  );
};

export default Tile;
