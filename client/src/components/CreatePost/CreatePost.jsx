import React, { useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
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
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleTextChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const postData = {
  //       user: userObj,
  //       text: text,
  //     };
  //
  //     try {
  //       await addPost(postData);
  //       setText("");
  //       fetchPosts();
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("userId", userObj.uid);

    console.log("image in handleSubmit:", image);

    if (image) {
      formData.append("imgUrl", image);
    }

    try {
      // await addPost(formData);
      setText("");
      setImage(null);
      setShowModal(false);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const removeSelectedImage = () => {
    setImage(null);
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

        <Button
          variant="outline-primary"
          className="me-2"
          onClick={handleShowModal}
        >
          {image ? "Change Photo" : "Upload a Photo"}
        </Button>
        {image && (
          <Button
            variant="outline-danger"
            className="me-2"
            onClick={removeSelectedImage}
          >
            Remove Photo
          </Button>
        )}
        <Button variant="primary" type="submit" className="px-3 py-2 ">
          Post
        </Button>
      </Form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {image ? (
              <div>
                <p>Selected file: {image.name}</p>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="img-thumbnail me-1"
                  style={{ height: "15rem" }} // Added margin-bottom for spacing
                />
                <Button variant="danger" onClick={() => setImage(null)}>
                  Remove
                </Button>
              </div>
            ) : (
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {image && (
            <Button variant="primary" onClick={handleCloseModal}>
              Done
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreatePost;
