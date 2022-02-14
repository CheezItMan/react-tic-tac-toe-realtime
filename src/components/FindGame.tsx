import React, { useState, useEffect } from 'react';
import createHttpInstance from '../utils/httpInstance';
import { Form, Row, Col, Button } from 'react-bootstrap';

const BASE_URL = 'http://localhost:8080';

const axios = createHttpInstance(BASE_URL);

interface FindGameProps {
  onFindGameCallback: (gameId: string) => void;
}

interface GameInterface {
  id: string;
  name: string;
}

const FindGame: React.FC<FindGameProps> = ({ onFindGameCallback }) => {
  const [games, setGames] = useState<GameInterface[]>([]);

  const getGames = () => {
    axios
      .get<Array<GameInterface>>('/api/games')
      .then((res) => {
        console.log(res.data);
        setGames(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getGames();
  }, []);

  const listGames = () => {
    if (games.length === 0) {
      return <div>No games found</div>;
    }

    return games.map((game) => {
      return (
        <Row className="mb-8">
          <Form.Group as={Col}>
            <Form.Label>{game.id}</Form.Label>
          </Form.Group>
          <Form.Group as={Col}>
            <Button onClick={() => onFindGameCallback(game.id)}>{game.name}</Button>
          </Form.Group>
        </Row>
      );
    });
  };

  return (
    <div className="find-game">
      <Form>{listGames()}</Form>
      <Row className="mb-8">
        <Form.Group as={Col}>
          <Button onClick={getGames}>Refresh List</Button>
        </Form.Group>
      </Row>
    </div>
  );
};

export default FindGame;
