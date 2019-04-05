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
    return(
      <div className="container">
      <p>Hei {this.props.profile.firstname}</p>
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
