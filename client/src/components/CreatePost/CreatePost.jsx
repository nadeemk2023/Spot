import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import styles from "./CreatePost.module.css";
import { useProvideAuth } from "../../hooks/useAuth";
import { usePosts } from "../PostCard/PostsContext";

const CreatePost = () => {
  const {
    state: { user: userObj },
  } = useProvideAuth();
  const [text, setText] = useState("");
  const maxChars = 500;
  const { addPost, fetchPosts } = usePosts();

  const handleTextChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      user: userObj,
      text: text,
    };

    try {
      await addPost(postData);
      setText("");
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="createPostContainer mb-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-1" controlId="postText">
          <Form.Label>
            What's on your mind
            {userObj?.username ? (
              <span style={{ color: "rgb(13, 110, 253)", fontWeight: "bold" }}>
                {" "}
                {userObj.username}
              </span>
            ) : (
              ""
            )}
            ?
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
        <Button variant="primary" type="submit" className="px-3 py-2">
          Post
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
