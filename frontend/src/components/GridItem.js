import React, { Component } from "react";
import {store} from "react";
import { connect } from 'react-redux';


class GridItem extends Component {
  constructor(props) {
   super(props);
   const {dispatch} = props;
   this.gridItem = React.createRef();
   this.state = {
     dragging: false,
     startX:'',
     startY:''
   }

 // This binding is necessary to make `this` work in the callback
 this._onMouseUp = this._onMouseUp.bind(this)
 this._onMouseDown = this._onMouseDown.bind(this)
 }

  componentDidUpdate() {
    if (this.state.dragging) {
      //document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this._onMouseUp)
    } else if (!this.state.dragging) {
      //document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this._onMouseUp)
    }
  }

  _onMouseDown(e){

    if (e.button !== 0) return

    /*
     * If the user clicks in the lower 5% or upper 5% of the divs X width,
     * Then dragging is not true, but moving is.
     */
    let percent = e.nativeEvent.offsetX /
                  this.gridItem.current.getBoundingClientRect().width * 100

    console.log(percent)
    this.props.dispatch({type: "_SET_FOCUS_OBJECT", payload: {
      'index': this.props.index,
      'object': this.props.object
    }});
    this.setState({
      dragging:true,
      startX: e.clientX,
      startY: e.clientY
    })
    e.stopPropagation()
    e.preventDefault()
  }

  _onMouseUp(e){
    /*
    * The user if finished dragging the object. and lets go.
    * Check how many pixels the mouse moved in X direction. Over half the size of 1 cell?
    * If yes, check freeSpace() with object in focus properties + the new x value
    * if yes, run the moveX function and pass in the amount of cells
    */
    this.setState({
      dragging: false
    })
    let deltaX = e.clientX - this.state.startX;
    let deltaY = e.clientY - this.state.startY;
    let gridCellWidth = this.props.advancedPost.gridCellWidth;
    let gridCellHeight = this.props.advancedPost.gridCellHeight;
    let xSteps = Math.round(deltaX/gridCellWidth);


    let ySteps = Math.round(deltaY/gridCellHeight);
    this.props.dispatch({type: "_MOVE_DIV", payload: {
      'xSteps' : xSteps,
      'ySteps' : ySteps,
    }});
    e.stopPropagation()
    e.preventDefault()

  }
  _onMouseMove(e) {
      if (!this.state.dragging) return
      //Reconsider the code below to see if it can be used.
      //The on move is used to show the user if the operation is possible or not.
      //e.g the user drags a div, set dragging to true, and this function updates the grid
      //with colors giving a visual representation whether the space is free or not.
     const position = this.gridItem.current.getBoundingClientRect();
     this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  render(){
    const object = this.props.object
    const index = this.props.index
    let div_style = {
      gridColumnStart: object.column_start,
      gridColumnEnd: object.column_start + object.width,
      gridRowStart: object.row_start,
      gridRowEnd: object.row_start + object.height,
      backgroundColor : object.backgroundColor
    }
    const { startX, startY } = this.state;
  	return (
      <div
        ref={this.gridItem}
        onMouseMove={this._onMouseMove.bind(this)}
        onMouseDown={this._onMouseDown.bind(this)}
        onMouseUp={this._onMouseUp.bind(this)}
        onClick={() => {
        }
      }
      style={div_style}>
        {object.text} X:{startX} Y:{startY}
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
