import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { TicTackToeSocketType } from '../utils/SocketService';

export default function useLogin(
  socket: TicTackToeSocketType,
): [string, (username: string) => void, () => void] {
  const [username, setUsername] = useState<string>('');

  const performLogin = async (newUsername: string): Promise<void> => {
    socket.emit('login', newUsername);

    socket.on('loggedIn', (loggedInUserName: string, id: string) => {
      setUsername(loggedInUserName);
      console.log(`User id: ${id} is logged in`);
    });
  };

  const performLogout = () => {
    setUsername('');
    socket.emit('logout');
  };

  return [username, performLogin, performLogout];
}
