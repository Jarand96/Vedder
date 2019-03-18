import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';
import { Post } from './Post'

class PostList extends Component {

  constructor(props) {
   super(props);
   const {dispatch} = props;

 // This binding is necessary to make `this` work in the callback
 }

  componentDidMount() {
    let { dispatch } = this.props
    dispatch({type: "GET_POST", payload: this.props.auth.token})
  }

  render(){
    if (this.props.posts.posts.length < 1) return (null)
    let url="http://127.0.0.1:5000/uploads/"
  	return (
      <div className="post-container">
        {this.props.posts.posts.map((post, index) => {
          return(
            <Post key={index} post={post}/>
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
      posts: state.posts
    };
}

export default connect(
  mapStateToProps,
)(PostList);
