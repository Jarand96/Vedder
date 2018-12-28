import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';

class Settings extends Component {

  constructor(props) {
   super(props);
   const {dispatch} = props;

 // This binding is necessary to make `this` work in the callback
 }

  componentDidMount() {
    let { dispatch } = this.props
  }

  submit = (values) => {
  console.log(values)
  let { dispatch } = this.props
  dispatch({type: "REGISTER_REQUEST", payload: {
      'email' : values.email,
      'password' : values.password,
      'firstname' : values.firstname,
      'lastname' : values.lastname,
    }});
  }

  render() {
  	return (
      <div>

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
)(Settings);
