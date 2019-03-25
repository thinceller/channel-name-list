import { Action, Dispatch } from 'redux';

import { auth, db } from '../firebase';
import FluxAction from './FluxAction';

interface UserModuleState {
  auth: firebase.User | null;
  user: {
    uid: string,
    displayName: string,
    authority: string,
  } | null;
}

class UserModule {
  // ===========================================================================
  //  action types
  // ===========================================================================
  actionType = {
    fetchAuth: 'FETCH_AUTH',
    fetchUser: 'FETCH_USER',
    createUser: 'CREATE_USER',
    loginUser: 'LOGIN_USER',
    logoutUser: 'LOGOUT_USER',
  };

  // ===========================================================================
  //  initial state
  // ===========================================================================
  state: UserModuleState = {
    auth: null,
    user: null,
  };

  // ===========================================================================
  //  action creators
  // ===========================================================================
  fetchAuth = () => (dispatch: Dispatch<Action>) => {
    const promise = new Promise((resolve) => {
      auth.onAuthStateChanged(auth => {
        if (auth) {
          dispatch(FluxAction.createPlaneSuccess(
            this.actionType.fetchAuth,
            { auth },
          ));
          const userRef = db.collection('users').doc(auth.uid);
          userRef
            .get()
            .then(doc => {
              if (doc.exists) {
                const user = doc.data();
                dispatch(FluxAction.createPlaneSuccess(
                  this.actionType.fetchUser,
                  { user },
                ));
              }
            });
          resolve(auth);
        }
      });
    });
    return promise;
  }

  createUser = (email: string, password: string) => (dispatch: Dispatch<Action>) => {
    const promise = new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          const { user } = res;
          if (!user) { return; }
          dispatch(FluxAction.createPlaneSuccess(
            this.actionType.createUser,
            { user },
          ));
          resolve(user);
        })
        .catch(err => reject(err));
    });
    return promise;
  }

  loginUser = (email: string, password: string) => (dispatch: Dispatch<Action>) => {
    const promise = new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          const { user } = res;
          if (!user) { return; }
          dispatch(FluxAction.createPlaneSuccess(
            this.actionType.loginUser,
            { user },
          ));
          resolve(user);
        })
        .catch(err => reject(err));
    });
    return promise;
  }

  logoutUser = () => (dispatch: Dispatch<Action>) => {
    const promise = new Promise((resolve, reject) => {
      auth.signOut()
        .then(() => {
          dispatch(FluxAction.createPlaneSuccess(
            this.actionType.logoutUser,
            { auth: null, user: null },
          ));
          resolve();
        })
        .catch(err => reject(err));
    });
    return promise;
  }

  // ===========================================================================
  //  reducer
  // ===========================================================================
  reducer = (state: UserModuleState = this.state, action: FluxAction): UserModuleState => {
    switch (action.type) {
      case this.actionType.fetchAuth:
      case this.actionType.fetchUser:
      case this.actionType.createUser:
      case this.actionType.loginUser:
      case this.actionType.logoutUser:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
  }
}

export default new UserModule();
