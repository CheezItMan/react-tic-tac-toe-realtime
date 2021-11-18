import React from 'react';
import { render, screen } from '@testing-library/react';
import Board from './Board';
import { generateSquares } from '../utils/generateSquares';

describe('Board', () => {
  test('Board can be rendered', () => {
    const callBackFunction = jest.fn();
    render(<Board squares={generateSquares()} onClickCallback={callBackFunction} />);

    for (let i = 0; i < 9; i++) {
      expect(screen.getByTestId(`square-${i}`)).toBeInTheDocument();
      screen.getByTestId(`square-${i}`).click();
      expect(callBackFunction).toHaveBeenCalled();
      expect(callBackFunction).toHaveBeenCalledWith(i);
    }
  });
});
