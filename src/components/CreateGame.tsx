import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { TicTackToeSocketType } from '../utils/SocketService';

interface CreateGameProps {
  userName: string;
  onCreateGameCallback: (gameId: string) => void;
  socket: TicTackToeSocketType;
}

enum GameStatus {
  LOADING = 'Loading Game',
  STARTED = 'Started',
  WAITING_FOR_PLAYERS = 'Waiting for players',
  CANCELLED = 'Cancelling',
}

const CreateGame: React.FC<CreateGameProps> = ({ userName, onCreateGameCallback, socket }) => {
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.LOADING);
  const navigate = useNavigate();
  useEffect(() => {
    const onGameCreated = (gameId: string) => {
      onCreateGameCallback(gameId);
      setGameState(GameStatus.STARTED);
    };

    // place to put socketio code
    if (gameState === GameStatus.LOADING) {
      socket.emit('createGame', userName);
      // just don't listen for GameCreated event twice
      socket.off('gameCreated');
      socket.on('gameCreated', onGameCreated);
    } else if (gameState === GameStatus.CANCELLED) {
      navigate('/');
    }
    return () => {
      socket.off('gameCreated');
    };
  }, [gameState, navigate, socket, userName, onCreateGameCallback]);

  if (!userName) {
    navigate('/');
    return <div />;
  }

  const onCancel = () => {
    setGameState(GameStatus.CANCELLED);
    console.log('Cancelling');
  };

  return (
    <div>
      <h3>Waiting for players...</h3>
      <p>Status {gameState}</p>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
};

export default CreateGame;
