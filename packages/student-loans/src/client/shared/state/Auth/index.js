import {initialize} from '../../../../shared/wrappers/GoogleApi'
import {signIn, signOut} from '../../../../shared/wrappers/GoogleApi/auth'
import {
  SIGN_IN_CANCELED,
  SIGN_IN_FAILURE,
  SIGN_IN_STARTED,
  SIGN_IN_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_STARTED,
  SIGN_OUT_SUCCESS
} from './events'

export default class Auth {
  constructor(state = {}, onUpdate) {
    this._state = {
      authStatus: null,
      initialized: false,
      ...state
    }

    this._update = state => {
      onUpdate(new Auth({...this._state, ...state}, onUpdate))
    }

    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  get authStatus() {
    return this._state.authStatus
  }

  isInitialized() {
    return this._state.initialized
  }

  isAuthenticating() {
    return this._state.authStatus === SIGN_IN_STARTED
  }

  isSignedIn() {
    return this._state.authStatus === SIGN_IN_SUCCESS
  }

  isSigningIn() {
    return this._state.authStatus === SIGN_IN_STARTED
  }

  initialize() {
    initialize().then(({isSignedIn}) => {
      const authStatus = isSignedIn ? SIGN_IN_SUCCESS : null
      this._update({initialized: true, authStatus})
    })
  }

  uninitialize() {}

  signIn() {
    this._update({authStatus: SIGN_IN_STARTED})
    signIn()
      .then(() => {
        this._update({authStatus: SIGN_IN_SUCCESS})
      })
      .catch(() => {
        this._update({authStatus: SIGN_IN_FAILURE})
      })
  }

  signOut() {
    this._update({authStatus: SIGN_OUT_STARTED})
    signOut()
      .then(() => {
        this._update({authStatus: SIGN_OUT_SUCCESS})
      })
      .catch(() => {
        this._update({authStatus: SIGN_OUT_FAILURE})
      })
  }
}
