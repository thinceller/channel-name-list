import { Action, Dispatch } from 'redux';

import { db } from '../firebase';
import FluxAction from './FluxAction';
import { Channel } from '../models';

interface ChannelModuleState {
  channels: Channel[];
}

class ChannelModule {
  // ===========================================================================
  //  action types
  // ===========================================================================
  actionType = {
    getAllChannels: 'GET_ALL_CHANNELS',
  };

  // ===========================================================================
  //  initial state
  // ===========================================================================
  state: ChannelModuleState = {
    channels: [],
  };

  // ===========================================================================
  //  action creators
  // ===========================================================================
  getAllChannels = () => (dispatch: Dispatch<Action>) => {
    const promise = new Promise((resolve, reject) => {
      db.collection('channels')
        .get()
        .then(res => {
          let documents: Channel[] = [];

          res.forEach(doc => {
            const document = doc.data();
            documents = documents.concat(
              new Channel(document.channelId, document.channelName),
            );
          });

          dispatch(FluxAction.createPlaneSuccess(
            this.actionType.getAllChannels,
            { channels: documents },
          ));
          resolve(documents);
        })
        .catch(err => reject(err));
    });
    return promise;
  }

  // ===========================================================================
  //  reducer
  // ===========================================================================
  reducer = (state: ChannelModuleState = this.state, action: FluxAction): ChannelModuleState => {
    switch (action.type) {
      case this.actionType.getAllChannels:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
  }
}

export default new ChannelModule;
