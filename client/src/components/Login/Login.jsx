import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    // setUserName('');
    // setPassword('');
    const userRequestData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post('/signin', userRequestData);
      console.log(userRequestData, 'userRequestData');
      console.log(response, 'response - make sure this has a response');

      //! check response status of the response make sure it's 200, double check if its response.data.status or response.status (might need to play around to find response status - work with console.log to figure this out)

      if (response.status === 200 || response.status === 201) {
        navigate('/homepage');
      } else {
        toast.error('Could not sign in, please check credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occured during login');
    }
  };

  return (
    <div>
      <ToastContainer />
      <Form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="">
          <input
            type="text"
            id="username"
            value={username}
            placeholder="username"
            onChange={e => setUserName(e.target.value)}
            aria-label="Username"
          ></input>
        </label>
        <label htmlFor="">
          <input
            type="password"
            id="password"
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            aria-label="Password"
          ></input>
        </label>
        <button className={styles.button}>Sign In</button>
      </Form>
      <p>
        Don't have an account sign up <a href="/signup">HERE</a>
      </p>
    </div>
  );
};

export default Login;
