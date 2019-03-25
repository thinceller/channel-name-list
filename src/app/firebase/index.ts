import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBAWucfsBSDKMBHx55qme0hPeHqlIjl0JI',
  authDomain: 'channel-name-list.firebaseapp.com',
  databaseURL: 'https://channel-name-list.firebaseio.com',
  projectId: 'channel-name-list',
  storageBucket: 'channel-name-list.appspot.com',
  messagingSenderId: '106427790138',
};

const fire = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

export const auth = fire.auth();
export const db = fire.firestore();
