import { takeLatest, put, call, select } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import { browserHistory } from 'react-router';
import { url } from '../index';
import { getGridHeight, isSpaceFree } from '../utils'
var randomColor = require('randomcolor');


export const getGrid = (state) => state.advancedPost.grid
export const getfocusObject = (state) => state.advancedPost.objectInFocus

export function* setFocusObject(action){
    console.log("Setting focus object.")
    yield put({ type: 'SET_FOCUS_OBJECT', payload: action.payload});
}

export function* addDiv(action){
  let grid = yield select(getGrid);
  let grid_height = getGridHeight(grid);
  let row_start;
  if(grid_height===0){
    row_start=1
  } else{row_start=grid_height+1}
  let item = {
    "width": 6,
    "height": 1,
    "column_start": 1,
    "row_start": row_start,
    "text" : "Hei på deg, jeg er en div.",
    "isPlaceholder" : false,
    "backgroundColor" : randomColor()
  }
    yield put({ type: 'ADD_GRID_ITEM', payload: item});
}

export function* changeDiv(action){

    yield put({ type: 'CHANGE_DIV', payload: action.payload});
}

export function* removeDiv(action){

    yield put({ type: 'REMOVE_DIV', payload: action.payload});
}

export function* setContainerWidth(action){

    yield put({ type: 'SET_CONTAINER_WIDTH', payload: action.payload});
}

export function* moveX(action){
  let steps = action.payload
  let grid = yield select(getGrid);
  let focusObject = yield select(getfocusObject)
  let object = JSON.parse(JSON.stringify(focusObject));
  console.log("These are inputted steps: " + steps)
  //If no div is selected.
  if(!object){
    console.log("Please select a div. ");
    return
  }
  //If user is trying to move object out of the grid.
  if((object.column_start + steps < 1) ||
  (object.column_start + object.width + steps > 13)){
    console.log("Moving outside of bounds.");
    return
  }
  let freeSpace;
  let column_start = object.column_start
  object.column_start += steps;
  freeSpace = isSpaceFree(object.column_start, object.width, object.row_start, object.height)
  let focusObjectIndex = grid.indexOf(focusObject)
  if(freeSpace){
    yield put({ type: 'UPDATE_GRID_ITEM', payload: {
      'object' : object,
      'index': focusObjectIndex
    }});
  }
  else{ console.log("Not enough space") }
}

export function* watchAdvancedPost() {
  yield takeLatest('_SET_FOCUS_OBJECT', setFocusObject);
  yield takeLatest('_ADD_DIV', addDiv);
  yield takeLatest('_CHANGE_DIV', changeDiv);
  yield takeLatest('_REMOVE_DIV', removeDiv);
  yield takeLatest('_SET_CONTAINER_WIDTH', setContainerWidth);
  yield takeLatest('_MOVE_DIV_X', moveX);
}
