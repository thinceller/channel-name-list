import * as React from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';

import { State, channelListModule, uiModule } from '../../modules';
import { ModalButton } from '../../components';

type AddAllChannelModalProps = {
  isAddAllChannelModal: boolean,
  toggleAddAllChannelModal: () => Promise<void>,
  addAllChannelsToList: () => Promise<void>,
};

class AddAllChannelModal extends React.Component<AddAllChannelModalProps> {
  static mapStateToProps = (state: State) => ({
    isAddAllChannelModal: state.ui.isAddAllChannelModal,
  })

  static mapDispatchToProps = (dispatch: any) => ({
    toggleAddAllChannelModal: () => dispatch(uiModule.toggleAddAllChannelModal()),
    addAllChannelsToList: () => dispatch(channelListModule.addAllChannelsToList()),
  })

  handleButtonClick = () => {
    this.props.addAllChannelsToList()
      .then(() => this.props.toggleAddAllChannelModal());
  }

  render() {
    const { isAddAllChannelModal, toggleAddAllChannelModal } = this.props;
    return(
      <Dialog open={isAddAllChannelModal} onClose={toggleAddAllChannelModal}>
        <DialogTitle>全チャンネルをリストに追加しますか？</DialogTitle>
        <DialogActions>
          <ModalButton
            onClick={toggleAddAllChannelModal}
          >
            キャンセル
          </ModalButton>
          <ModalButton
            variant="contained"
            color="primary"
            onClick={this.handleButtonClick}
          >
            追加
          </ModalButton>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  AddAllChannelModal.mapStateToProps,
  AddAllChannelModal.mapDispatchToProps,
)(AddAllChannelModal);
