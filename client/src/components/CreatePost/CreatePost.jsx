import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import styles from './CreatePost.module.css';
import { useProvideAuth } from '../../hooks/useAuth';
import api from '../../../utils/api.utils';

const CreatePost = ({ onPostCreated }) => {
  const {
    state: { user: userObj },
  } = useProvideAuth();
  const [text, setText] = useState('');
  const maxChars = 500;

  const handleTextChange = e => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const responseData = {
      user: userObj,
      text: text,
    };
    try {
      const res = await api.post('/posts', responseData);
      console.log(res.data);
      setText('');
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="createPostContainer">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="postText">
          <Form.Label>
            What's on your mind
            {userObj?.username ? `, ${userObj.username}` : ''}?
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={text}
            onChange={handleTextChange}
            placeholder="Write your post here..."
            className={styles.fixedSizeTextarea}
          />
          <div className="text-right">
            {text.length} / {maxChars}
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
