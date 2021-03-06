import Axios from 'axios';
import { Action, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { db } from '../firebase';
import FluxAction, { MyThunkDispatch } from './FluxAction';
import { Channel } from '../models';
import config from '../config';
import { State, uiModule } from '../modules';

export type ChannelModuleState = {
  channels: Channel[],
  editingChannel: Channel,
};

class ChannelModule {
  // ===========================================================================
  //  action types
  // ===========================================================================
  actionType = {
    getAllChannels: 'GET_ALL_CHANNELS',
    createNewChannel: 'CREATE_NEW_CHANNEL',
    fetchChannelData: 'UPDATE_CHANNEL_DATA',
    updateChannelData: 'UPDATE_CHANNEL_DATA',
    setEditingChannel: 'SET_EDITING_CHANNEL',
    updateEditingChannel: 'UPDATE_EDITING_CHANNEL',
  };

  // ===========================================================================
  //  initial state
  // ===========================================================================
  state: ChannelModuleState = {
    channels: [],
    editingChannel: Channel.createEmpty(),
  };

  // ===========================================================================
  //  action creators
  // ===========================================================================
  getAllChannels = () => (dispatch: Dispatch<Action>, getState: () => State) => {
    const promise: Promise<Channel[]> = new Promise((resolve, reject) => {
      if (getState().channel.channels.length !== 0) { resolve(); }

      db.collection('channels')
        .get()
        .then(res => {
          let channels: Channel[] = [];

          res.forEach(doc => {
            const document = doc.data();
            const channel = Channel.createEmpty();
            channel.id = document.id;
            channel.number = document.number | 0;
            channel.image = document.image || '';
            channel.name = document.name || '';
            channel.liverName = document.liverName || '';
            channel.liverPhonetic = document.liverPhonetic || '';
            channels = channels.concat(channel);
          });

          // .orderByでソートするとnumberが0のドキュメントを除外して取得してしまうので
          // JSで直接ソートアルゴリズムを挟んでる
          channels.sort((a, b) => a.number - b.number);

          dispatch(FluxAction.createPlaneSuccess(
            this.actionType.getAllChannels,
            { channels },
          ));
          resolve(channels);
        })
        .catch(err => reject(err));
    });
    return promise;
  }

  createNewChannel = (id: string) => (dispatch: MyThunkDispatch) => {
    dispatch(uiModule.toggleLoading());
    const promise: Promise<Channel> = new Promise((resolve, reject) => {
      db.collection('channels')
        .doc(id)
        .set({ id })
        .then(() => {
          const newChannel = Channel.createEmpty();
          newChannel.id = id;
          dispatch(FluxAction.createPlaneSuccess(
            this.actionType.createNewChannel,
            { channel: newChannel },
          ));
          dispatch(uiModule.toggleLoading());
          resolve(newChannel);
        })
        .catch(err => {
          dispatch(uiModule.toggleLoading());
          reject(err);
        });
    });
    return promise;
  }

  fetchChannelData = (
    channel: Channel,
  ) => (
    dispatch: MyThunkDispatch,
  ) => {
    const promise: Promise<void> = new Promise(async (resolve, reject) => {
      const url = `${config.lambdaEndpoint}?id=${channel.id}`;
      const res = await Axios.get(url, { headers: { 'Content-Type': 'application/json' } });
      const clonedChannel = channel.clone();
      clonedChannel.name = res.data.body.channelTitle;
      clonedChannel.image = res.data.body.image;
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.fetchChannelData,
        { channel: clonedChannel },
      ));
      const channelRef = db.collection('channels').doc(channel.id);
      channelRef
        .update({
          name: clonedChannel.name,
          image: clonedChannel.image,
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

  updateChannelData = () => (
    dispatch: ThunkDispatch<State, undefined, Action>,
    getState: () => State,
  ) => {
    dispatch(uiModule.toggleLoading());
    const promise = new Promise((resolve, reject) => {
      const channel = getState().channel.editingChannel;
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.updateChannelData,
        { channel },
      ));

      const channelRef = db.collection('channels').doc(channel.id);
      channelRef
        .update({
          id: channel.id,
          number: channel.number,
          liverName: channel.liverName,
          liverPhonetic: channel.liverPhonetic,
        })
        .then(() => {
          dispatch(uiModule.toggleLoading());
          resolve();
        })
        .catch(err => {
          console.error(err);
          dispatch(uiModule.toggleLoading());
          reject(err);
        });
    });
    return promise;
  }

  setEditingChannel = (
    channel: Channel | null,
  ) => (
    dispatch: Dispatch<Action>,
  ) => {
    const promise = new Promise((resolve) => {
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.setEditingChannel,
        { editingChannel: channel },
      ));
      resolve();
    });
    return promise;
  }

  updateEditingChannel = (channel: Channel) => (dispatch: Dispatch<Action>) => {
    const promise = new Promise((resolve) => {
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.updateEditingChannel,
        { editingChannel: channel },
      ));
      resolve();
    });
    return promise;
  }

  // ===========================================================================
  //  reducer
  // ===========================================================================
  reducer = (state: ChannelModuleState = this.state, action: FluxAction): ChannelModuleState => {
    switch (action.type) {
      case this.actionType.getAllChannels:
      case this.actionType.setEditingChannel:
      case this.actionType.updateEditingChannel:
        return Object.assign({}, state, action.payload);
      case this.actionType.createNewChannel:
      case this.actionType.fetchChannelData:
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
  const updatedChannels = stateChannels.slice();
  const updatedChannelIndex = updatedChannels.findIndex(channel => {
    return channel.id === updatedChannel.id;
  });

  if (updatedChannelIndex > -1) {
    updatedChannels.splice(updatedChannelIndex, 1, updatedChannel);
  } else {
    updatedChannels.push(updatedChannel);
  }

  return updatedChannels;
}

export default new ChannelModule();
