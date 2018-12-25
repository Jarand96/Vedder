import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';

class Register extends Component {

  constructor(props) {
   super(props);
   const {dispatch} = props;

 // This binding is necessary to make `this` work in the callback
 }

  componentDidMount() {
    let { dispatch } = this.props
  }

  submit = (values) => {
  let { dispatch } = this.props
  dispatch({type: "REGISTER_REQUEST", payload: {
      'username' : values.username,
      'password' : values.password,
      'adminpassword' : values.adminpassword
    }});
  }

  render() {
  	return (
      <div>
      <RegisterForm callbackSubmit={this.submit} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      forms: state.form
    };
}

export default connect(
  mapStateToProps,
)(Register);
