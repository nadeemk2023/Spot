import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useProvideAuth } from '../../hooks/useAuth';

const PostCard = ({ post, onDelete, onEdit }) => {
  const {
    state: { user: currentUser },
  } = useProvideAuth();
  const isAuthor = currentUser && post.author._id === currentUser._id;
  const [showCommentInput, setShowCommentInput] = useState(false);

  const timeAgo = '6 days ago'; // Replace with actual logic to display time ago

  const toggleCommentInput = () => setShowCommentInput(!showCommentInput);

  return (
    <Card className="mb-3 text-dark">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <Card.Text className="mb-1 font-weight-bold">
              {post.author.username}
            </Card.Text>
            <Card.Text
              className="text-muted small"
              style={{ fontSize: '0.75em' }}
            >
              {timeAgo}
            </Card.Text>
          </div>
          {/* Optional Edit/Delete buttons */}
          {isAuthor && (
            <div>
              <Button
                variant="outline-secondary"
                onClick={() => onEdit(post)}
                className="mr-2"
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => onDelete(post._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <Card.Text className="mb-3">{post.text}</Card.Text>
        <div className="mb-3 d-flex justify-content-start align-items-center">
          <span role="img" aria-label="thumbs up" className="mr-2">
            👍 {post.likes.length} Likes
          </span>
          <span>{post.comments.length} comments</span>
        </div>

        {/* Interaction buttons */}
        <Row className="border-top pt-2">
          <Col xs={6} className="text-center">
            <Button
              variant="outline-primary"
              className="text-primary py-2 px-3"
            >
              Like
            </Button>
          </Col>
          <Col xs={6} className="text-center">
            <Button
              variant="outline-primary"
              className="text-primary py-2 px-3"
              onClick={toggleCommentInput}
            >
              Comment
            </Button>
          </Col>
        </Row>
      </Card.Body>

      {/* Comment input field, shown when Comment button is clicked */}
      {showCommentInput && (
        <Card.Footer className="bg-transparent border-top-0">
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Write a comment..." />
            </Form.Group>
          </Form>
        </Card.Footer>
      )}
    </Card>
  );
};

export default PostCard;
