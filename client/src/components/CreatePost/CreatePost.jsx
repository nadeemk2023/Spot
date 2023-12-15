import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import styles from './CreatePost.module.css';
import { useProvideAuth } from '../../hooks/useAuth';

const CreatePost = ({ onPostCreated }) => {
  const { state: user } = useProvideAuth();
  const [text, setText] = useState('');
  const maxChars = 500;

  const handleTextChange = e => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    //! Need to add logic here
  };

  console.log(user.user.username);
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="postText">
          <Form.Label>
            What's on your mind, {user.user.username ? user.user.username : ''}?
            {user.username}
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
