import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useProvideAuth } from '../../hooks/useAuth';
import { formatDistanceToNow, parseISO } from 'date-fns';
import api from '../../../utils/api.utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outlinedHeart } from '@fortawesome/free-regular-svg-icons';

const PostCard = ({ post }) => {
  const {
    state: { user: currentUser },
  } = useProvideAuth();
  const isAuthor = post.author._id === currentUser.uid;
  const [commentText, setCommentText] = useState('');
  const [postState, setPostState] = useState(post);
  const [isLiked, setIsLiked] = useState(
    post.likes.some(like => like._id === currentUser.uid)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

  const timeAgo = formatDistanceToNow(parseISO(post.createdAt), {
    addSuffix: true,
  });

  const handleLike = async postId => {
    try {
      const res = await api.post(`/posts/like/${postId}`);
      if (res.status === 200) {
        setPostState(res.data);
        setIsLiked(prevLiked => !prevLiked);
      } else {
        console.log('Failed to like post:', res.status);
      }
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
  const handleEditComment = async () => {
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
        console.error('Failed to update post:', res.status);
      }
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
          {isAuthor && (
            <div>
              <Button
                variant="outline-secondary"
                onClick={() => setIsEditing(true)}
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
        {!isEditing ? (
          <Card.Text className="mb-3">{postState.text}</Card.Text>
        ) : (
          <>
            <input
              value={editedText}
              onChange={e => setEditedText(e.target.value)}
            ></input>
            <Button onClick={() => handleEditComment()}>Save Change</Button>
          </>
        )}
        <div className="mb-3 d-flex justify-content-start align-items-center">
          <span role="img" aria-label="thumbs up" className="mr-2">
            👍 {postState.likes.length} Likes
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
              <FontAwesomeIcon icon={isLiked ? filledHeart : outlinedHeart} />
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
