import { db } from '../firebase';
import FluxAction, { MyThunkDispatch } from './FluxAction';
import { State } from '../modules';
import { Channel } from '../models';

export type ChannelListModuleState = {
  channelList: string[] | null,
  suggestingChannel: string,
};

class ChannelListModule {
  actionType = {
    setChannelList: 'SET_CHANNEL_LIST',
    handleSuggestingChange: 'HANDLE_SUGGESTING_CHANGE',
    addChannelToList: 'ADD_CHANNEL_TO_LIST',
    removeChannelFromList: 'REMOVE_CHANNEL_FROM_LIST',
  };

  state: ChannelListModuleState = {
    channelList: null,
    suggestingChannel: '',
  };

  setChannelList = (channelList: any) => (dispatch: MyThunkDispatch) => {
    const promise = new Promise((resolve) => {
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.setChannelList,
        { channelList },
      ));
      resolve();
    });
    return promise;
  }

  createChannelList = () => (dispatch: MyThunkDispatch, getState: () => State) => {
    const promise = new Promise((resolve, reject) => {
      const { user } = getState().user;
      if (!user) {
        reject();
      } else {
        const userRef = db.collection('users').doc(user.uid);
        userRef
          .set({ channelList: [] }, { merge: true })
          .then(() => {
            dispatch(this.setChannelList([]));
            resolve();
          })
          .catch(err => reject(err));
      }
    });
    return promise;
  }

  handleSuggestingChange = (liverName: string) => (dispatch: MyThunkDispatch) => {
    const promise = new Promise((resolve) => {
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.handleSuggestingChange,
        { suggestingChannel: liverName },
      ));
      resolve();
    });
    return promise;
  }

  addChannelToList = () => (dispatch: MyThunkDispatch, getState: () => State) => {
    const promise = new Promise((resolve, reject) => {
      const { channels } = getState().channel;
      const liverName = getState().channelList.suggestingChannel || '';
      const selectedChannel = channels.find(channel => channel.liverName === liverName);

      if (!selectedChannel) {
        reject({ message: 'not selected' });
      } else {
        const { user } = getState().user;
        let { channelList } = getState().channelList;
        if (user === null) {
          // ログインしていないと無効
          reject({ message: 'user is null' });
        } else if (!channelList) {
          // リスト作成ボタンが押してあること前提なので
          reject({ message: 'no channel list' });
        } else {
          const userRef = db.collection('users').doc(user.uid);
          // コピー
          channelList = channelList.slice();
          channelList.push(selectedChannel.id);
          userRef
            .update({ channelList })
            .then(() => {
              dispatch(FluxAction.createPlaneSuccess(
                this.actionType.addChannelToList,
                { channelList },
              ));
              dispatch(this.handleSuggestingChange(''));
              resolve();
            })
            .catch(err => reject(err));
        }
      }
    });
    return promise;
  }

  removeChannelFromList = (
    channel: Channel,
  ) => (
    dispatch: MyThunkDispatch,
    getState: () => State,
  ) => {
    const promise = new Promise((resolve, reject) => {
      let oldList = getState().channelList.channelList;
      if (oldList === null) {
        oldList = [];
      } else {
        oldList = oldList.slice();
      }
      const newChannelList = oldList.filter(channelId => channelId !== channel.id);

      const { user } = getState().user;
      if (!user) {
        reject({ message: 'user is null' });
      } else {
        const userRef = db.collection('users').doc(user.uid);
        userRef.update({ channelList: newChannelList })
          .then(() => {
            dispatch(FluxAction.createPlaneSuccess(
              this.actionType.removeChannelFromList,
              { channelList: newChannelList },
            ));
            resolve();
          })
          .catch(err => reject(err));
      }
    });
    return promise;
  }

  reducer = (
    state: ChannelListModuleState = this.state,
    action: FluxAction,
  ): ChannelListModuleState => {
    switch (action.type) {
      case this.actionType.setChannelList:
      case this.actionType.handleSuggestingChange:
      case this.actionType.addChannelToList:
      case this.actionType.removeChannelFromList:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
  }
}

export default new ChannelListModule();
