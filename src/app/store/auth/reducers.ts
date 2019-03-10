import { actionTypes } from './actions';

export const initAuthState = { user: null };

export function authReducer(state = initAuthState, action: any) {
  switch (action.type) {
    case actionTypes.createUser:
    case actionTypes.loginUser:
    case actionTypes.logoutUser:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
