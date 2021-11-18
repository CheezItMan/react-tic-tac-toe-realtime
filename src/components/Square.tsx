import React from 'react';
import './Square.css';

interface SquareProps {
  id: number;
  value: string | null;
  onClickCallback: (id: number) => void;
}

const Square = ({ id, value, onClickCallback }: SquareProps) => {
  return (
    <button data-testid={`square-${id}`} className="square" onClick={() => onClickCallback(id)}>
      {value ? <div className="square__value">{value}</div> : ''}
    </button>
  );
};

export default Square;
