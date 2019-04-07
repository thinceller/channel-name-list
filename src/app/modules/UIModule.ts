import { Action, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import FluxAction, { MyThunkDispatch } from './FluxAction';
import { Channel } from '../models';
import { channelModule, State } from '../modules';

export type UIModuleState = {
  isChannelEditModalOpen: boolean,
  isLoading: boolean,
  isRemoveFromListModal: boolean,
};

class UIModule {
  actionType = {
    toggleChannelEditModal: 'TOGGLE_CHANNEL_EDIT_MODAL',
    toggleLoading: 'TOGGLE_LOADING',
    toggleRemoveFromListModal: 'TOGGLE_REMOVE_FROM_LIST_MODAL',
  };

  state: UIModuleState = {
    isChannelEditModalOpen: false,
    isLoading: false,
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

  toggleRemoveFromListModal = () => (dispatch: MyThunkDispatch, getState: () => State) => {
    const promise = new Promise((resolve) => {
      const { isRemoveFromListModal } = getState().ui;
      dispatch(FluxAction.createPlaneSuccess(
        this.actionType.toggleRemoveFromListModal,
        { isRemoveFromListModal: !isRemoveFromListModal },
      ));
      resolve();
    });
    return promise;
  }

  reducer = (state: UIModuleState = this.state, action: FluxAction): UIModuleState => {
    switch (action.type) {
      case this.actionType.toggleChannelEditModal:
      case this.actionType.toggleLoading:
      case this.actionType.toggleRemoveFromListModal:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
  }
}

export default new UIModule();
