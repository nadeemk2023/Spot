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
      return response.data;
    } catch (error) {
      console.error(`Error fetching posts:`, error);
      return null;
    }
  };

  useEffect(() => {
    fetchPosts().then(fetchedPosts => {
      if (fetchedPosts && fetchedPosts.length > 0) {
        console.log(fetchedPosts, 'fetched posts');
        setPosts(fetchedPosts);
      } else {
        console.log('Failed to fetch posts or received empty data');
      }
    });
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
