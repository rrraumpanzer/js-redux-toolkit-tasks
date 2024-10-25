import React from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment.jsx';

const Post = ({ post }) => {
  const author = useSelector((state) => {
    // BEGIN (write your solution here)
    const { entities } = state.usersReducer;
    const currentAuthor = entities[post.author]
    if (currentAuthor)
      return currentAuthor;
    else
      return null;
    // END
  });

  return (
    <div className="card">
      <div className="card-header">
        {`${post.body} - ${author.name}`}
      </div>
      <div className="card-body">
        {post.comments.map((commentId) => <Comment key={commentId} commentId={commentId} />)}
      </div>
    </div>
  );
};

export default Post;
