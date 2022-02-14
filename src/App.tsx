import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Route, Routes, useNavigate, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import { useLocalStorage } from './hooks/useLocalStorage';
import { useToggle } from './hooks/useToggle';
import Board from './components/Board';
import GameList from './components/GameList';
import CreateGame from './components/CreateGame';
import { SquareType } from './types';
import { generateSquares } from './utils/generateSquares';
import Login from './components/Login';
import useLogin from './hooks/useLogin';
import { createSocket, TicTackToeSocketType } from './utils/SocketService';
import { GameInfo } from './types';
import Game from './components/Game';

import games from './games.json';

const App: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [currentPlayer, toggleCurrentPlayer] = useToggle<'X' | 'O'>('X', 'O');

  const [socket] = useState<TicTackToeSocketType>(createSocket('http://localhost:3001'));
  const [userName, performLogin, performLogout] = useLogin(socket);
  const [connected, setConnected] = useState<boolean>(false);

  const [squares, setSquares] = useState<SquareType[]>(generateSquares());

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
    });
  }, [socket]);

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
      <BrowserRouter>
        <header className="App-header">
          <nav className="tic-tac-toe__nav">
            {userName ? `Logged in as ${userName}` : 'Not logged in'}
            <ul className="tic-tac-toe__nav__menu">
              <li className="tic-tac-toe__nav__menu__item home-btn">
                <Button href="/">Home</Button>
              </li>
              {userName == '' ? (
                <li className="tic-tac-toe__nav__menu__item">
                  {connected ? (
                    <Link to="/login">
                      <Button>Log in</Button>
                    </Link>
                  ) : (
                    ''
                  )}
                </li>
              ) : (
                <li className="tic-tac-toe__nav__menu__item">
                  <Button onClick={() => performLogout()}>Log Out</Button>
                </li>
              )}

              {userName !== '' ? (
                <>
                  <li className="tic-tac-toe__nav__menu__item">
                    <Link className="button" to="/list-games">
                      <Button>Find a game</Button>
                    </Link>
                  </li>
                  <li className="tic-tac-toe__nav__menu__item">
                    <Link to="/create-game">
                      <Button>Create Game</Button>
                    </Link>
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
          <Routes>
            <Route path="/" element={<p>main screen</p>} />
            <Route path="/game" element={<Board squares={squares} onClickCallback={squareSelected} />} />
            <Route
              path="/login"
              element={<Login username={userName} onLoginCallback={performLogin} connected={connected} />}
            />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/list-games" element={<GameList games={games as GameInfo[]} />} />
            <Route path="/game/:gameId" element={<Game socket={socket} />} />
          </Routes>
        </main>
        <footer></footer>
      </BrowserRouter>
    </div>
  );
};

export default App;
