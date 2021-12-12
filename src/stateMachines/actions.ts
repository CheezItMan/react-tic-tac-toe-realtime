import { assign } from 'xstate';
import { generateSquares } from '../utils/generateSquares';
import { GameContext, GameEvent } from './gameStateMachine';
import { generateSquares } from '../utils/generateSquares';

export const Actions = {
  sendLogin: (ctx: GameContext, loginEvent: GameEvent) => {
    console.log('Logging in', ctx, loginEvent);
  },
  doLogout: assign<GameContext>({
    user: null,
    role: null,
    board: null,
    gameId: null,
  }),
  setUser: assign<GameContext, GameEvent>({
    user: (_: GameContext, event: GameEvent) => {
      if (event.user) {
        return event.user;
      }
      throw new Error('No user provided');
      return null;
    },
  }),
  generateSquares: assign<GameContext>({
    board: () => generateSquares(),
  }),
  assignRole: assign<GameContext>({
    role: (_: GameContext, event: GameEvent) => {
      if (event.role && (event.role === 'x' || event.role === 'o')) {
        return event.role;
      }
      throw new Error('No valid role provided');
      return null;
    },
  }),
  move: (ctx: GameContext, event: GameEvent) => {},
};
