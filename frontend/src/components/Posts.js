import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';

class Posts extends Component {

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
    console.log(this.props)
    if (this.props.posts.posts.length < 1) return (null)
  	return (
      <div className="post-container">
         {this.props.posts.posts.map((post, index) => {
           return (
             <div key={index}>
               {post["text"]}
             </div>
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
)(Posts);
