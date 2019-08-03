import * as React from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';

import { ModalButton } from '../../components';
import { channelListModule, State, uiModule } from '../../modules';
import { Channel } from '../../models';

type RemoveFromListModalProps = {
  isRemoveFromListModal: boolean,
  removingChannel: Channel,
  closeRemoveFromListModal: () => Promise<void>,
  removeChannelFromList: () => Promise<void>,
};

class RemoveFromListModal extends React.Component<RemoveFromListModalProps> {
  static mapStateToProps = (state: State) => ({
    isRemoveFromListModal: state.ui.isRemoveFromListModal,
    removingChannel: state.channelList.removingChannel,
  })

  static mapDispatchToProps = (dispatch: any) => ({
    closeRemoveFromListModal: () => dispatch(uiModule.closeRemoveFromListModal()),
    removeChannelFromList: () => dispatch(channelListModule.removeChannelFromList()),
  })

  handleRemoveButtonClick = () => {
    this.props.removeChannelFromList()
      .then(() => this.props.closeRemoveFromListModal());
  }

  render() {
    const { isRemoveFromListModal, removingChannel, closeRemoveFromListModal } = this.props;

    return (
      <Dialog
        open={isRemoveFromListModal}
        onClose={closeRemoveFromListModal}
      >
        <DialogTitle>このチャンネルをリストから削除しますか？</DialogTitle>
        <DialogContent>{removingChannel.name}</DialogContent>
        <DialogActions>
          <ModalButton
            onClick={closeRemoveFromListModal}
          >
            キャンセル
          </ModalButton>
          <ModalButton
            variant="contained"
            color="secondary"
            onClick={this.handleRemoveButtonClick}
          >
            削除
          </ModalButton>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  RemoveFromListModal.mapStateToProps,
  RemoveFromListModal.mapDispatchToProps,
)(RemoveFromListModal);
