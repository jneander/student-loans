import GoogleApi from 'google-api'

export function signIn() {
  if (GoogleApi.auth2.getAuthInstance().isSignedIn.get()) {
    return Promise.resolve(true)
  }
  return new Promise((resolve, reject) => {
    GoogleApi.auth2
      .getAuthInstance()
      .signIn()
      .then(resolve)
  })
}

export function signOut() {
  if (!GoogleApi.auth2.getAuthInstance().isSignedIn.get()) {
    return Promise.resolve(true)
  }
  return new Promise((resolve, reject) => {
    GoogleApi.auth2
      .getAuthInstance()
      .signOut()
      .then(resolve)
  })
}
