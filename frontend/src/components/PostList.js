import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Post from './Post'

class PostList extends Component {

  constructor(props) {
   super(props);
   const {dispatch, profileInFocus} = props;

 // This binding is necessary to make `this` work in the callback
 }

isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  componentDidMount() {
    let { dispatch } = this.props
    dispatch({type: "GET_USER", payload: this.props.auth.token});
    const profileInFocus = this.props.profileInFocus
    if(!profileInFocus){
    dispatch({type: "GET_POST", payload: this.props.auth.token})
    }
  }

  render(){
    const profileInFocus = this.props.profileInFocus
    const posts = (
      profileInFocus ?
      profileInFocus.posts : this.props.posts.posts
    )
    if (posts.error) return (null)
    let url="http://127.0.0.1:5000/uploads/"
  	return (
      <div className="post-container">
        {posts.map((post, index) => {
          return(
            <Post key={index} post={post} url={url}/>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      forms: state.form,
      auth: state.auth,
      posts: state.posts,
      user: state.user
    };
}

export default connect(
  mapStateToProps,
)(PostList);
