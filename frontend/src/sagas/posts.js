import { takeLatest, put, call, } from 'redux-saga/effects';
import { loginSuccess, loginUserFailure } from '../actions';
import {delay} from 'redux-saga';
import { browserHistory } from 'react-router';
import { url } from '../index';

export function* getPosts(action){
    //Do api call to get user info, include token as authentication.
    const response = yield call(fetch, url+'posts', {
      method:'GET',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization':action.payload,
      },
    });
    const data = yield call([response, response.json]);
    yield put({ type: 'SET_POSTS', payload:data});
}
export function* watchPosts() {
  yield takeLatest('GET_POSTS', getPosts);
}
