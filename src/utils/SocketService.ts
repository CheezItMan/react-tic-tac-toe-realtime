import { nextTick } from 'process';
import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
  loggedIn: (username: string, id: string) => void;
  loggedOut: () => void;
  joinGameStatus: (
    status: 'success' | 'failure' | 'pending',
    playerLetter: 'X' | 'O',
  ) => void;
  gameStatus: (board: Buffer) => void;
}

interface ClientToServerEvents {
  login: (username: string) => void;
  logout: () => void;
  joinGame: (gameId: string) => void;
  makeMove: (gameId: string, move: number) => void;
}

// prettier-ignore
export type TicTackToeSocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

export const createSocket: (
  url: string,
) => Socket<ServerToClientEvents, ClientToServerEvents> = (url: string) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url);
  return socket;
};
