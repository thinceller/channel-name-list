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

import { Channel } from '../models';
import { channelModule } from '../modules';
import ChannelTableRow from './ChannelTableRow';

interface ChannelsIndexProps {
  channels: Channel[];
  getAllChannels: () => Promise<Channel[]>;
  fetchChannelData: (channel: Channel) => Promise<void>;
}

class ChannelsIndex extends React.Component<ChannelsIndexProps> {
  static mapStateToProps = (state: any) => ({
    channels: state.channel.channels,
  })

  static mapDispatchToProps = (dispatch: any) => ({
    getAllChannels: () => dispatch(channelModule.getAllChannels()),
    fetchChannelData: (channel: Channel) => dispatch(channelModule.fetchChannelData(channel)),
  })

  componentDidMount() {
    this.props.getAllChannels();
  }

  handleClick = () => {
    const promises = this.props.channels.map(channel => {
      return this.props.fetchChannelData(channel);
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
            <TableCell>番号</TableCell>
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
              <ChannelTableRow
                key={channel.id}
                channel={channel}
                fetchChannelData={this.props.fetchChannelData}
              />
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default connect(
  ChannelsIndex.mapStateToProps,
  ChannelsIndex.mapDispatchToProps,
)(ChannelsIndex);
