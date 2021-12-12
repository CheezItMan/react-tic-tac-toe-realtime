import { useState } from 'react';
import axios from 'axios';

export function useLogin(): [string, (username: string) => void] {
  const [username, setUsername] = useState<string>('');

  const performLogin = async (newUsername: string): Promise<void> => {
    try {
      const response = await axios.post('URL', {
        username: newUsername,
      });
      if (response.status === 200) {
        // on success set state
        setUsername(newUsername);
      }
    } catch (error) {
      setUsername('');
    }
  };

  return [username, performLogin];
}
