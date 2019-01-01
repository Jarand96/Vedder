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
    dispatch({type: "GET_USER", payload: this.props.auth.token});
  }

  submit = (values) => {
  console.log(values)
  let { dispatch } = this.props
  }

  render() {
    if (this.props.user.length < 1) return (null)
  	return (
      <div>
        <p>firstname: {this.props.user.firstname}</p>
        <p>lastname: {this.props.user.lastname}</p>
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
)(Settings);
