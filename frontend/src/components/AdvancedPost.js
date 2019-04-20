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
          console.log("Object and freespace starts on the same column.")
          sharedColumn = true;
      }
      //Check if the space we are checking for is on the left side of the object.
      //And then checks if the object intercepts with the space we are checking.
      else if(column_start < object.column_start){
          console.log("Free space start is lower than the objects start")
          if(column_end>object.column_start){
            console.log("The freespace end at column: " + column_end)
            console.log("The object starts at column: " + object.column_start)
            console.log("Free space end is not lower than the objects start, that means they are sharing space.")
            sharedColumn = true;
          }
      }
      //The space we are checking is on the right side of current object
      else{
        console.log("Free space start is bigger than objects start.")
          if(column_start<object.column_end){
            console.log("Objects end is bigger than free space start, meaning they share column.")
            sharedColumn = true;
          }
      }

      console.log("Column space check. Free space and object share column: " + sharedColumn)
      //If shared column is true, then we have to check if the object is on the same row also
      if(sharedColumn){
        if(row_start === object.row_start){
          console.log("SHARED COLUMN AND SAME ROW START")
          console.log("Failed because object with column start: " + object.column_start)
          spaceIsFree = false;
          }
        else if(row_start < object.row_start){
          //The freespace is intercepting with the objects bounds
          if(row_end > object.row_start){
            console.log("FREE SPACE DOES NOT END BEFORE NEXT OBJECT STARTS")
            console.log("Failed because object with row start: " + object.row_start)
            console.log("Free space ends at: " + row_end + ", Object starts at: " + object.row_start)
            spaceIsFree = false;}
        }
        //If freespace start is bigger than object start
        else{
          if(row_start < object.row_end){
            //Freespace start must be bigger or equal to the end of object, if not:
            console.log("OBJECT DOES NOT END BEFORE START OF FREESPACE")
            console.log("Failed because object with row start: " + object.row_start)
            console.log("Object ends at: " + object.row_end + ", Free space starts at: " + row_start)
            spaceIsFree = false;
        }
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
    let column_start = parseInt(this.state.column_start);
    let row_start = parseInt(this.state.row_start);
    let width = parseInt(this.state.width)
    let height = parseInt(this.state.height)
    let freeSpace = this.isSpaceFree(column_start,width,row_start,height);

    console.log("Is space free: " + freeSpace)
    if(!freeSpace){
      row_start = grid_height + 1;
    }
    grid.push({
      "width": width,
      "height": height,
      "column_start": column_start,
      "row_start": row_start,
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
    return(
    <div className="advanced_post">
        {grid.length>0 &&
          <div className = "grid-container" style={grid_style}>
          {grid.map((object, index) => {
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
        <div className="input-group">
        <label>width</label>
        <input type='text' name="width" onChange={(e) => {
          this.setState({
            'width':e.target.value
        })}}/>
        </div>
        <div className="input-group">
        <label>height</label>
        <input type='text' name="height" onChange={(e) => {
          this.setState({
            'height':e.target.value
        })}}/>
        </div>
        <div className="input-group">
        <label>Column start</label>
        <input type='text' name="column_start" onChange={(e) => {
          this.setState({
            'column_start':e.target.value
        })}}/>
        </div>
        <div className="input-group">
        <label>Row start</label>
        <input type='text' name="row_start" onChange={(e) => {
          this.setState({
            'row_start':e.target.value
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
