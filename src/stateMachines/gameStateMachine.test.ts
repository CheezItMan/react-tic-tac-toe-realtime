import { interpret, Interpreter } from 'xstate';
import {
  gameMachine,
  GameContext,
  GameEvent,
  GameTypeState,
} from './gameStateMachine';

const gameEvents: GameEvent[] = [
  { type: 'login' },
  { type: 'logout' },
  { type: 'findGame' },
  { type: 'createGame' },
  { type: 'foundGame' },
  { type: 'cancel' },
  { type: 'xMove' },
  { type: 'oMove' },
  { type: 'finishGame' },
];

describe('GameStateMachine tests', () => {
  let gameService: Interpreter<GameContext, any, GameEvent, GameTypeState> =
    interpret(gameMachine).start();

  beforeEach(() => {
    gameService = interpret(gameMachine).start();
  });

  test('The user can log in', () => {
    gameService.send('login');
    expect(gameService.state.value).toBe('loggedIn');
  });

  test('The machine does not respond to any events bug login if logged out', () => {
    const nonLoginEvents = gameEvents.filter((event) => event.type !== 'login');

    nonLoginEvents.forEach((event) => {
      gameService.send(event);
      expect(gameService.state.value).toBe('loggedOut');
    });
  });

  test('when logged out the user can log in', () => {
    gameService.send('login');
    expect(gameService.state.value).toBe('loggedIn');
  });
});
