import React from 'react';
import { imageurl } from "../index"

export const Post = props => {
  const  {post} = props;
  return(
  <div className="post">
    <div className="postHeader">
      <img className="post_profile_image" src={imageurl + post['creator']['profile_pic']} />
      <div className="postHeader_text">
        <p>{post['creator']['firstname']} {post['creator']['lastname']}</p>
        <p>RANK 234</p>
      </div>
    </div>
    {post["images"].map((image, index) => {
      return(
          <img key={index} className="post_image" src={imageurl + image["filename"]}/>
      )
    })}
    <p className="post_text">{post['text']}</p>


  </div>

  );
};

export default Post
