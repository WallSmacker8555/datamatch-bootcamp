import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

import { BrowserRouter } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyAA2__yZqHrA9na5FeDXiDjBLoGb0ZISXQ",
  authDomain: "datamatch-bootcamp-61970.firebaseapp.com",
  databaseURL: "https://datamatch-bootcamp-61970-default-rtdb.firebaseio.com",
  projectId: "datamatch-bootcamp-61970",
  storageBucket: "datamatch-bootcamp-61970.appspot.com",
  messagingSenderId: "247356741069",
  appId: "1:247356741069:web:97819ab33a7979cb452084"
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);