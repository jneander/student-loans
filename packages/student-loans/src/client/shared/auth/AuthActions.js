import * as FirebaseClient from '../wrappers/FirebaseClient'

export const INITIALIZE_STARTED = Symbol('INITIALIZE_STARTED')
export const INITIALIZE_SUCCESS = Symbol('INITIALIZE_SUCCESS')
export const INITIALIZE_FAILURE = Symbol('INITIALIZE_FAILURE')
export const SIGN_IN_STARTED = Symbol('SIGN_IN_STARTED')
export const SIGN_IN_SUCCESS = Symbol('SIGN_IN_SUCCESS')
export const SIGN_IN_FAILURE = Symbol('SIGN_IN_FAILURE')
export const SIGN_OUT_STARTED = Symbol('SIGN_OUT_STARTED')
export const SIGN_OUT_SUCCESS = Symbol('SIGN_OUT_SUCCESS')
export const SIGN_OUT_FAILURE = Symbol('SIGN_OUT_FAILURE')

export function initialize() {
  return function(dispatch, getState) {
    dispatch({type: INITIALIZE_STARTED})
    FirebaseClient.restoreSession()
      .then(isSignedIn => {
        if (isSignedIn) {
          dispatch({type: SIGN_IN_SUCCESS})
        }
        dispatch({type: INITIALIZE_SUCCESS})
      })
      .catch(error => {
        dispatch({type: INITIALIZE_FAILURE, payload: error})
      })
  }
}

export function signIn() {
  return function(dispatch, getState) {
    FirebaseClient.signIn()
  }
}

export function signOut() {
  return function(dispatch, getState) {
    dispatch({type: SIGN_OUT_STARTED})
    FirebaseClient.signOut()
      .then(() => {
        dispatch({type: SIGN_OUT_SUCCESS})
      })
      .catch(error => {
        dispatch({type: SIGN_OUT_FAILURE})
      })
  }
}
