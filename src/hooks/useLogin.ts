import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';

export default function useLogin(): [
  string,
  (username: string) => void,
  () => void,
] {
  const [username, setUsername] = useState<string>('');

  const performLogin = async (newUsername: string): Promise<void> => {
    try {
      console.log(API_URL);
      const response = await axios.post(`${API_URL}/player/v1`, {
        name: newUsername,
      });
      if (response.status === 200 || response.status === 201) {
        // on success set state
        setUsername(newUsername);
      }
    } catch (error) {
      setUsername('');
    }
  };

  const performLogout = () => {
    setUsername('');
  };

  return [username, performLogin, performLogout];
}
