import { Action, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import FluxAction from './FluxAction';
import { Channel } from '../models';
import { channelModule, State } from '../modules';

export type UIModuleState = {
  isChannelEditModalOpen: boolean,
  isLoading: boolean,
};

class UIModule {
  actionType = {
    toggleChannelEditModal: 'TOGGLE_CHANNEL_EDIT_MODAL',
    toggleLoading: 'TOGGLE_LOADING',
  };

  state: UIModuleState = {
    isChannelEditModalOpen: false,
    isLoading: false,
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

  reducer = (state: UIModuleState = this.state, action: FluxAction): UIModuleState => {
    switch (action.type) {
      case this.actionType.toggleChannelEditModal:
      case this.actionType.toggleLoading:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
  }
}

export default new UIModule();
