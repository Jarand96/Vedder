import { takeLatest, put, call, select } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import { browserHistory } from 'react-router';
import { url } from '../index';
import { getGridHeight, isSpaceFree } from '../utils'
var randomColor = require('randomcolor');


export const getGrid = (state) => state.advancedPost.grid
export const getfocusObject = (state) => state.advancedPost.objectInFocus

export function* setFocusObject(action){
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
    yield put({ type: 'ADD_GRID_ITEM', payload: item });
    yield put({ type: 'SET_GRID_ROWS', payload: row_start});
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

export function* setCellHeight(action){
    yield put({ type: 'SET_CELL_HEIGHT', payload: action.payload});
}
export function* setGridRows(action){
    yield put({ type: 'SET_GRID_ROWS', payload: action.payload});
}

export function* moveDiv(action){
  let xSteps = action.payload.xSteps;
  let ySteps = action.payload.ySteps;
  let grid = yield select(getGrid);
  let focusObject = yield select(getfocusObject)
  let object = JSON.parse(JSON.stringify(focusObject));

  //If user is trying to move object out of the grid.
  //This can be integrated in isSpaceFree
  if((object.column_start + xSteps < 1) ||
  (object.column_start + object.width + xSteps > 13) ||
  (object.row_start + ySteps <= 0)){
    return
  }

  //hvis object.row er større enn
  let freeSpace;
  object.column_start += xSteps;

  //If steps is
  object.row_start += ySteps;

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
  yield takeLatest('_SET_CELL_HEIGHT', setCellHeight);
  yield takeLatest('_SET_GRID_ROWS', setGridRows);
  yield takeLatest('_MOVE_DIV', moveDiv);
}
