import gapi from 'google-api'
// const {getEnv} = require('@jneander/dev-tools/utils/cli')

import Auth from './Auth'
import Files from './Files'

const API_KEY = '?'
const APP_ID = '?'
const CLIENT_ID = '?-?.apps.googleusercontent.com'
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
const SCOPES = [
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata'
].join(' ')

async function loadClient() {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      resolve()
    })
  })
}

async function initializeClient() {
  return gapi.client
    .init({
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(() => {
      const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
      return Promise.resolve({isSignedIn})
    })
}

export default class GoogleApi {
  constructor() {
    this.auth = new Auth()
    this.files = new Files()
  }

  async initialize() {
    return loadClient().then(initializeClient)
  }
}
