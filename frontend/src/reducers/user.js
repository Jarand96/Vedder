import jwtDecode from 'jwt-decode';

let initialState = {
 firstname: '',
 lastname: '',
 gender: ''
};

function userReducer(state = initialState, action) {
    //console.log(action.payload)
    switch (action.type) {
      case 'GET_USERINFO':
        return { ...state,
           firstname: action.payload.firstname,
           lastname: action.payload.lastname,
         };
         break;
    }
    return state;
  }

export default userReducer;
