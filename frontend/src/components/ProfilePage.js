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
    let myProfile = (this.props.auth.id === id) ? true : false
    this.state = {
      user_id: id,
      isOwnProfile: myProfile
    }
    if (!myProfile){
    dispatch({
      type:'GET_USER_PROFILE',
      payload:{
        'Authorization' : this.props.auth.token,
        'user_id': this.state.user_id
      }
    })
    }
  }
  componentDidMount(){
    let { dispatch } = this.props
  }
  // render
  render() {
    let profile = (this.state.isOwnProfile) ? this.props.ownProfile :
    this.props.profileInFocus
    if(!profile) return null;
    if(!this.props.ownProfile) return null;
    let isFollowing = this.props.ownProfile.following.includes(profile.id)
    //let isFollowing = profile.following.includes()
    // if this is not my profile and im not following the person already: show follow button.
    //if this is not my profile but im following this person show checkmark button or something


    return(
      <div className="container">
        <div className="profile-info-container">
          <img className="profile_pic"  src={imageurl + profile.profile_pic} />
          <div className="profile_desc">
            <h4 className="display_name">{profile.firstname + " " + profile.lastname}</h4>
            {!this.state.isOwnProfile&&!isFollowing &&
              <button className="active">Follow</button>}
            <div className="profile_statistics">
              <p className="counter posts_counter">{profile.posts.length} Posts</p>
              <p className="counter follower_counter">{profile.followers.length} Followers</p>
              <p className="counter following_counter">{profile.following.length} Following</p>
            </div>
          </div>
        </div>
      <h3 className="profile-posts-header">Posts</h3>
      <PostList profileInFocus = {profile}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
      auth: state.auth,
      profileInFocus: state.user.profileInFocus,
      ownProfile: state.user
    };
}

export default connect(
  mapStateToProps,
)(ProfilePage);
