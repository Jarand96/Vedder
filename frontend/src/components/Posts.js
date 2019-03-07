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
  }

  render(){
  	return (
      <div className="post-container">
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      forms: state.form,
      auth: state.auth
    };
}

export default connect(
  mapStateToProps,
)(Posts);
