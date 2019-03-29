import React, { Component } from "react";
import {store} from "react";
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
    const {dispatch, location} = props;
  }
  componentDidMount(){
    let { dispatch } = this.props
    
  }
  // render
  render() {
    return(

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
)(ProfilePaged);
