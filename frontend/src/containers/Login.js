import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';

class Login extends Component {

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
  dispatch({type: "LOGIN_REQUEST", payload: {
      'email' : values.email,
      'password' : values.password
    }});
  }

  render(){
    console.log(this.props)
  	return (
      <div className="login-wrapper">
      <LoginForm onSubmit={this.submit} />
      {this.props.auth.statusText}
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
)(Login);
