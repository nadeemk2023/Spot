import React, { useEffect, useState } from 'react';
import { useProvideAuth } from '../../hooks/useAuth';
import api from '../../../utils/api.utils';
import { Row, Col } from 'react-bootstrap';
import PostCard from '../PostCard/PostCard';

const HomeFeed = () => {
  const {
    state: { user: userObj },
  } = useProvideAuth();

  const [posts, setPosts] = useState([]);

  //! Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      if (response.data && response.data.length > 0) {
        setPosts(response.data);
      } else {
        console.log('No posts found');
      }
    } catch (error) {
      console.error(`Error fetching posts:`, error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Row>
      {posts.map(post => (
        <Col key={post._id} xs={12}>
          <PostCard post={post} />
        </Col>
      ))}
    </Row>
  );
};

export default HomeFeed;
