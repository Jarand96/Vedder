import jwtDecode from 'jwt-decode';

let initialState = {
 firstname: '',
 lastname: '',
 gender: '',
};

function userReducer(state = initialState, action) {
    //console.log(action.payload)
    switch (action.type) {
      case 'GET_USERINFO':
        return { ...state,
           email : action.payload.email,
           followers: action.payload.followers,
           following: action.payload.following,
           posts: action.payload.posts,
           firstname: action.payload.firstname,
           lastname: action.payload.lastname,
           profile_pic: action.payload.profile_pic
         };
         break;
       case 'SET_PROFILE_PIC':
         return { ...state,
            profile_pic_url: action.payload.filepath,
            profile_pic_name: action.payload.filename
          };
          break;
        case 'SET_FOCUSED_PROFILE':
          return {
            ...state,
            profileInFocus: action.payload
          };
          break;
        case 'CLEAR_FOCUSED_PROFILE':
          return {
            ...state,
            profileInFocus: {}
          };
          break;
    }
    return state;
  }

export default userReducer;
