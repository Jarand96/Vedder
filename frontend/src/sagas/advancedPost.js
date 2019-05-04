import { takeLatest, put, call, select } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import { browserHistory } from 'react-router';
import { url } from '../index';
import { getGridHeight, isSpaceFree } from '../utils'
var randomColor = require('randomcolor');


export const getGrid = (state) => state.advancedPost.grid




export function* setFocusObject(action){
    console.log("Setting focus object.")
    yield put({ type: 'SET_FOCUSED_OBJECT', payload: action.payload});
}

export function* addDiv(action){
  let grid = yield select(getGrid);
  let grid_height = getGridHeight(grid);
  console.log(grid_height)
  let freeSpace = isSpaceFree(1,12,1,1, grid);
  console.log("The space is free: " + freeSpace)
  let row_start = 1;
  if(!freeSpace){
    row_start = grid_height + 1;
  }
  let item = {
    "width": 12,
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

    yield put({ type: 'SET_FOCUSED_OBJECT', payload: action.payload});
}

export function* removeDiv(action){

    yield put({ type: 'SET_FOCUSED_OBJECT', payload: action.payload});
}



export function* watchAdvancedPost() {
  yield takeLatest('_SET_FOCUS_OBJECT', setFocusObject);
  yield takeLatest('_ADD_DIV', addDiv);
  yield takeLatest('_CHANGE_DIV', changeDiv);
  yield takeLatest('_REMOVE_DIV', removeDiv);

}
