import { auth } from '../../firebase';
import FluxAction from '../FluxAction';

export const actionTypes = {
  createUser: 'CREATE_USER',
  loginUser: 'LOGIN_USER',
  logoutUser: 'LOGOUT_USER',
};

export const createUser = (email: string, password: string) => dispatch => {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(email, password)
          .then(res => {
            console.log(res);
            const newUser = res.user;
            if (!newUser) { return; }
            const user = {
              uid: newUser.uid,
              email: newUser.email,
              providerId: newUser.providerId,
            };
            dispatch(FluxAction.createPlaneSuccess(actionTypes.createUser, { user }));
            resolve(res);
          })
          .catch(err => reject(err.message));
  });
};

export const loginUser = (email: string, password: string) => dispatch => {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(email, password)
          .then(res => {
            const currentUser = res.user;
            if (!currentUser) { return; }
            const user = {
              uid: currentUser.uid,
              displayNaame: currentUser.displayName,
              email: currentUser.email,
              emailVerified: currentUser.emailVerified,
              photoURL: currentUser.photoURL,
              providerId: currentUser.providerId,
            };
            dispatch(FluxAction.createPlaneSuccess(actionTypes.loginUser, { user }));
            resolve(res);
          })
          .catch(err => reject(err.message));
  });
};

export const logoutUser = () => dispatch => {
  return new Promise((resolve, reject) => {
    auth.signOut()
          .then(() => {
            dispatch(FluxAction.createPlaneSuccess(actionTypes.logoutUser, { user: null }));
            resolve();
          })
          .catch(err => reject(err.message));
  });
};
