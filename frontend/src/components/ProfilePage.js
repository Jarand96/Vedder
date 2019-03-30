import React, { Component } from "react";
import {store} from "react";
import { Link } from "react-router";
import { imageurl } from "../index"
import ImageViewer from "./ImageViewer"
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
library.add(faThumbsUp, faComment);


class ProfilePage extends Component {
  constructor(props){
    super(props);
    const {dispatch} = props;
    const id = this.props.params.id
    this.state = {
      user_id: id
    }
  }
  componentDidMount(){
    let { dispatch } = this.props
    dispatch({
      type:'GET_USER_PROFILE',
      payload:{
        'Authorization' : this.props.auth.token,
        'user_id': this.state.user_id
      }
    })

  }
  // render
  render() {
    console.log(this.props)
    return(
      <p>Hei {this.props.profile.firstname}</p>
    )
  }
}
function mapStateToProps(state) {
  return {
      auth: state.auth,
      profile: state.user.profileInFocus
    };
}

export default connect(
  mapStateToProps,
)(ProfilePage);
