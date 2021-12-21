import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import { useLocalStorage } from './hooks/useLocalStorage';
import { useToggle } from './hooks/useToggle';
import Board from './components/Board';
import CreateGame from './components/CreateGame';
import { SquareType } from './types';
import { generateSquares } from './utils/generateSquares';
import Login from './components/Login';
import useLogin from './hooks/useLogin';

const App: React.FC = () => {
  console.log('username');
  // console.log(userName);
  const [gameId, setGameId] = useState<string | null>(null);
  // const [userName, setUserName] = useLocalStorage<string>('username', '');
  const [currentPlayer, toggleCurrentPlayer] = useToggle<'X' | 'O'>('X', 'O');
  const [userName, performLogin, performLogout] = useLogin();

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

  const notifyDeparture = (oldGameId: string, message: string) => {
    console.log(oldGameId);
    console.log(message);
  };

  const updateGameId = (id: string | null) => {
    if (gameId) {
      notifyDeparture(gameId, 'Leaving the Game for another');
    }
    setGameId(id);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="tic-tac-toe__nav">
          {userName ? `Logged in as ${userName}` : 'Not logged in'}
          <ul className="tic-tac-toe__nav__menu">
            <li className="tic-tac-toe__nav__menu__item home-btn">
              <Button href="/">Home</Button>
            </li>
            {userName == '' ? (
              <li className="tic-tac-toe__nav__menu__item">
                <Button href="/login">Log in</Button>
              </li>
            ) : (
              <li className="tic-tac-toe__nav__menu__item">
                <Button onClick={() => performLogout()}>Log Out</Button>
              </li>
            )}

            {userName !== '' ? (
              <>
                <li className="tic-tac-toe__nav__menu__item">
                  <Button href="/find-game">Find a game</Button>
                </li>
                <li className="tic-tac-toe__nav__menu__item">
                  <Button href="/create-game">Create Game</Button>
                </li>
              </>
            ) : (
              ''
            )}
            {gameId ? (
              <li className="tic-tac-toe__nav__menu__item">
                <Button onClick={() => updateGameId(null)}>Leave Game</Button>
              </li>
            ) : (
              ''
            )}
          </ul>
        </nav>
        <h1>Multi-player Tic Tac Toe</h1>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<p>main screen</p>} />
            <Route path="/game" element={<Board squares={squares} onClickCallback={squareSelected} />} />
            <Route path="/login" element={<Login username={userName} onLoginCallback={performLogin} />} />
            <Route path="/create-game" element={<CreateGame />} />
          </Routes>
        </BrowserRouter>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
