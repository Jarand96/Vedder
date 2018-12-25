import { browserHistory } from 'react-router';

/*
export function clear_task_status(task_id){
  console.log(task_id)
  setTimeout(() => {
  store.dispatch({
    type: 'HIDE_TASK_STATUSTEXT',
    payload: task_id
    })
  }, 5000)
}*/

export function loginSuccess(token) {
  localStorage.setItem('token', token);
   return {
       type: 'LOGGED_SUCCESSFULLY',
       payload: token
   };
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: 'LOGIN_USER_FAILURE',
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}
