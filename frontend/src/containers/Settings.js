import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form'
import SettingsForm from '../components/SettingsForm'
import FileUploadForm from '../components/FileUploadForm'

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
  }});
  }
  filesubmit = (values) => {
  let { dispatch } = this.props
  dispatch({type: "UPDATE_USER_PROFILE_PIC", payload: {
    'Authorization' : this.props.auth.token,
    'file': values.profile_pic
  }});
  }

  render() {
    if (this.props.user.length < 1) return (null)
    let url="http://127.0.0.1:5000/uploads/"
    console.log(this.props)
  	return (
      <div>
        {this.props.user.profile_pic &&
          <img width="200px" src={url + this.props.user.profile_pic} />
        }
        <SettingsForm onSubmit={this.submit} />
        <FileUploadForm onSubmit={this.filesubmit} />
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
