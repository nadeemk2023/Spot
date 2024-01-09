import React from "react";
import { Modal, Card } from "react-bootstrap";
import ModalPostCard from "../ModalPostCard/ModalPostCard";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { usePosts } from "../PostCard/PostsContext";

const CommentsModal = ({ postId, showModal, onClose }) => {
  const { posts } = usePosts();
  const post = posts.find((p) => p._id === postId);

  if (!post) return <div>Loading post...</div>;

  return (
    <Modal show={showModal} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          Showing {post.author.username}'s Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalPostCard post={post} />

        {post.comments.map((comment) => {
          const timeAgo = formatDistanceToNow(parseISO(comment.created), {
            addSuffix: true,
          });

          return (
            <Card key={comment._id} className="mb-3 text-dark">
              <Card.Body>
                <div className="d-flex justify-content-start align-items-start mb-2">
                  <Link
                    to={`/profile/u/${comment?.author?.username}`}
                    className="text-decoration-none mr-3"
                  >
                    <img
                      src={comment?.author?.profile_image}
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                      }}
                    />
                  </Link>
                  <div style={{ flex: 1 }}>
                    <Link
                      to={`/profile/u/${comment?.author?.username}`}
                      className="text-decoration-none"
                    >
                      <Card.Text className="mb-1 fw-bold">
                        {comment?.author?.username}
                      </Card.Text>
                    </Link>
                    <Card.Text
                      className="text-muted small"
                      style={{ fontSize: "0.75em" }}
                    >
                      {timeAgo}
                    </Card.Text>
                    <Card.Text>{comment?.text}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};
export default CommentsModal;
