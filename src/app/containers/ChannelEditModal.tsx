import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Input,
  DialogActions,
} from '@material-ui/core';
import { connect } from 'react-redux';

import { Channel } from '../models';
import { uiModule, channelModule } from '../modules';
import { ModalButton } from '../components';

type ChannelEditModalProps = {
  channel: Channel,
  isModalOpen: boolean,
  toggleModal: () => Promise<void>,
  updateEditingChannel: (channel: Channel) => Promise<void>,
  updateChannelData: () => Promise<void>,
};

class ChannelEditModal extends React.Component<ChannelEditModalProps> {
  static mapStateToProps = (state: any) => ({
    channel: state.channel.editingChannel,
    isModalOpen: state.ui.isChannelEditModalOpen,
  })

  static mapDispatchToProps = (dispatch: any) => ({
    toggleModal: () => dispatch(uiModule.toggleChannelEditModal(Channel.createEmpty())),
    updateEditingChannel: (channel: Channel) => {
      return dispatch(channelModule.updateEditingChannel(channel));
    },
    updateChannelData: () => dispatch(channelModule.updateChannelData()),
  })

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const clonedChannel = this.props.channel.clone();
    clonedChannel[name] = name === 'number' ? Number(value) : value;
    this.props.updateEditingChannel(clonedChannel);
  }

  handleSubmitClick = () => {
    this.props.updateChannelData()
      .then(() => this.props.toggleModal());
  }

  render() {
    const { channel, isModalOpen, toggleModal } = this.props;

    return (
      <Dialog open={isModalOpen} onClose={toggleModal}>
        <DialogTitle>チャンネル詳細編集</DialogTitle>
        <DialogContent>
          <FormControl>
            <InputLabel>番号</InputLabel>
            <Input
              name="number"
              type="number"
              value={channel.number}
              onChange={this.handleInputChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel>チャンネルID</InputLabel>
            <Input
              name="id"
              type="string"
              value={channel.id}
              onChange={this.handleInputChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <ModalButton
            onClick={toggleModal}
          >
            キャンセル
          </ModalButton>
          <ModalButton
            variant="contained"
            color="primary"
            onClick={this.handleSubmitClick}
          >
            更新
          </ModalButton>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  ChannelEditModal.mapStateToProps,
  ChannelEditModal.mapDispatchToProps,
)(ChannelEditModal);
