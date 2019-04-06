import * as React from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell, Checkbox, Button } from '@material-ui/core';
import styled from 'styled-components';

import { Channel } from '../../models';
import { uiModule } from '../../modules';

interface MyTableRowProps {
  channel: Channel;
  fetchChannelData: (channel: Channel) => Promise<void>;
  toggleModal: (channel: Channel) => Promise<void>;
  toggleLoading: () => Promise<void>;
}

interface MyTableRowState {
  isModalOpen: boolean;
}

class MyTableRow extends React.Component<MyTableRowProps, MyTableRowState> {
  static mapDispatchToProps = (dispatch: any) => ({
    toggleModal: (channel: Channel) => dispatch(uiModule.toggleChannelEditModal(channel)),
    toggleLoading: () => dispatch(uiModule.toggleLoading()),
  })

  handleClick = () => {
    this.props.toggleLoading();
    this.props.fetchChannelData(this.props.channel)
      .then(() => this.props.toggleLoading())
      .catch(() => this.props.toggleLoading());
  }

  handleModalButtonClick = () => {
    this.props.toggleModal(this.props.channel.clone());
  }

  render() {
    const { channel } = this.props;

    return (
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>{channel.number}</TableCell>
        <TableCell>
          <MyImg alt={channel.name} src={channel.image} />
        </TableCell>
        <TableCell>{channel.name}</TableCell>
        <TableCell>{channel.liverName}</TableCell>
        <TableCell>{channel.liverPhonetic}</TableCell>
        <TableCell>
          <Button variant="outlined" onClick={this.handleClick}>更新</Button>
        </TableCell>
        <TableCell>
          <Button variant="contained" onClick={this.handleModalButtonClick}>編集</Button>
        </TableCell>
      </TableRow>
    );
  }
}

interface MyImgProps {
  alt: string;
  src: string;
}

const MyImg = styled('img')<MyImgProps>`
  width: 50px;
  height: auto;
`;

export default connect(
  null,
  MyTableRow.mapDispatchToProps,
)(MyTableRow);
