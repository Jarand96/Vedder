import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';


class GridItem extends Component {
  constructor(props) {
   super(props);
   const {dispatch} = props;

 // This binding is necessary to make `this` work in the callback
 }

  componentDidMount() {

  }

  render(){
    console.log(this.props.object)
    const object = this.props.object
    const index = this.props.index
    let div_style = {
      gridColumnStart: object.column_start,
      gridColumnEnd: object.column_start + object.width,
      gridRowStart: object.row_start,
      gridRowEnd: object.row_start + object.height,
      backgroundColor : object.backgroundColor
    }
  	return (
      <div
      onClick={() => {
        this.props.dispatch({type: "_SET_FOCUS_OBJECT", payload: {
          'index': index,
          'object': object
        }});
        console.log(this.props)
        }
      }
      style={div_style}>
        {object.text}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      forms: state.form,
      auth: state.auth,
      posts: state.posts,
      user: state.user,
      advancedPost: state.advancedPost
    };
}

export default connect(
  mapStateToProps,
)(GridItem);
