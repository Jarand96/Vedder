import React, { Component } from "react";
import {store} from "react";
import { Link } from "react-router";
import { imageurl } from "../index"
import ImageViewer from "./ImageViewer"
import PostList from "./PostList"
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
library.add(faThumbsUp, faComment);


class ProfilePage extends Component {
  constructor(props){
    super(props);
    const {dispatch} = props;
    const id = this.props.params.id
    this.state = {
      user_id: id
    }
    dispatch({
      type:'GET_USER_PROFILE',
      payload:{
        'Authorization' : this.props.auth.token,
        'user_id': this.state.user_id
      }
    })
  }
  componentDidMount(){
    let { dispatch } = this.props

  }
  // render
  render() {
    let profile = this.props.profile
    if(!profile) return null;
    console.log(profile)
    return(
      <div className="container">
        <div className="profile-info-container">
          <img className="profile_pic"  src={imageurl + profile.profile_pic} />
          <div className="profile_desc">
            <p className="display_name">{profile.firstname + " " + profile.lastname}</p>
            <p className="posts_counter">{profile.posts.length} Posts</p>
            <p className="follower_counter">{profile.followers.length} Followers</p>
            <p className="following_counter">{profile.following.length} Following</p>
          </div>
        </div>
      <h3>Posts</h3>
      <PostList profileInFocus = {this.props.profile}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
      auth: state.auth,
      profile: state.user.profileInFocus
    };
}

export default connect(
  mapStateToProps,
)(ProfilePage);
