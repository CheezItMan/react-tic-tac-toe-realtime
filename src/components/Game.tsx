import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { TicTackToeSocketType } from '../utils/SocketService';
import Board from './Board';
import { useNavigate } from 'react-router-dom';
import { BoardType, SquareType } from '../types';

type GameStatusType = 'loading' | 'waiting' | 'currentTurn' | 'finished';
interface GameProps {
  socket: TicTackToeSocketType;
}

type JoinGameStatusType = 'success' | 'failure' | 'pending';
type PlayerLetterType = 'X' | 'O';

const generateSquares: () => SquareType[] = () => {
  const squares = [];
  for (let i = 1; i <= 9; i++) {
    squares.push({
      value: null,
      id: i,
    });
  }
  return squares;
};

const Game: React.FC<GameProps> = ({ socket }) => {
  const [gameStatus, setGameStatus] = useState<GameStatusType>('loading');
  const [currentPlayerLetter, setPlayerLetter] = useState<PlayerLetterType | undefined>(undefined);
  const [squares, setSquares] = useState<SquareType[]>(generateSquares());

  const navigate = useNavigate();
  const { gameId } = useParams<string>();
  if (!gameId) {
    navigate('/');
  }

  useEffect(() => {
    socket.on('gameStatus', (board: Buffer) => {
      // Look at the buffer and update the board accordingly
      console.log(board);
      console.log(JSON.stringify(board));
    });

    socket.on('joinGameStatus', (status: JoinGameStatusType, playerLetter: PlayerLetterType) => {
      setPlayerLetter(playerLetter);
      if (status === 'success' && playerLetter === 'X') {
        setGameStatus('currentTurn');
      } else if (status === 'success') {
        setGameStatus('waiting');
      }
    });

    if (gameId) {
      socket.emit('joinGame', gameId);
    }
  }, [socket, gameId]);

  const updateBoard = (id: number) => {
    if (gameStatus === 'currentTurn') {
      const newSquares = [...squares];

      for (let i = 0; i < newSquares.length; i++) {
        if (
          id === newSquares[i].id &&
          newSquares[i].value === null &&
          currentPlayerLetter !== undefined &&
          gameId !== undefined
        ) {
          newSquares[i].value = currentPlayerLetter;
          socket.emit('makeMove', gameId, id);
          setGameStatus('waiting');
        }
      }
    }
  };

  if (gameStatus === 'loading') {
    return <div>{gameStatus}</div>;
  }

  if (gameStatus === 'waiting' || gameStatus === 'currentTurn' || gameStatus === 'finished') {
    return (
      <div>
        <Board squares={squares} onClickCallback={updateBoard} />
      </div>
    );
  }
  return <div>Undefined Game state</div>;
};

export default Game;
