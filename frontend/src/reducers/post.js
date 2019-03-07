import jwtDecode from 'jwt-decode';

let initialState = {
 posts: [],
};

function postReducer(state = initialState, action) {
    //console.log(action.payload)
    switch (action.type) {
      case 'SET_POSTS':
        return { ...state,
           posts: action.payload,
         };
         break;
       }
    return state;
  }

export default postReducer;
