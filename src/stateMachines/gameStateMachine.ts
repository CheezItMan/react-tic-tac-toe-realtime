import { createMachine, EventObject } from 'xstate';
import { SquareType } from '../types';

export enum GameState {
  loggedOut = 'loggedOut',
  loggingIn = 'loggingIn',
  loggedIn = 'loggedIn',
  findingGame = 'findingGame',
  creatingGame = 'creatingGame',
  xTurn = 'xTurn',
  oTurn = 'oTurn',
  endGame = 'endGame',
}

export interface GameEvent extends EventObject {
  user?: string | null;
  role?: string;
  squareId?: number;
}

export interface GameContext {
  user: null | string;
  board: null | SquareType[];
  gameId: null | string;
  webSocket: null | WebSocket;
  role: null | 'x' | 'o';
}

export type GameTypeState = {
  value: GameState;
  context: GameContext;
};

export const gameMachine = createMachine<GameContext, GameEvent, GameTypeState>(
  {
    id: 'tictactoe',
    initial: GameState.loggedOut,
    context: {
      user: null,
      board: null,
      gameId: null,
      webSocket: null,
      role: null,
    },
    states: {
      loggedOut: {
        on: {
          login: {
            target: GameState.loggingIn,
            actions: [],
          },
        },
      },
      loggingIn: {
        on: {
          loginSuccess: GameState.loggedIn,
          loginFailure: GameState.loggedOut,
        },
      },
      loggedIn: {
        on: {
          logout: GameState.loggedOut,
          findGame: GameState.findingGame,
          createGame: GameState.creatingGame,
        },
      },
      findingGame: {
        on: {
          foundGame: GameState.xTurn,
          cancel: GameState.loggedIn,
          logout: GameState.loggedOut,
        },
      },
      creatingGame: {
        on: {
          foundGame: GameState.xTurn,
          cancel: GameState.loggedIn,
          logout: GameState.loggedOut,
        },
      },
      xTurn: {
        on: {
          xMove: {
            target: 'oTurn',
            actions: ['sendMove'],
          },
          logout: 'loggedOut',
          finishGame: 'endGame',
        },
      },
      oTurn: {
        on: {
          oMove: 'xTurn',
          logout: 'loggedOut',
          finishGame: 'endGame',
        },
      },
      endGame: {
        on: {
          findGame: 'findingGame',
          createGame: 'creatingGame',
          logout: 'loggedOut',
        },
      },
    },
  },
);
