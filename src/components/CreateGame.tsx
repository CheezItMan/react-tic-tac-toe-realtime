import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

interface CreateGameProps {
  userName: string;
  onCreateGameCallback: (gameId: string) => void;
}

enum GameStatus {
  LOADING,
  STARTED,
  WAITING_FOR_PLAYERS,
  CANCELLED,
}

const CreateGame: React.FC<CreateGameProps> = ({ userName, onCreateGameCallback }) => {
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.LOADING);

  const navigate = useNavigate();

  const onCancel = () => {
    setGameState(GameStatus.CANCELLED);
  };

  useEffect(() => {
    // place to put socketio code
    if (gameState === GameStatus.LOADING) {
      setGameState(GameStatus.WAITING_FOR_PLAYERS);
    } else if (gameState === GameStatus.CANCELLED) {
      navigate('/');
    }

    return () => {
      // Place to put closing socketio code
    };
  }, [gameState, navigate]);

  if (gameState === GameStatus.LOADING) {
    return (
      <div>
        <h3>Loading...</h3>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    );
  } else if (gameState === GameStatus.WAITING_FOR_PLAYERS) {
    return (
      <div>
        <h3>Waiting for players...</h3>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    );
  } else {
    navigate('/game');
    return (
      <div>
        <h1>Starting!</h1>
      </div>
    );
  }
};

export default CreateGame;
