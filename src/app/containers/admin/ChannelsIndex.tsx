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

import { Channel } from '../../models';
import { channelModule, uiModule } from '../../modules';
import ChannelTableRow from './ChannelTableRow';

interface ChannelsIndexProps {
  channels: Channel[];
  getAllChannels: () => Promise<Channel[]>;
  fetchChannelData: (channel: Channel) => Promise<void>;
  toggleLoading: () => Promise<void>;
}

class ChannelsIndex extends React.Component<ChannelsIndexProps> {
  static mapStateToProps = (state: any) => ({
    channels: state.channel.channels,
  })

  static mapDispatchToProps = (dispatch: any) => ({
    getAllChannels: () => dispatch(channelModule.getAllChannels()),
    fetchChannelData: (channel: Channel) => dispatch(channelModule.fetchChannelData(channel)),
    toggleLoading: () => dispatch(uiModule.toggleLoading()),
  })

  componentDidMount() {
    this.props.getAllChannels();
  }

  handleBuldClick = () => {
    this.props.toggleLoading();
    const promises = this.props.channels.map(channel => {
      return this.props.fetchChannelData(channel);
    });
    Promise.all(promises)
      .then(() => this.props.toggleLoading())
      .catch(() => this.props.toggleLoading());
  }

  render() {
    const { channels } = this.props;

    return (
      <Table style={{ border: '1px solid #aaa' }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>番号</TableCell>
            <TableCell />
            <TableCell>チャンネル名</TableCell>
            <TableCell>ライバー名</TableCell>
            <TableCell>ふりがな</TableCell>
            <TableCell>
              <Button variant="outlined" onClick={this.handleBuldClick}>一括更新</Button>
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
