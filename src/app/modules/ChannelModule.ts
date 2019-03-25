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
    updateChannelData: 'UPDATE_CHANNEL_DATA',
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
              new Channel(
                document.channelId,
                document.channelName || '',
                document.channelImage || '',
              ),
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

  updateChannelData = (channel: Channel) =>
    (dispatch: Dispatch<Action>) => {
      const promise = new Promise((resolve, reject) => {
        dispatch(FluxAction.createPlaneSuccess(
          this.actionType.updateChannelData,
          { channel },
        ));
        const channelRef = db.collection('channels').doc(channel.channelId);
        channelRef
          .update({
            channelName: channel.channelName,
            channelImage: channel.channelImage,
          })
          .then(() => {
            resolve();
          })
          .catch(err => {
            console.error(err);
            reject(err);
          });
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
      case this.actionType.updateChannelData:
        return Object.assign(
          {},
          state,
          {
            channels: replaceChannel(state.channels, action.payload.channel),
          },
        );
      default:
        return state;
    }
  }
}

function replaceChannel(stateChannels: Channel[], updatedChannel: Channel) {
  const updatedChannels = stateChannels.slice(0);
  const updatedChannelIndex = updatedChannels.findIndex(channel => {
    return channel.channelId === updatedChannel.channelId;
  });

  if (updatedChannelIndex > -1) {
    updatedChannels.splice(updatedChannelIndex, 1, updatedChannel);
  } else {
    updatedChannels.push(updatedChannel);
  }

  console.log(updatedChannels);
  return updatedChannels;
}

export default new ChannelModule;
