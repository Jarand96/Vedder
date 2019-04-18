import React, { Component } from "react";
import {store} from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';


class AdvancedPost extends Component {
  constructor(props){
    super(props);
    const {dispatch} = props;
    this.state = {
      grid : [],
    }
    this.addDiv = this.addDiv.bind(this);
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
    let grid = this.state.grid
    grid.push({
      "width": 6,
      "height":1,
      "column_start": 4,
      "row_start":1,
      "text" : "Hei på deg, jeg er en div.",
      "isPlaceholder" : false,
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
              backgroundColor : "red"
            }
            return (<div key={index} style={div_style}>{object.text}</div>)
          })}
        </div>
        }
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
