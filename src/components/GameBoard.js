import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import Tile from './Tile';
import './GameBoard.css';

const GameBoard = () => {
  const [board, setBoard] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    if (board.length > 0) {
      checkMatches();
    }
  }, [board]);

  const initializeBoard = () => {
    const initialBoard = [];
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        row.push({ id: `${i}-${j}`, type: getRandomTileType() });
      }
      initialBoard.push(row);
    }
    setBoard(initialBoard);
  };

  const getRandomTileType = () => {
    const types = ['wafer', 'superPower', 'waffle'];
    return types[Math.floor(Math.random() * types.length)];
  };

  const handleClick = (tile) => {
    if (selectedTile) {
      const newBoard = [...board];
      const { id: selectedId } = selectedTile;
      const { id: targetId } = tile;

      const [selectedRow, selectedCol] = selectedId.split('-').map(Number);
      const [targetRow, targetCol] = targetId.split('-').map(Number);

      // Check if tiles are adjacent
      if (
        (Math.abs(selectedRow - targetRow) === 1 && selectedCol === targetCol) ||
        (Math.abs(selectedCol - targetCol) === 1 && selectedRow === targetRow)
      ) {
        // Swap tiles
        newBoard[selectedRow][selectedCol] = { ...selectedTile, type: tile.type };
        newBoard[targetRow][targetCol] = { ...tile, type: selectedTile.type };
        
        setBoard(newBoard);

        // Check for matches after swap
        const match = checkMatches(newBoard);
        if (match) {
          setSelectedTile(null);
          return;
        } else {
          // Swap back if no match
          setTimeout(() => {
            newBoard[selectedRow][selectedCol] = { ...tile, type: tile.type };
            newBoard[targetRow][targetCol] = { ...selectedTile, type: selectedTile.type };
            setBoard(newBoard);
            setSelectedTile(null);
          }, 300);
        }
      }
    } else {
      setSelectedTile(tile);
    }
  };

  const checkMatches = (boardToCheck) => {
    let matchFound = false;
    const newBoard = boardToCheck ? [...boardToCheck] : [...board];

    // Check for horizontal matches
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 6; j++) {
        const tile1 = newBoard[i][j];
        const tile2 = newBoard[i][j + 1];
        const tile3 = newBoard[i][j + 2];
        if (tile1 && tile2 && tile3 && tile1.type === tile2.type && tile2.type === tile3.type) {
          matchFound = true;
          newBoard[i][j] = { ...tile1, type: getRandomTileType() };
          newBoard[i][j + 1] = { ...tile2, type: getRandomTileType() };
          newBoard[i][j + 2] = { ...tile3, type: getRandomTileType() };
          setScore((prevScore) => prevScore + 100);
        }
      }
    }

    // Check for vertical matches
    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 6; i++) {
        const tile1 = newBoard[i][j];
        const tile2 = newBoard[i + 1][j];
        const tile3 = newBoard[i + 2][j];
        if (tile1 && tile2 && tile3 && tile1.type === tile2.type && tile2.type === tile3.type) {
          matchFound = true;
          newBoard[i][j] = { ...tile1, type: getRandomTileType() };
          newBoard[i + 1][j] = { ...tile2, type: getRandomTileType() };
          newBoard[i + 2][j] = { ...tile3, type: getRandomTileType() };
          setScore((prevScore) => prevScore + 100);
        }
      }
    }

    if (matchFound) {
      setBoard(newBoard);
      if (score >= 1000) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }

    return matchFound;
  };

  return (
    <div className="game-board-container">
      {showConfetti && <Confetti />}
      <div className="score">Score: {score}</div>
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((tile) => (
              <Tile key={tile.id} type={tile.type} onClick={() => handleClick(tile)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
