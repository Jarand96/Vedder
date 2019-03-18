import React from 'react';

export const Post = props => {
  const  {post} = props;
  console.log(post)
  return(
  <div>{post.created}</div>

  );
};

export default Post
