import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDy71N3SsV9N_Qnqwd7f6V9fErEQZxHDVI',
  authDomain: 'student-loans-9a4ef.firebaseapp.com',
  databaseURL: 'https://student-loans-9a4ef.firebaseio.com',
  projectId: 'student-loans-9a4ef',
  storageBucket: 'student-loans-9a4ef.appspot.com',
  messagingSenderId: '31836189583'
};

firebase.initializeApp(config);

let accessToken;

const provider = new firebase.auth.GoogleAuthProvider();

function storeAccessToken (token) {
  window.localStorage.setItem('auth.accessToken', token);
}

function getAccessToken () {
  window.localStorage.getItem('auth.accessToken');
}

export function initialize () {
  return Promise.resolve(true);
}

export function restoreSession () {
  const auth = firebase.auth();

  return new Promise((resolve, reject) => {
    if (auth.currentUser) {
      resolve(true);
    }

    auth.getRedirectResult().then((result) => {
      if (result.credential) {
        return resolve(true);
      }

      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();

        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }).catch((error) => {
      resolve(false);
    });
  });
}

export function refreshSession () {
  const accessToken = getAccessToken();
  if (accessToken) {
    return;
  }

  return Promise.resolve(false);
}

export function signIn () {
  const auth = firebase.auth();

  auth.signInWithRedirect(provider);
}

export function signOut () {
  return firebase.auth().signOut();
}

export function add (type, data) {
  return firebase.database().ref(type)
    .push(data)
    .then(({ key }) => {
      return { ...data, id: key };
    });
}

export function get (type, id) {
  return firebase.database().ref(type).child(id).once('value')
    .then((data) => {
      const object = data.toJSON();
      object.id = id;
      return object;
    });
}

export function getAll (type) {
  return firebase.database().ref(type).once('value')
    .then((data) => {
      const map = data.toJSON();
      Object.keys(map).forEach((key) => map[key].id = key);
      return map;
    });
}

export function set (type, id, data) {
  return firebase.database().ref(type).set(id)
    .then(() => {
      return { ...data, id };
    });
}

export function remove (type, id) {
  return firebase.database().ref(type).child(id).remove();
}

export default {
  add,
  get,
  getAll,
  set,
  remove,
  initialize,
  signIn,
  signOut,
  restoreSession,
  refreshSession
};
