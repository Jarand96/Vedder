import React, { Component } from "react";
import {store} from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import { getGridHeight } from '../utils'
import update from 'immutability-helper';
var randomColor = require('randomcolor');
import GridItem from "./GridItem";


class AdvancedPost extends Component {
  constructor(props){
    super(props);
    const {dispatch} = props;
    this.state = {
      width: 1,
      grid : [],
    }
    this.gridContainer = React.createRef();
  }

  componentDidMount(){
      this.props.dispatch({
        type: "_SET_CONTAINER_WIDTH",
        payload: {
          width: this.gridContainer.current.offsetWidth,
          height: this.gridContainer.current.offsetHeight
        }
      });

    window.addEventListener("resize", () => {
      this.props.dispatch({
        type: "_SET_CONTAINER_WIDTH", payload: {
          width: this.gridContainer.current.offsetWidth,
          height: this.gridContainer.current.offsetHeight
        }
      });
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.props.dispatch({
      type: "_SET_CONTAINER_WIDTH", payload: this.gridContainer.current.offsetWidth
    }));
  }

  componentDidUpdate(prevProps){
    //hvis prevprops.gridHeight != this.prop.gridHeight:
    //
    if(prevProps.advancedPost.gridRows !== this.props.advancedPost.gridRows){
      this.props.dispatch({
        type: "_SET_CELL_HEIGHT", payload: this.gridContainer.current.offsetHeight
      })
    }
  }

  changeRightSideWidth(steps){
    let focusObject = this.state.grid[this.state.focusObjectIndex]
    var object = JSON.parse(JSON.stringify(focusObject));
    if(!object)return

    //hvis steps er negativ og width bare er en,
    //eller brukeren prøver å utvide lenger en maks kolonne.
    if (steps < 0 && object.width === 1
    || steps > 0 && object.column_start + object.width >=13) {
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

  render(){
    //let grid = this.state.grid
    let grid = this.props.advancedPost.grid
    let grid_height = getGridHeight();
    let grid_style = {
      gridTemplateRows: `repeat(${grid_height}, 40px)`
    }

    return(
    <div className="advanced_post">
          <div
          className="grid-container"
          ref={this.gridContainer}
          style={grid_style}>
          {grid.map((object, index) => {
            return(
            <GridItem key={index} index={index} object={object}/>
          )
          })}
        </div>
        <button onClick={() => {
          this.props.dispatch({type: "_ADD_DIV", payload: {
            'index': 1,
            'object': 2
          }});
          console.log(this.props)
          }}>Add div</button>   

        <div className="position_controllers">
          <button onClick={() => {
              console.log(this.props.advancedPost)
              this.props.dispatch({type: "_MOVE_DIV_X", payload: -1});
            }}>Move Left</button>
            <button onClick={() => {
                console.log(this.props.advancedPost)
                this.props.dispatch({type: "_MOVE_DIV_X", payload: 1});
              }}>Move Right</button>
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
      advancedPost: state.advancedPost
    };
}

export default connect(
  mapStateToProps,
)(AdvancedPost);
