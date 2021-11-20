import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToggle } from './hooks/useToggle';
import Board from './components/Board';
import { SquareType } from './types';
import { generateSquares } from './utils/generateSquares';

const App: React.FC = () => {
  const [userName /* setUserName */] = useLocalStorage<string>('username', '');
  const [currentPlayer, toggleCurrentPlayer] = useToggle<'X' | 'O'>('X', 'O');

  const [squares, setSquares] = useState<SquareType[]>(generateSquares());

  const squareSelected = (id: number) => {
    console.log(`Square ${id} clicked!`);

    const newSquares = squares.map((square) => {
      if (square.id === id && !square.value) {
        const newValue = currentPlayer;
        toggleCurrentPlayer();
        return { ...square, value: newValue };
      }
      return square;
    });
    setSquares(newSquares);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="tic-tac-toe__nav">
          <ul className="tic-tac-toe__nav__menu">
            <li className="tic-tac-toe__nav__menu__item home-btn">
              <Button>Home</Button>
            </li>
            {userName == '' ? (
              <li className="tic-tac-toe__nav__menu__item">
                <Button>Log in</Button>
              </li>
            ) : (
              <li className="tic-tac-toe__nav__menu__item">
                <Button>Log Out</Button>
              </li>
            )}
            {userName !== '' ? (
              <li className="tic-tac-toe__nav__menu__item">
                <Button>Find a game</Button>
              </li>
            ) : (
              ''
            )}
          </ul>
        </nav>
        <h1>Multi-player Tic Tac Toe</h1>
      </header>
      <main>
        <Board squares={squares} onClickCallback={squareSelected} />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
