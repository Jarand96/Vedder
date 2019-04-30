import { take, put, call, fork, select, all } from 'redux-saga/effects'
import { watchAuth } from "./auth.js";
import { watchUser } from "./user.js";
import { watchPosts } from "./posts.js";
import { watchAdvancedPost } from "./advancedPost.js";

// main saga generators
export default function* rootSaga() {
  yield all([
     fork(watchAuth),
     fork(watchUser),
     fork(watchPosts),
     fork(watchAdvancedPost),
  ])
}
