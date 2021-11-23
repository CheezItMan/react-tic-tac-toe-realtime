import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import './Login.css';

interface LoginProps {
  onLoginCallback: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginCallback }: LoginProps) => {
  const [loginName, setLoginName] = useState('');
  const navigate = useNavigate();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onLoginCallback(loginName);
    setLoginName('');
    navigate('/');
  };
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <label htmlFor="loginName">Name</label>
        <input
          id="loginName"
          name="loginName"
          value={loginName}
          onChange={(event) => setLoginName(event.target.value)}
        />
      </div>
      <div className="login__submit-btn">
        <Button type="submit" className="btn-primary">
          Log in
        </Button>
      </div>
    </Form>
  );
};

export default Login;
