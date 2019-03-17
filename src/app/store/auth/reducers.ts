import { authActionTypes } from './actions';

export const initAuthState = { user: null };

export function authReducer(state = initAuthState, action: any) {
  switch (action.type) {
    case authActionTypes.fetchUser:
    case authActionTypes.createUser:
    case authActionTypes.loginUser:
    case authActionTypes.logoutUser:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
