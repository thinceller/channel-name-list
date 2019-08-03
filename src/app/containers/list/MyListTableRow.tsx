import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  TableRow,
  TableCell,
} from '@material-ui/core';

import { Channel } from '../../models';
import { uiModule } from '../../modules';
import { MyImg } from '../admin/ChannelTableRow';

type MyListTableRowProps = {
  channel: Channel,
  openRemoveFromListModal: (channel: Channel) => Promise<void>,
};

class MyListTableRow extends React.Component<MyListTableRowProps> {
  static mapDispatchToProps = (dispatch: any) => ({
    openRemoveFromListModal: (channel: Channel) => {
      return dispatch(uiModule.openRemoveFromListModal(channel));
    },
  })

  handleButtonClick = () => this.props.openRemoveFromListModal(this.props.channel);

  render() {
    const { channel } = this.props;

    return (
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
            onClick={this.handleButtonClick}
          >
            リストから削除
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default connect(
  null,
  MyListTableRow.mapDispatchToProps,
)(MyListTableRow);
