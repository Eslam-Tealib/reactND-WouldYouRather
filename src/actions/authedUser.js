export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOG_OUT = 'LOG_OUT'


export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}

export function handleSetAuthedUser(id) {

  return (dispatch) => {
  
    return dispatch(setAuthedUser(id))
  }


}
export function logout (id) {
  return {
    type: LOG_OUT,
    id
  }
}
export function handleLogout(id) {

  return (dispatch) => {
  
    return dispatch(logout(id))
  }


}