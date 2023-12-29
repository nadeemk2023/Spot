import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useProvideAuth } from '../../hooks/useAuth';
import { formatDistanceToNow, parseISO } from 'date-fns';
import api from '../../../utils/api.utils';

const PostCard = ({ post, onDelete, onEdit }) => {
  const {
    state: { user: currentUser },
  } = useProvideAuth();
  const isAuthor = currentUser && post.author._id === currentUser._id;
  const [commentText, setCommentText] = useState('');

  const timeAgo = formatDistanceToNow(parseISO(post.createdAt), {
    addSuffix: true,
  });

  const handleLike = async postId => {
    try {
      const res = await api.post(`/posts/like/${postId}`);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitComment = async postId => {
    const responseData = {
      text: commentText,
      userid: currentUser.uid,
      postId: postId,
    };
    try {
      const res = await api.put('/posts/comments', responseData);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async postId => {
    try {
      const res = await api.delete(`/posts/${postId}`);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="mb-3 text-dark">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <Card.Text className="mb-1 fw-bold">
              {post.author.username}
            </Card.Text>
            <Card.Text
              className="text-muted small"
              style={{ fontSize: '0.75em' }}
            >
              {timeAgo}
            </Card.Text>
          </div>

          {/* Edit/Delete buttons to work on later */}
          {post.author._id === currentUser.uid && (
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
                onClick={() => handleDeletePost(post._id)}
              >
                Delete Post
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
              onClick={() => handleLike(post._id)}
            >
              Like
            </Button>
          </Col>
          <Col xs={6} className="text-center">
            <Button
              variant="outline-primary"
              className="text-primary py-2 px-3"
            >
              Show Comments
            </Button>
          </Col>
        </Row>
      </Card.Body>

      {/* Comment input field, shown when Comment button is clicked */}
      <Card.Footer className="bg-transparent border-top-0">
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Write a comment..."
              onChange={e => setCommentText(e.target.value)}
              value={commentText}
            />
          </Form.Group>
          <Button onClick={() => handleSubmitComment(post._id)}>
            Submit Comment
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
