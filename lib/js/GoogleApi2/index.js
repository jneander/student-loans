import GoogleApi from 'google-api'

const API_KEY = '?'
const APP_ID = '?'
const CLIENT_ID = '?-?.apps.googleusercontent.com'
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
const SCOPES = [
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata'
].join(' ')

function initializeClient() {
  return GoogleApi.client
    .init({
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(() => {
      const isSignedIn = GoogleApi.auth2.getAuthInstance().isSignedIn.get()
      return Promise.resolve({isSignedIn})
    })
}

export function initialize() {
  return new Promise((resolve, reject) => {
    GoogleApi.load('client:auth2', () => {
      resolve(initializeClient())
    })
  })
}
