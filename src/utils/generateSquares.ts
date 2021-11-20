import { SquareType } from '../types';

export const generateSquares = (): SquareType[] => {
  const squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push({ id: i, value: null });
  }
  return squares;
};