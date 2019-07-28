import gapi from 'google-api'

export default class Auth {
  async signIn() {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      return Promise.resolve(true)
    }
    return new Promise((resolve, reject) => {
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(resolve)
    })
  }

  async signOut() {
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      return Promise.resolve(true)
    }
    return new Promise((resolve, reject) => {
      gapi.auth2
        .getAuthInstance()
        .signOut()
        .then(resolve)
    })
  }
}
