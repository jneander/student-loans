import GoogleApi from 'google-api';

const CLIENT_ID = '173711872872-1ckfsqnmse1h3b33f18kc3tjtu4c8nr4.apps.googleusercontent.com';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

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

function listFiles () {
  return GoogleApi.client.drive.files.list({
    fields: 'nextPageToken, files(id, name)',
    pageSize: 10
  });
}

const GoogleClient = {
  initialize,
  signIn,
  signOut
};

export default GoogleClient;
