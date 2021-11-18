import React from 'react';
import { BoardType } from '../types';
import Square from './Square';
import './Board.css';

interface BoardProps extends BoardType {
  onClickCallback: (id: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClickCallback }) => {
  return (
    <div className="board">
      {squares.map(({ id, value }) => {
        return <Square key={id} id={id} value={value} onClickCallback={onClickCallback} />;
      })}
    </div>
  );
};

export default Board;
