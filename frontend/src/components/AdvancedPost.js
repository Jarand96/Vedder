import React, { Component } from "react";
import {store} from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
var randomColor = require('randomcolor');


class AdvancedPost extends Component {
  constructor(props){
    super(props);
    const {dispatch} = props;
    this.state = {
      width: 1,
      grid : [],
    }
    this.addDiv = this.addDiv.bind(this);
  }

  isSpaceFree(column_start, width, row_start, height){
    let spaceIsFree = true;
    let grid = this.state.grid;
    let column_end = column_start + width;
    let row_end = row_start + height;
    grid.forEach((object, index)=> {
      //Check if object is on the same columns as the free space
      //If that is the case, we have to check if the object is also on
      //the same row as the space we are checking.
      let sharedColumn = false;
      //Check if there is already an object starting in that column
      if(column_start === object.column_start){
          sharedColumn = true;
      }
      //Check if the space we are checking for is on the left side of the object.
      //And then checks if the object intercepts with the space we are checking.
      else if(column_start < object.column_start){
          if(!column_end<=object.column_start){
            sharedColumn = true;
          }
      }
      //The space we are checking is on the right side of current object
      else{
          if(!column_start>=object.column_end){
            sharedColumn = true;
          }
      }
      //If shared column is true, then we have to check if the object is on the same row also
      if(sharedColumn){
        if(row_start === object.row_start){
          spaceIsFree = false;
          }
        else if(row_start < object.row_start){
          //The freespace is intercepting with the objects bounds
          if(!row_end <= object.row_start)
            spaceIsFree = false;
        }
        else{
          if(!row_start >= object.row_end)
            spaceIsFree = false;
        }
      }
    })
    return spaceIsFree
  }

  getGridHeight(){
    let max_height = 1;
    this.state.grid.forEach((object, index) => {
      let objects_height = object["row_start"] + object["height"] - 1
      if(objects_height > max_height){
        max_height = objects_height
      }
    })
    return max_height
  }

  addDiv(){
    let grid = this.state.grid;
    let grid_height = this.getGridHeight();
    let freeSpace = this.isSpaceFree(1,12,grid_height,1);
    console.log(freeSpace)
    if(!freeSpace){
      grid_height += 1;
    }
    grid.push({
      "width": parseInt(this.state.width),
      "height":1,
      "column_start": 1,
      "row_start": grid_height,
      "text" : "Hei på deg, jeg er en div.",
      "isPlaceholder" : false,
      "backgroundColor" : randomColor()
    })
    this.setState({
      grid : grid
    })
  }
  // render
  render(){
    let grid = this.state.grid
    let grid_height = this.getGridHeight();
    let grid_style = {
      gridTemplateRows: `repeat(${grid_height}, 40px)`
    }
    console.log(this.state)
    return(
    <div className="advanced_post">
        {grid.length>0 &&
          <div className = "grid-container" style={grid_style}>
          {grid.map((object, index) => {
            console.log(object);
            let div_style = {
              gridColumnStart: object.column_start,
              gridColumnEnd: object.column_start + object.width,
              gridRowStart: object.row_start,
              gridRowEnd: object.row_start + object.height,
              backgroundColor : object.backgroundColor
            }
            return (<div onClick={() => {
              this.setState({
                'objectInFocus' : object 
              })
            }} key={index} style={div_style}>{object.text}</div>)
          })}
        </div>
        }
        <div>
        <label>width</label>
        <input type='text' name="width" onChange={(e) => {
          this.setState({
            'width':e.target.value
        })}}/>
        </div>
        <button onClick={this.addDiv}>Add div</button>
    </div>
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
)(AdvancedPost);
