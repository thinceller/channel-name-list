import { dbActionTypes } from './actions';

export const initDBState = { channels: null };

export function dbReducer(state = initDBState, action: any) {
  switch (action.type) {
    case dbActionTypes.getAllChannels:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
