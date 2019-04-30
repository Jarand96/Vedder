import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth.js";
import userReducer from "./user.js";
import postReducer from "./post.js";
import advancedPostReducer from "./advancedPost.js";

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  posts: postReducer,
  advancedPost: advancedPostReducer
  // your reducer here
});
