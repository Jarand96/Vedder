import { takeLatest, put, call, } from 'redux-saga/effects';
import { loginSuccess, loginUserFailure } from '../actions';
import {delay} from 'redux-saga';
import { browserHistory } from 'react-router';
import { url } from '../index';

export function* LoginRequest(action) {
  //Make login post request to api here.
  yield put({ type: 'LOGIN_REQUESTED'});
  const response = yield call(fetch, url+'Login', {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username':action.payload.username,
      'password' : action.payload.password
    })
  });
  const token = yield call([response, response.json]);
  if(response.status >= 200 && response.status < 300){
    try{
      yield put(loginSuccess(token));
    } catch (e) {
      yield put(loginUserFailure(
        {
            response: {
            status: 403,
            statusText: 'Invalid token',
            },
        }));
      }
  }
  else{
    yield put({ type: 'SET_STATUSTEXT', payload: {
      statusText : "Invalid username or password",
      status : "error"
    }});
    yield call(delay, 4000);
    yield put({ type: 'HIDE_STATUSTEXT', payload: null });
  }
  //yield put({ type: 'SET_TASKS', payload: data })
  //console.log('Successful post');
}

export function* RegisterRequest(action) {
  //Make login post request to api here.
  const response = yield call(fetch, url+'user', {
    method:'CREATE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username':action.payload.username,
      'password' : action.payload.password,
      'adminpassword' : action.payload.adminpassword
    })
  });

  if(response.status>=200  && response.status < 300){
    browserHistory.push("/");
  }
  else{
    console.log("Input not valid");
  }
  //const data = yield call([response, response.json]);
  //console.log(data);
  //yield put({ type: 'SET_TASKS', payload: data })
}

export function* logout(action){
    localStorage.removeItem('token');
    yield put({ type: 'LOGGED_OUT'});
}


export function* watchAuth() {
	yield takeLatest('LOGIN_REQUEST', LoginRequest);
  yield takeLatest('REGISTER_REQUEST', RegisterRequest);
  yield takeLatest('LOGOUT_REQUEST', logout);

}
