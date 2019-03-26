import React, { Component } from "react";
import {store} from "react";
import { imageurl } from "../index"
import ImageViewer from "./ImageViewer"
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
library.add(faThumbsUp, faComment);


class Post extends Component {
  constructor(props){
    super(props);
    const {dispatch} = props;
    let post = this.props.post

    this.likePost = this.likePost.bind(this)
  }

  likePost(){
    let { dispatch } = this.props
    dispatch({type: "LIKE_POST", payload: {
        'post_id' : this.props.post["_id"],
        'Authorization' : this.props.auth.token
      }});
  }
  // render
  render() {
    let likeCounter = <p></p>
    let last_like = this.props.post['liked_by'].length-1
    if(this.props.post['liked_by'].length>1){
      likeCounter = <p className="like_counter">
        {this.props.post.liked_by[last_like]} and {" "}
        {last_like } other likes this post</p>
    }
    else if(this.props.post['liked_by'].length==1){
      likeCounter = <p className="like_counter">
        {this.props.post.liked_by[0]} likes this post</p>
    }
    return (
      <div className="post">
        <div className="post_header">
          <img className="post_profile_image" src={imageurl + this.props.post['creator']['profile_pic']} />
          <div className="postHeader_text">
            <p className="post_user_name">{this.props.post['creator']['firstname']} {this.props.post['creator']['lastname']}</p>
            <p className="post_details">RANK 234</p>
          </div>
        </div>
        {this.props.post['images'] &&
          <ImageViewer images={this.props.post['images']} />
        }
        {
          likeCounter
        }
        {this.props.post['text'] &&
            <p className="post_text">{' ' + this.props.post['text']}</p>
        }
        <hr className="post_hr"></hr>
        <div className="post_footer">
          <button className="rep_post" onClick={this.likePost}>
          <FontAwesomeIcon icon={"thumbs-up"}/> Like</button>
          <button className="rep_post">
          <FontAwesomeIcon icon={"comment"}/> Comment </button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
      auth: state.auth,
    };
}

export default connect(
  mapStateToProps,
)(Post);
