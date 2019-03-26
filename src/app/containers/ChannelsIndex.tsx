import * as React from 'react';
import { connect } from 'react-redux';
import {
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core';
import styled from 'styled-components';

import { Channel } from '../models';
import { channelModule } from '../modules';

interface ChannelsIndexProps {
  channels: Channel[];
  getAllChannels: () => Promise<Channel[]>;
  updateChannelData: (channel: Channel) => Promise<void>;
}

class ChannelsIndex extends React.Component<ChannelsIndexProps> {
  static mapStateToProps = (state: any) => ({
    channels: state.channel.channels,
  })

  static mapDispatchToProps = (dispatch: any) => ({
    getAllChannels: () => dispatch(channelModule.getAllChannels()),
    updateChannelData: (channel: Channel) => dispatch(channelModule.updateChannelData(channel)),
  })

  componentDidMount() {
    this.props.getAllChannels();
  }

  handleClick = () => {
    const promises = this.props.channels.map(channel => {
      return this.props.updateChannelData(channel);
    });
    Promise.all(promises);
  }

  render() {
    const { channels } = this.props;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell />
            <TableCell>チャンネル名</TableCell>
            <TableCell>チャンネルID</TableCell>
            <TableCell>
              <Button variant="outlined" onClick={this.handleClick}>一括更新</Button>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {channels.map(channel => {
            return (
              <MyTableRow
                key={channel.channelId}
                channel={channel}
                updateChannelData={this.props.updateChannelData}
              />
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

interface MyTableRowProps {
  channel: Channel;
  updateChannelData: (channel: Channel) => Promise<void>;
}

class MyTableRow extends React.Component<MyTableRowProps> {
  handleClick = () => {
    this.props.updateChannelData(this.props.channel);
  }
  render() {
    const { channel } = this.props;

    return (
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>
          <MyImg alt={channel.channelName} src={channel.channelImage} />
        </TableCell>
        <TableCell>{channel.channelName}</TableCell>
        <TableCell>{channel.channelId}</TableCell>
        <TableCell>
          <Button variant="outlined" onClick={this.handleClick}>更新</Button>
        </TableCell>
        <TableCell>
          <Button variant="contained">編集</Button>
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
  ChannelsIndex.mapStateToProps,
  ChannelsIndex.mapDispatchToProps,
)(ChannelsIndex);
