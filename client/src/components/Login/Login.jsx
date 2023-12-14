import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';
import { useProvideAuth } from '../../hooks/useAuth';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useProvideAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    const userRequestData = {
      username: username,
      password: password,
    };

    try {
      const response = await auth.signin(
        userRequestData.username,
        userRequestData.password
      );

      console.log(userRequestData, 'userRequestData');
      console.log(response, 'response - make sure this has a response');

      if (response.status === 200 || response.status === 201) {
        navigate('/homepage');
      } else {
        toast.error('Could not sign in, please check credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occured during login');
    } finally {
      setUserName('');
      setPassword('');
    }
  };

  return (
    <div>
      <ToastContainer />
      <Form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            value={username}
            placeholder="username"
            onChange={e => setUserName(e.target.value)}
            aria-label="Username"
            autoComplete="username"
          ></input>
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            aria-label="Password"
            autoComplete="off"
          ></input>
        </label>
        <button className={styles.button}>Sign In</button>
      </Form>
      <p>
        Don't have an account sign up <Link to="/signup">HERE</Link>
      </p>
    </div>
  );
};

export default Login;
