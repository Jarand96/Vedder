import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form'
import SettingsForm from './SettingsForm';

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
  let { dispatch } = this.props
  //console.log(values);
  dispatch({type: "UPDATE_USER", payload: {
    'Authorization' : this.props.auth.token,
    'firstname' : values.firstname,
    'lastname' : values.lastname,
    'file': values.avatar
  }});
  }

  render() {
    if (this.props.user.length < 1) return (null)
  	return (
      <div>
        <SettingsForm callbackSubmit={this.submit} />
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
