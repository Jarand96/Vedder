import { takeLatest, put, call, } from 'redux-saga/effects';
import { loginSuccess, loginUserFailure } from '../actions';
import {delay} from 'redux-saga';
import { browserHistory } from 'react-router';
import { url } from '../index';

export function* getUser(action){
    //Do api call to get user info, include token as authentication.

    yield put({ type: 'GET_USERINFO'});
}


export function* watchUser() {
  yield takeLatest('GET_USER', getUser);

}
