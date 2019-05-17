

export function isSpaceFree(column_start, width, row_start, height, grid){
 console.log("Entered isSpaceFree")
 let spaceIsFree = true;
 console.log("This is the grid" + grid)
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

export function getGridHeight(grid){
  console.log("entered getGridHeight")
  let max_height = 1;
  grid.forEach((object, index) => {
    let objects_height = object["row_start"] + object["height"] - 1
    if(objects_height > max_height){
      max_height = objects_height
    }
  })
  return max_height
}

export function moveX(steps, grid, focusObject){
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
    freeSpace = isSpaceFree(object.column_start+object.width, steps, object.row_start, object.height)
  }
  else{
    let positive_steps = Math.abs(steps)
    freeSpace = isSpaceFree(object.column_start-positive_steps, positive_steps, object.row_start, object.height)
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
