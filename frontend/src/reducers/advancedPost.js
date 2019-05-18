import jwtDecode from 'jwt-decode';

let initialState = {
 grid: [],
 objectInFocus: {},
 focusObjectIndex: 0,
};

function advancedPostReducer(state = initialState, action) {
    //console.log(action.payload)
    let newGrid;
    switch (action.type) {
      case 'ADD_GRID_ITEM':
        newGrid = state.grid.slice()
        newGrid.splice(0, 0, action.payload)
        return {...state,
          grid: newGrid
        }
        break;
     case 'REMOVE_GRID_ITEM':
         newGrid = state.grid.slice()
         newGrid.splice(action.payload.index, 1)
         return {...state,
           grid: newGrid
         }
         break;
      case 'UPDATE_GRID_ITEM':
        newGrid = state.grid.slice()
        newGrid.splice(action.payload.index, 1, action.payload.object)
        return {...state,
          grid: newGrid,
          objectInFocus: action.payload.object,
          focusObjectIndex: action.payload.index
        }
        break;
      case 'SET_FOCUS_OBJECT':
        return {
          ...state,
          objectInFocus: action.payload.object,
          focusObjectIndex: action.payload.index
        }
      case 'SET_CONTAINER_WIDTH':
        return {
          ...state,
          gridContainerWidth: action.payload,
          gridCellWidth: action.payload/12
        }
       }
    return state;
  }

export default advancedPostReducer;
