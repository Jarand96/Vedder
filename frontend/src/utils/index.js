import {
  store
} from '../store.js'

export function isSpaceFree(column_start, width, row_start, height){
  const state = store.getState();
  const grid = state.advancedPost.grid
  const focusObject = state.advancedPost.objectInFocus
  const focusObjectIndex = grid.indexOf(focusObject)
  let spaceIsFree = true;
  let column_end = column_start + width;
  let row_end = row_start + height;
  grid.forEach((object, index) => {
    if(index == focusObjectIndex) return null;
    //Check if object is on the same columns as the free space
    //If that is the case, we have to check if the object is also on
    //the same row as the space we are checking.
    let sharedColumn = false;
    //Check if there is already an object starting in that column
    if (column_start === object.column_start) {
      sharedColumn = true;
    }
    //Check if the space we are checking for is on the left side of the object.
    //And then checks if the object intercepts with the space we are checking.
    else if (column_start < object.column_start) {
      if (column_end > object.column_start) {
        sharedColumn = true;
      }
    }
    //The space we are checking is on the right side of current object
    else {
      if (column_start < object.column_start + object.width) {
        sharedColumn = true;
      }
    }
    if (sharedColumn) {
      if (row_start === object.row_start) {
        spaceIsFree = false;
      } else if (row_start < object.row_start) {
        //The freespace is intercepting with the objects bounds
        if (row_end > object.row_start) {
          spaceIsFree = false;
        }
      }
      //If freespace start is bigger than object start
      else {
        if (row_start < object.row_start + object.height) {
          //Freespace start must be bigger or equal to the end of object, if not:
          spaceIsFree = false;
        }
      }
    }
  })
  return spaceIsFree
}

export function getGridHeight() {
  const state = store.getState();
  const grid = state.advancedPost.grid
  let max_height = 0;
  grid.forEach((object, index) => {
    let objects_height = object["row_start"] + object["height"] - 1
    if (objects_height > max_height) {
      max_height = objects_height
    }
  })
  return max_height
}
