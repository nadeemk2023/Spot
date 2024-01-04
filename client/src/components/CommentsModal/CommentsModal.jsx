import React from 'react';
import { Modal, Card } from 'react-bootstrap';
import PostCard from '../PostCard/PostCard';
import { formatDistanceToNow, parseISO } from 'date-fns';

const CommentsModal = ({ post, showModal, onClose }) => {
  return (
    <Modal show={showModal} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          Showing {post.author.username}'s Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PostCard post={post} isInModal={true} />

        {post.comments.map(comment => {
          const timeAgo = formatDistanceToNow(parseISO(comment.created), {
            addSuffix: true,
          });

          return (
            <Card key={comment._id} className="mb-3 text-dark pb-0">
              <Card.Body>
                <div className="d-flex justify-content-start align-items-center mb-2">
                  <div>
                    <Card.Text className="mb-1 fw-bold">
                      {comment?.author?.username}
                    </Card.Text>
                    <Card.Text
                      className="text-muted small"
                      style={{ fontSize: '0.75em' }}
                    >
                      {timeAgo}
                    </Card.Text>
                  </div>
                </div>
                <Card.Text>{comment?.text}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};

export default CommentsModal;
