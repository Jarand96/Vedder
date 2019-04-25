import React, { Component } from "react";
import {store} from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import update from 'immutability-helper';
var randomColor = require('randomcolor');


class AdvancedPost extends Component {
  constructor(props){
    super(props);
    const {dispatch} = props;
    this.state = {
      width: 1,
      grid : [],
    }
    this.gridContainer = React.createRef();
    this.addDiv = this.addDiv.bind(this);
  }
  changeRightSideWidth(steps){
    let focusObject = this.state.grid[this.state.focusObjectIndex]
    var object = JSON.parse(JSON.stringify(focusObject));
    if(!object)return

    //hvis steps er negativ og width bare er en,
    //eller brukeren prøver å utvide lenger en maks kolonne.
    if (steps < 0 && object.width === 1
    || steps > 0 && object.column_start + object.width >=13) {
    console.log("Action not possible.");
    return}

    if(steps>0){
      let freeSpace = this.isSpaceFree(object.column_start + object.width, steps, object.row_start, object.height)
      if(!freeSpace){
          console.log("Failed to change width of div. Likely due to lack of space")
          return
      }
    }
    let newWidth = object.width += steps
    //Sjekk om det er ledig plass med kolonne start likt som nå, med med bredde likt som nå pluss steps.
    let focusObjectIndex = this.state.focusObjectIndex
    this.setState({
      grid: update(this.state.grid, {
        [focusObjectIndex]: {width: {$set: newWidth}}})
    })
    //Hvis det er ledig lagre state med ny bredde.
    //Hvis det ikke er ledig plass skriv det til konsoll, vi tar oss av feilmeldinger senere.
  }

  moveX(steps){
    let focusObject = this.state.grid[this.state.focusObjectIndex]
    var object = JSON.parse(JSON.stringify(focusObject));
    //If no div is selected.
    if(!object){
      console.log("Please select a div. ");
      return
    }
    //If user is trying to move object out of the grid.
    if ((object.column_start == 1 && steps<0)
      || (object.column_start + object.width == 13 && steps>0)){
      console.log("You can't do that..");
      return
    }
    //Bruk isSpaceFree til å sjekke om kolonnen er ledig.
    //returner feilmelding dersom plassen ikke er ledig og returner
    //Fortsett hvis plassen er ledig.
    let freeSpace;
    if(steps>0){
      freeSpace = this.isSpaceFree(object.column_start+object.width, steps, object.row_start, object.height)
    }
    else{
      let positive_steps = Math.abs(steps)
      freeSpace = this.isSpaceFree(object.column_start-positive_steps, positive_steps, object.row_start, object.height)
    }
    let newColumnStart = object.column_start += steps
    let focusObjectIndex = this.state.focusObjectIndex
    if(freeSpace){
      this.setState({
        grid: update(this.state.grid, {
          [focusObjectIndex]: {column_start: {$set: newColumnStart}}})
      })
    }
    else{
      console.log("Not enough space")
    }
  }

  moveY(steps){

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
      console.log(object)
      //Check if there is already an object starting in that column
      if(column_start === object.column_start){
          sharedColumn = true;
      }
      //Check if the space we are checking for is on the left side of the object.
      //And then checks if the object intercepts with the space we are checking.
      else if(column_start < object.column_start){
          if(column_end>object.column_start){
            sharedColumn = true;
          }
      }
      //The space we are checking is on the right side of current object
      else{
          if(column_start<object.column_start + object.width){
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
          if(row_end > object.row_start){
            spaceIsFree = false;}
        }
        //If freespace start is bigger than object start
        else{
          if(row_start < object.row_start + object.height){
            //Freespace start must be bigger or equal to the end of object, if not:
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
  render(){
    let grid = this.state.grid
    let grid_height = this.getGridHeight();
    let grid_style = {
      gridTemplateRows: `repeat(${grid_height}, 40px)`
    }
    return(
    <div className="advanced_post">
        {grid.length>0 &&
          <div ref={this.gridContainer} className = "grid-container" style={grid_style}>
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
                'objectInFocus' : object,
                'focusObjectIndex' : index
              }, () => {console.log(this.state)})
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

        <div className="position_controllers">
          <button onClick={() => this.moveX(-1)}>Move Left</button>
          <button onClick={() => this.moveX(1)}>Move right</button>
        </div>
        <div className="size_controllers">
          <button onClick={() => this.changeRightSideWidth(1)}>Expand right</button>
          <button onClick={() => this.changeRightSideWidth(-1)}>Decrease right</button>
        </div>
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
