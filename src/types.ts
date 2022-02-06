export interface SquareType {
  value: 'X' | 'O' | null;
  id: number;
}

export interface BoardType {
  squares: SquareType[];
}

export interface GameInfo {
  id: string;
  host: string;
  status: 'waiting' | 'started' | 'finished';
}
