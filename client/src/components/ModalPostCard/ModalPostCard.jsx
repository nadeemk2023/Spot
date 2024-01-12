import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as filledHeart,
  faComment as solidComment,
  faTrashAlt as solidTrash,
  faPen as solidPen,
  faThumbsUp as solidThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  faComment as outlinedComment,
  faHeart as outlinedHeart,
  faThumbsUp as outlinedThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { formatDistanceToNow, parseISO } from "date-fns";
import { usePosts } from "../PostCard/PostsContext";
import { useProvideAuth } from "../../hooks/useAuth";
import styles from "./ModalPostCard.module.css";

const ModalPostCard = ({ post }) => {
  const { editPost, deletePost, likePost, submitComment } = usePosts();
  const {
    state: { user: currentUser },
  } = useProvideAuth();
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser.uid));
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);
  const [hoverHeart, setHoverHeart] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const timeAgo = formatDistanceToNow(parseISO(post.createdAt), {
    addSuffix: true,
  });
  const hasCommented = post.comments.some(
    (comment) => comment.author && comment.author._id === currentUser.uid
  );
  const isAuthor = post.author._id === currentUser.uid;
  const handleLikePost = async () => {
    await likePost(post._id);
    setIsLiked(!isLiked);
  };

  const handleEditPost = async () => {
    if (!editedText.trim()) return;
    const editedData = {
      text: editedText,
      userid: currentUser.uid,
    };
    await editPost(post._id, editedData);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmModal(true);
  };

  const handleDeletePost = async () => {
    await deletePost(post._id);
    setShowDeleteConfirmModal(false);
  };

  const handleSubmitComment = async (postId) => {
    if (!commentText.trim()) return;
    await submitComment(postId, {
      text: commentText,
      userId: currentUser.uid,
      postId: postId,
    });
    setCommentText("");
  };
  useEffect(() => {
    const imageNotDefault =
      post.image && post.image !== "/images/default-post.jpg";
    const imageExists = imageNotDefault && Boolean(post.image.trim());

    setImageSrc(imageExists ? post.image : "");
  }, [post.image]);

  return (
    <>
      <Card className="mb-4" style={{ borderRadius: "10px" }}>
        <Card.Body>
          <Row className="align-items-center justify-content-between">
            <Col xs="auto">
              <img
                src={post?.author?.profile_image}
                alt={`${post?.author?.username}'s profile`}
                className="rounded-circle"
                style={{ width: "40px", height: "40px" }}
              />
            </Col>
            <Col>
              <Card.Title
                className="text-start"
                style={{
                  color: "rgb(13, 110, 253)",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                {post.author.username}
              </Card.Title>
              <Card.Subtitle className="text-muted small text-start">
                {timeAgo}
              </Card.Subtitle>
            </Col>
            {isAuthor && (
              <Col xs="auto">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="mr-1"
                >
                  <FontAwesomeIcon icon={solidPen} />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDeleteClick}
                >
                  <FontAwesomeIcon icon={solidTrash} />
                </Button>
              </Col>
            )}
          </Row>

          {isEditing ? (
            <>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="mt-3"
              />
              <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" onClick={handleEditPost}>
                  Save
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  className="ml-2"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <Card.Text className="text-center mt-3 px-4">{post.text}</Card.Text>
          )}
          {imageSrc && (
            <img
              src={imageSrc}
              alt={`post from ${post?.author?.username}`}
              className="img-fluid"
              style={{
                maxWidth: "40%",
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
          )}

          <Row className="justify-content-between align-items-center mt-3">
            <Col>
              <FontAwesomeIcon
                icon={isLiked ? solidThumbsUp : outlinedThumbsUp}
                className="text-primary"
              />
              <span style={{ marginLeft: "0.2rem" }}>
                {post.likes.length} Likes
              </span>
            </Col>
            <Col className="text-end">
              <FontAwesomeIcon
                icon={hasCommented ? solidComment : outlinedComment}
                className="text-primary"
              />
              <span style={{ marginLeft: "0.2rem" }}>
                {post.comments.length} comments
              </span>
            </Col>
          </Row>
        </Card.Body>

        <Card.Footer className="border-top text-center">
          <Button
            variant="outline-primary"
            className={`text-primary py-2 px-3 ${styles.heartIconButton}`}
            style={{ marginBottom: "0.5rem" }}
            onClick={() => handleLikePost(post._id)}
            onMouseEnter={() => setHoverHeart(true)}
            onMouseLeave={() => setHoverHeart(false)}
          >
            <FontAwesomeIcon
              icon={isLiked || hoverHeart ? filledHeart : outlinedHeart}
            />
          </Button>

          <Form>
            <Form.Group className="mb-3 w-100">
              <Form.Control
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="mb-2"
              />
              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-primary"
                  onClick={() => handleSubmitComment(post._id)}
                  className="mt-1"
                >
                  Submit
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Card.Footer>
      </Card>
      <Modal
        show={showDeleteConfirmModal}
        onHide={() => setShowDeleteConfirmModal(false)}
        style={{
          display: "block",
          marginTop: "50vh",
          transform: "translate(-50%, -33%)",
          position: "fixed",
          left: "50%",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeletePost}>
            Delete Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalPostCard;
