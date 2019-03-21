import React from "react";
import { imageurl } from "../index"
import ImageViewer from "./ImageViewer"


export default class Post extends React.Component {
  constructor(props){
    super(props);
    let post = this.props.post
  }
  // render
  render() {
    return (
      <div className="post">
        <div className="postHeader">
          <img className="post_profile_image" src={imageurl + this.props.post['creator']['profile_pic']} />
          <div className="postHeader_text">
            <p>{this.props.post['creator']['firstname']} {this.props.post['creator']['lastname']}</p>
            <p>RANK 234</p>
          </div>
        </div>
        {this.props.post['images'] &&
          <ImageViewer images={this.props.post['images']} />
        }
        <p className="post_text">{this.props.post['text']}</p>
      </div>
    );
  }
}
