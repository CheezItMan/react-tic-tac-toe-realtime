import React from 'react';
import { render, screen } from '@testing-library/react';
import Square from './Square';

describe('Square', () => {
  test('Square displays with no text', () => {
    render(<Square id={32} value={null} onClickCallback={() => {}} />);

    expect(screen.getByTestId('square-32')).toBeInTheDocument();
  });

  test('square displays with text', () => {
    render(<Square id={23} value={'X'} onClickCallback={() => {}} />);

    expect(screen.getByText('X')).toBeInTheDocument();
  });

  test('square invokes callback when clicked', () => {
    const callback = jest.fn();
    render(<Square id={23} value={null} onClickCallback={callback} />);

    screen.getByTestId('square-23').click();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(23);
  });
});
