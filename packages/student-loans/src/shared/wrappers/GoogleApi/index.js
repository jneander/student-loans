import GoogleApi from 'google-api'

const API_KEY = 'AIzaSyAK9PVIBYeElyePib2YOfbSL1QBIcJms7U'
const APP_ID = '213967887212'
const CLIENT_ID = '213967887212-qae15jda3b2bb5go0u1bv1nqujnad2ve.apps.googleusercontent.com'
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
