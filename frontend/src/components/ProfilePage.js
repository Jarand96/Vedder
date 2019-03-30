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
    console.log(this.props)
    const id = this.props.params.id
    console.log(id)
    this.state = {
      user_id: id
    }
  }
  componentDidMount(){
    let { dispatch } = this.props

  }
  // render
  render() {
    console.log(this.props)
    return(
      <p>Hei {this.state.user_id}</p>
    )
  }
}
function mapStateToProps(state) {
  return {
      auth: state.auth,
    };
}

export default connect(
  mapStateToProps,
)(ProfilePage);
