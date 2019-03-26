import { Action, Dispatch } from 'redux';

import { db } from '../firebase';
import FluxAction from './FluxAction';
import { Channel } from '../models';
import config from '../config';
import Axios from 'axios';

interface ChannelModuleState {
  channels: Channel[];
}

class ChannelModule {
  // ===========================================================================
  //  action types
  // ===========================================================================
  actionType = {
    getAllChannels: 'GET_ALL_CHANNELS',
    createNewChannel: 'CREATE_NEW_CHANNEL',
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
    const promise: Promise<Channel[]> = new Promise((resolve, reject) => {
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

  createNewChannel = (channelId: string) => (dispatch: Dispatch<Action>) => {
    const promise: Promise<Channel> = new Promise((resolve, reject) => {
      db.collection('channels')
        .doc(channelId)
        .set({ channelId })
        .then(() => {
          const newChannel = Channel.createEmpty();
          newChannel.channelId = channelId;
          dispatch(FluxAction.createPlaneSuccess(
            this.actionType.createNewChannel,
            { channel: newChannel },
          ));
          resolve(newChannel);
        })
        .catch(err => reject(err));
    });
    return promise;
  }

  updateChannelData = (
    channel: Channel,
  ) => (
    dispatch: Dispatch<Action>,
  ) => {
    const promise: Promise<void> = new Promise(async (resolve, reject) => {
      const url = `${config.lambdaEndpoint}?id=${channel.channelId}`;
      const res = await Axios.get(url, { headers: { 'Content-Type': 'application/json' } });
      const clonedChannel = channel.clone();
      clonedChannel.channelName = res.data.body.channelTitle;
      clonedChannel.channelImage = res.data.body.image;
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.updateChannelData,
        { channel: clonedChannel },
      ));
      const channelRef = db.collection('channels').doc(channel.channelId);
      channelRef
        .update({
          channelName: clonedChannel.channelName,
          channelImage: clonedChannel.channelImage,
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
      case this.actionType.createNewChannel:
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

  return updatedChannels;
}

export default new ChannelModule;
