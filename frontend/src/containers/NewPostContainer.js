import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form'
import NewPostForm from '../components/NewPost'

class NewPostContainer extends Component {

  constructor(props) {
   super(props);
   const {dispatch} = props;

 // This binding is necessary to make `this` work in the callback
 }

  post_submit = (values) => {
  let { dispatch } = this.props
  console.log(values)
  }

  render() {
  	return (
      <div>
        <NewPostForm onSubmit={this.post_submit} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      auth:state.auth,
      forms: state.form,
      user:state.user,
    };
}

export default connect(
  mapStateToProps,
)(NewPostContainer);
