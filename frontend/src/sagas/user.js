import { takeLatest, put, call, } from 'redux-saga/effects';
import { loginSuccess, loginUserFailure } from '../actions';
import {delay} from 'redux-saga';
import { browserHistory } from 'react-router';
import { url } from '../index';

export function* getUser(action){
    //Do api call to get user info, include token as authentication.
    const response = yield call(fetch, url+'user', {
      method:'GET',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization':action.payload,
      },
    });
    const data = yield call([response, response.json]);
    yield put({ type: 'GET_USERINFO', payload:data});
}

export function* updateUser(action){
    //Do api call to get user info, include token as authentication.
    const response = yield call(fetch, url+'user', {
      method:'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization':action.payload.Authorization,
      },
      body: JSON.stringify(      {
              'firstname': action.payload.firstname,
              'lastname': action.payload.lastname
            }) 
    });
    const data = yield call([response, response.json]);
    yield put({ type: 'GET_USERINFO', payload:data});
}

export function* updateUserProfilePicture(action){
  const formdata = new FormData();
  formdata.append('file', action.payload.file);

    //Do api call to get user info, include token as authentication.
    const response = yield call(fetch, url+ 'upload_profile_picture', {
      method:'POST',
      headers: {
       'Accept': 'application/json',
       'Authorization':action.payload.Authorization,
       'enctype':'multipart/form-data'
      },
      body: formdata
    });
    const data = yield call([response, response.json]);
    yield put({ type: 'SET_PROFILE_PIC', payload:data});
}

export function* watchUser() {
  yield takeLatest('GET_USER', getUser);
  yield takeLatest('UPDATE_USER', updateUser);
  yield takeLatest('UPDATE_USER_PROFILE_PIC', updateUserProfilePicture);

}
