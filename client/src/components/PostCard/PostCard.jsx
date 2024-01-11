import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useProvideAuth } from "../../hooks/useAuth";
import { formatDistanceToNow, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as filledHeart,
  faThumbsUp as solidThumbsUp,
  faComment as solidComment,
} from "@fortawesome/free-solid-svg-icons";
import {
  faComment as outlinedComment,
  faTrashCan,
  faHeart as outlinedHeart,
  faThumbsUp as outlinedThumbsUp,
  faPenToSquare as editIcon,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./PostCard.module.css";
import CommentsModal from "../CommentsModal/CommentsModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { Link } from "react-router-dom";
import { usePosts } from "./PostsContext";

const PostCard = ({ postId, isInModal = false }) => {
  const {
    state: { user: currentUser },
  } = useProvideAuth();
  const { posts, editPost, deletePost, likePost, submitComment } = usePosts();

  const post = posts.find((p) => p._id === postId);
  const isAuthor = post?.author?._id === currentUser.uid;
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(
    post.likes.some((like) => like._id === currentUser.uid)
  );
  const hasCommented = post.comments.some(
    (comment) => comment.author && comment.author._id === currentUser.uid
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);
  const [hoverHeart, setHoverHeart] = useState(false);

  const timeAgo = formatDistanceToNow(parseISO(post.createdAt), {
    addSuffix: true,
  });

  const handleLikePost = async (postId) => {
    await likePost(postId);
    setIsLiked((prevLiked) => !prevLiked);
  };

  const handleSubmitComment = async (postId) => {
    if (!commentText.trim()) return;
    const commentData = {
      text: commentText,
      userId: currentUser.uid,
      postId: postId,
    };
    await submitComment(postId, commentData);
    setCommentText("");
  };

  const handleEditPost = async () => {
    if (editedText === "") return;
    const editedData = {
      text: editedText,
      userid: currentUser.uid,
    };
    await editPost(post._id, editedData);
    setIsEditing(false);
  };

  const handleOpenDeleteModal = (postId) => {
    setPostIdToDelete(postId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setPostIdToDelete(null);
  };

  const handleDeletePost = async () => {
    if (postIdToDelete) {
      await deletePost(postIdToDelete);
      handleCloseDeleteModal();
    }
  };

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <Card className="mb-4 text-dark pb-0">
      <Card.Body className="pt-0">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <Link
              to={`/profile/u/${post?.author?.username}`}
              className="text-decoration-none"
            >
              <img
                src={post?.author?.profile_image}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
              />
            </Link>
            <div>
              <Link
                to={`/profile/u/${post?.author?.username}`}
                className="text-decoration-none"
                style={{ color: "rgb(13, 110, 253)" }}
              >
                <Card.Text className="mb-1 fw-bold">
                  {post?.author?.username}
                </Card.Text>
              </Link>
              <Card.Text
                className="text-muted small"
                style={{ fontSize: "0.75em" }}
              >
                {timeAgo}
              </Card.Text>
            </div>
          </div>
          {isAuthor && (
            <div>
              <Button
                variant="outline-secondary"
                onClick={() => setIsEditing(true)}
                style={{ marginRight: "0.2rem" }}
              >
                <FontAwesomeIcon icon={editIcon} />
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleOpenDeleteModal(post._id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </div>
          )}
          <ConfirmDeleteModal
            show={showDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleConfirm={handleDeletePost}
          />
        </div>
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
        <div className="d-flex justify-content-between mb-1 m-3">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={isLiked ? solidThumbsUp : outlinedThumbsUp}
              style={{ color: "#0d6efd" }}
              className="me-1"
            />
            <span className="ml-2">{post.likes.length} Likes</span>
          </div>
          <div>
            <FontAwesomeIcon
              icon={hasCommented ? solidComment : outlinedComment}
              style={{ color: "#0d6efd" }}
              className="me-1"
            />

            <span>{post.comments.length} comments</span>
          </div>
        </div>

        <Row className="border-top border-bottom">
          <Col xs={6} className="text-center">
            <Button
              variant="outline-primary"
              className={`text-primary py-2 px-3 ${styles.heartIconButton}`}
              onClick={() => handleLikePost(post._id)}
              onMouseEnter={() => setHoverHeart(true)}
              onMouseLeave={() => setHoverHeart(false)}
            >
              <FontAwesomeIcon
                icon={isLiked || hoverHeart ? filledHeart : outlinedHeart}
              />
            </Button>
          </Col>
          <Col xs={6} className="text-center">
            {!isInModal && (
              <Button
                variant="outline-primary"
                className={`text-primary py-2 px-3 ${styles.showCommentsButton}`}
                onClick={() => setShowCommentsModal(true)}
              >
                Comments
              </Button>
            )}
          </Col>
        </Row>
        {!isInModal && showCommentsModal && (
          <CommentsModal
            postId={post._id}
            showModal={showCommentsModal}
            onClose={() => {
              setShowCommentsModal(false);
            }}
          />
        )}
      </Card.Body>

      <Card.Footer className="bg-transparent border-top-0">
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Write a comment..."
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              className="mb-3 p-2 "
            />
          </Form.Group>
          <Button
            onClick={() => handleSubmitComment(post._id)}
            variant="outline-primary"
            className="py-2 px-3 mb-2"
          >
            Submit
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
