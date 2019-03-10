import firebase from 'firebase';

export const actionTypes = {
  createUser: 'CREATE_USER',
  loginUser: 'LOGIN_USER',
  logoutUser: 'LOGOUT_USER',
};

export function createUser(email: string, password: string) {
  return dispatch => {
    firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
              const newUser = res.user;
              if (!newUser) { return; }
              const user = {
                uid: newUser.uid,
                email: newUser.email,
                providerId: newUser.providerId,
              };
              dispatch(actionTypes.createUser, { payload: user });
            });
  };
}

export function loginUser(email: string, password: string) {
  return dispatch => {
    firebase.auth()
            .signInWithEmailAndPassword(email, password)
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
}

export function logoutUser() {
  return dispatch => {
    firebase.auth()
            .signOut()
            .then(() => {
              dispatch(actionTypes.logoutUser, { payload: null });
            });
  };
}
