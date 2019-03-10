import { auth } from '../../firebase';

export const actionTypes = {
  createUser: 'CREATE_USER',
  loginUser: 'LOGIN_USER',
  logoutUser: 'LOGOUT_USER',
};

export const createUser = (email: string, password: string) => dispatch => {
  return dispatch => {
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
            dispatch(actionTypes.createUser, { payload: user });
          })
          .catch(err => console.error(err.message));
  };
};

export const loginUser = (email: string, password: string) => dispatch => {
  console.log(email, password);
  return dispatch => {
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
            dispatch(actionTypes.loginUser, { payload: user });
          });
  };
};

export function logoutUser() {
  return dispatch => {
    auth.signOut()
          .then(() => {
            dispatch(actionTypes.logoutUser, { payload: null });
          });
  };
}
