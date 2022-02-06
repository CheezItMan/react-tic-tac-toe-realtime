import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameInfo } from '../types';
import './GameList.css';

interface GameListProps {
  games: Array<GameInfo>;
}

const GameList: React.FC<GameListProps> = ({ games }: GameListProps) => {
  const navigate = useNavigate();
  return (
    <div className="game-list">
      {games.map((game) => {
        return (
          <div key={game.id} className="game-list__game-wrapper">
            <div className="game-list__game__join-button">
              {game.status === 'waiting' ? (
                <button className="game-list__game__join-button__button" onClick={() => navigate(`/games/${game.id}`)}>
                  join
                </button>
              ) : (
                game.status
              )}
            </div>
            <div className="game-list__game__info">Host: {game.host}</div>
          </div>
        );
      })}
    </div>
  );
};

export default GameList;
