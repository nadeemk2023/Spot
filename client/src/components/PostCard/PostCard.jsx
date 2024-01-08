import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { usePosts } from "./PostsContext";

const PostCard = ({ post, isInModal = false }) => {
  const {
    state: { user: currentUser },
  } = useProvideAuth();
  const isAuthor = post?.author?._id === currentUser.uid;
  const [commentText, setCommentText] = useState("");
  const [postState, setPostState] = useState(post);
  const [isLiked, setIsLiked] = useState(
    post.likes.some((like) => like._id === currentUser.uid)
  );
  const [hasCommented, setHasCommented] = useState(
    post.comments.some(
      (comment) => comment.author && comment?.author?._id === currentUser.uid
    )
  );
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [hoverHeart, setHoverHeart] = useState(false);

  const timeAgo = formatDistanceToNow(parseISO(post.createdAt), {
    addSuffix: true,
  });
  const { deletePost } = usePosts();

  const handleLike = async (postId) => {
    try {
      const res = await api.post(`/posts/like/${postId}`);
      if (res.status === 200) {
        setPostState(res.data);
        setIsLiked((prevLiked) => !prevLiked);
      } else {
        console.log("Failed to like post:", res.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitComment = async (postId) => {
    if (commentText === "") return;
    const responseData = {
      text: commentText,
      userId: currentUser.uid,
      postId: postId,
    };
    try {
      const res = await api.put("/posts/comments", responseData);
      setCommentText("");
      setHasCommented(true);

      if (res.data) {
        setPostState(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditPost = async () => {
    if (editedText === "") return;
    const responseData = {
      text: editedText,
      userid: currentUser.uid,
    };
    try {
      const res = await api.put(`/posts/${post._id}`, responseData);
      if (res.status === 200) {
        setPostState(res.data);
        setIsEditing(false);
      } else {
        console.error("Failed to update post:", res.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (postId) => {
    await deletePost(postId);
  };

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
                onClick={() => handleDeletePost(post._id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </div>
          )}
        </div>
        {!isEditing ? (
          <Card.Text className="m-5">{postState.text}</Card.Text>
        ) : (
          <>
            <input
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            ></input>
            <Button onClick={() => handleEditPost()}>Save Change</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        )}
        <div className="d-flex justify-content-between mb-1 m-3">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={isLiked ? solidThumbsUp : outlinedThumbsUp}
              style={{ color: "#0d6efd" }}
              className="me-1"
            />
            <span className="ml-2">{postState.likes.length} Likes</span>
          </div>
          <div>
            <FontAwesomeIcon
              icon={hasCommented ? solidComment : outlinedComment}
              style={{ color: "#0d6efd" }}
              className="me-1"
            />

            <span>{postState.comments.length} comments</span>
          </div>
        </div>

        <Row className="border-top border-bottom">
          <Col xs={6} className="text-center">
            <Button
              variant="outline-primary"
              className={`text-primary py-2 px-3 ${styles.heartIconButton}`}
              onClick={() => handleLike(post._id)}
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
            post={post}
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
