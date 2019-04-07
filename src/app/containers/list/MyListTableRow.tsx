import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableRow,
  TableCell,
} from '@material-ui/core';

import { Channel } from '../../models';
import { channelListModule, uiModule, State } from '../../modules';
import { ModalButton } from '../../components';
import { MyImg } from '../admin/ChannelTableRow';

type MyListTableRowProps = {
  channel: Channel,
  isRemoveFromListModal: boolean,
  toggleRemoveFromListModal: () => Promise<void>,
  removeChannelFromList: (channel: Channel) => Promise<void>,
};

class MyListTableRow extends React.Component<MyListTableRowProps> {
  static mapStateToProps = (state: State) => ({
    isRemoveFromListModal: state.ui.isRemoveFromListModal,
  })

  static mapDispatchToProps = (dispatch: any) => ({
    toggleRemoveFromListModal: () => dispatch(uiModule.toggleRemoveFromListModal()),
    removeChannelFromList: (channel: Channel) => {
      return dispatch(channelListModule.removeChannelFromList(channel));
    },
  })

  componentShouldupdate() {
    return true;
  }

  handleRemoveButtonClick = () => {
    this.props.removeChannelFromList(this.props.channel)
      .then(() => this.props.toggleRemoveFromListModal());
  }

  render() {
    const { channel, isRemoveFromListModal, toggleRemoveFromListModal } = this.props;

    return (
      <>
        <TableRow>
          <TableCell>
            <MyImg alt={channel.name} src={channel.image} />
          </TableCell>
          <TableCell>{channel.name}</TableCell>
          <TableCell>{channel.liverName}</TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="secondary"
              onClick={toggleRemoveFromListModal}
            >
              リストから削除
            </Button>
          </TableCell>
        </TableRow>
        <Dialog open={isRemoveFromListModal} onClose={toggleRemoveFromListModal}>
          <DialogTitle>このチャンネルをリストから削除しますか？</DialogTitle>
          <DialogContent>{channel.name}</DialogContent>
          <DialogActions>
            <ModalButton
              onClick={toggleRemoveFromListModal}
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
      </>
    );
  }
}

export default connect(
  MyListTableRow.mapStateToProps,
  MyListTableRow.mapDispatchToProps,
)(MyListTableRow);
