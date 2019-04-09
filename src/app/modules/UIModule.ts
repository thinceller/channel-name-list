import { Action, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import FluxAction, { MyThunkDispatch } from './FluxAction';
import { Channel } from '../models';
import { channelModule, channelListModule, State } from '../modules';
import { resolve } from 'url';

export type UIModuleState = {
  isChannelEditModalOpen: boolean,
  isLoading: boolean,
  isAddAllChannelModal: boolean,
  isRemoveFromListModal: boolean,
};

class UIModule {
  actionType = {
    toggleChannelEditModal: 'TOGGLE_CHANNEL_EDIT_MODAL',
    toggleLoading: 'TOGGLE_LOADING',
    toggleAddAllChannelModal: 'TOGGLE_ADD_ALL_CHANNEL_MODAL',
    openRemoveFromListModal: 'OPEN_REMOVE_FROM_LIST_MODAL',
    closeRemoveFromListModal: 'CLOSE_REMOVE_FROM_LIST_MODAL',
  };

  state: UIModuleState = {
    isChannelEditModalOpen: false,
    isLoading: false,
    isAddAllChannelModal: false,
    isRemoveFromListModal: false,
  };

  toggleChannelEditModal = (
    channel: Channel | null,
  ) => (
    dispatch: ThunkDispatch<UIModuleState, undefined, Action>,
    getState: () => State,
  ) => {
    const promise = new Promise((resolve) => {
      const { isChannelEditModalOpen } = getState().ui;
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.toggleChannelEditModal,
        { isChannelEditModalOpen: !isChannelEditModalOpen },
      ));
      dispatch(channelModule.setEditingChannel(channel));
      resolve();
    });
    return promise;
  }

  toggleLoading = () => (
    dispatch: Dispatch<Action>,
    getState: () => State,
  ) => {
    const promise = new Promise((resolve) => {
      const { isLoading } = getState().ui;
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.toggleLoading,
        { isLoading: !isLoading },
      ));
      resolve();
    });
    return promise;
  }

  toggleAddAllChannelModal = () => (dispatch: MyThunkDispatch, getState: () => State) => {
    const promise = new Promise((resolve) => {
      const { isAddAllChannelModal } = getState().ui;
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.toggleAddAllChannelModal,
        { isAddAllChannelModal: !isAddAllChannelModal },
      ));
      resolve();
    });
    return promise;
  }

  openRemoveFromListModal = (channel: Channel) => (dispatch: MyThunkDispatch) => {
    const promise = new Promise((resolve) => {
      dispatch(channelListModule.setRemovingChannel(channel));
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.openRemoveFromListModal,
        { isRemoveFromListModal: true },
      ));
      resolve();
    });
    return promise;
  }

  closeRemoveFromListModal = () => (dispatch: MyThunkDispatch) => {
    const promise = new Promise((resolve) => {
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.closeRemoveFromListModal,
        { isRemoveFromListModal: false },
      ));
      dispatch(channelListModule.setRemovingChannel(Channel.createEmpty()));
      resolve();
    });
    return promise;
  }

  reducer = (state: UIModuleState = this.state, action: FluxAction): UIModuleState => {
    switch (action.type) {
      case this.actionType.toggleChannelEditModal:
      case this.actionType.toggleLoading:
      case this.actionType.toggleAddAllChannelModal:
      case this.actionType.openRemoveFromListModal:
      case this.actionType.closeRemoveFromListModal:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
  }
}

export default new UIModule();
