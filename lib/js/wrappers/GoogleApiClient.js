import GoogleApi from 'google-api';

const API_KEY = 'AIzaSyCYZzB7REvEuAAl8C1drN2kUWdT3fs-N6g';
const APP_ID = '173711872872';
const CLIENT_ID = '173711872872-1ckfsqnmse1h3b33f18kc3tjtu4c8nr4.apps.googleusercontent.com';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

let filePickerLoaded = false;

function initializeClient () {
  return GoogleApi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  });
}

function initialize () {
  return new Promise((resolve, reject) => {
    GoogleApi.load('client:auth2', () => {
      resolve(initializeClient());
    });
  });
}

function signIn () {
  if (GoogleApi.auth2.getAuthInstance().isSignedIn.get()) {
    return Promise.resolve(true);
  }
  return new Promise((resolve, reject) => {
    GoogleApi.auth2.getAuthInstance().signIn().then(resolve);
  });
}

function signOut () {
  if (!GoogleApi.auth2.getAuthInstance().isSignedIn.get()) {
    return Promise.resolve(true);
  }
  return new Promise((resolve, reject) => {
    GoogleApi.auth2.getAuthInstance().signOut().then(resolve);
  });
}

function createFile (attr) {
  return new Promise((resolve, reject) => {
    GoogleApi.client.drive.files.create(attr)
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      });
  });
}

function updateFile (fileId, file) {
  return new Promise((resolve, reject) => {
    GoogleApi.client.request({
      body: file.content,
      headers: {
        'Content-Type': file.mimeType
      },
      method: 'PATCH',
      params: { uploadType: 'media' },
      path: `/upload/drive/v3/files/${fileId}`
    }).then((response) => {
      if (response.status === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
}

function listFiles (options = {}) {
  let q = 'trashed=false';
  if (options.mimeType) {
    q += ` and mimeType='${options.mimeType}'`;
  }
  return new Promise((resolve, reject) => {
    GoogleApi.client.drive.files.list({
      fields: 'files(id, name, modifiedTime)',
      orderBy: 'modifiedTime desc',
      q
    }).then((response) => {
      if (response.status === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
}

const GoogleClient = {
  createFile,
  updateFile,
  listFiles,
  initialize,
  signIn,
  signOut
};

export default GoogleClient;
