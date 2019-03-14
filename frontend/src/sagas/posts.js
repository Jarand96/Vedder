import { takeLatest, put, call, } from 'redux-saga/effects';
import { loginSuccess, loginUserFailure } from '../actions';
import {delay} from 'redux-saga';
import { browserHistory } from 'react-router';
import { url } from '../index';

export function* getPosts(action){
    //Do api call to get user info, include token as authentication.
    const response = yield call(fetch, url+'post', {
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

export function* postPost(action){
    //Do api call to get user info, include token as authentication.
    const formdata = new FormData();
    formdata.append('content_text', action.payload.text_content)
    action.payload.post_images.forEach(function(image, index){
      formdata.append("file_" + index, image)
    });

    const response = yield call(fetch, url+'post', {
      method:'POST',
      headers: {
       'Accept': 'application/json',
       'enctype':'multipart/form-data',
       'Authorization':action.payload.Authorization,
      },
      body: formdata
    });
    const data = yield call([response, response.json]);
    yield put({ type: 'GET_USERINFO', payload:data});
}

export function* watchPosts() {
  yield takeLatest('GET_POSTS', getPosts);
  yield takeLatest('POST_POST', postPost);
}
