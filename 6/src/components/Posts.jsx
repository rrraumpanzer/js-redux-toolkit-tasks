import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post.jsx';

const Posts = () => {
  // BEGIN (write your solution here)
  const {ids, entities} = useSelector((state) => state.postsReducer);
  const posts = ids.map((id) => entities[id]);
  console.log('posts:', posts);
  return (
    <div className="mt-3">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
  // END
};

export default Posts;
