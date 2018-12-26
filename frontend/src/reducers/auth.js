import jwtDecode from 'jwt-decode';

let initialState = {
 token: null,
 email: null,
 isAuthenticated: false,
 isAuthenticating: false,
 isRegistering: false,
 isRegistered: false,
 statusText:''
};

function authReducer(state = initialState, action) {
    //console.log(action.payload)
    switch (action.type) {
      case 'LOGGED_SUCCESSFULLY':
        return { ...state,
           isAuthenticated:true,
           isAuthenticating:false,
           token : action.payload,
           email: jwtDecode(action.payload).email,
           statusText: 'You have been successfully logged in.'
         };
         break;
      case 'LOGIN_REQUESTED':
          return {...state,
            isAuthenticating:true
          }
          break;
      case 'LOGIN_USER_FAILURE':
          return {...state,
            statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
          }
          break;
      case 'LOGGED_OUT':
          return {...state,
            token: null,
            email: null,
            isAuthenticated: false,
            isAuthenticating: false,
            isRegistering: false,
            isRegistered: false,
            statusText:''
          }
          break;
    }
    return state;
  }

export default authReducer;
