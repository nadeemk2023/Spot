import React, { createContext, useState, useContext, useCallback } from "react";
import api from "../../../utils/api.utils";

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      if (response.data) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error(`Error fetching posts:`, error);
    }
  };

  const addPost = async postData => {
    try {
      const response = await api.post("/posts", postData);
      if (response.data) {
        setPosts(prevPosts => [response.data, ...prevPosts]);
      }
    } catch (error) {
      console.error(`Error creating post:`, error);
    }
  };

  // Define other functions like handleLike, handleComment, deletePost here...

  return (
    <PostsContext.Provider value={{ posts, fetchPosts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};
