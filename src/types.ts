
export interface SquareType {
  value: 'X' | 'O' | null;
  id: number;
}

export interface BoardType {
  squares: SquareType[];
}