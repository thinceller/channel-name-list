import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import { default as axios } from 'axios';

import { Channel } from '../models';
import { channelModule } from '../modules';
import config from '../config';

interface ChannelsIndexProps {
  channels: Channel[];
  getAllChannels: typeof channelModule.getAllChannels;
  updateChannelData: typeof channelModule.updateChannelData;
}

class ChannelsIndex extends React.Component<ChannelsIndexProps> {
  static mapStateToProps = (state: any) => ({
    channels: state.channel.channels,
  })

  static mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
      {
        getAllChannels: channelModule.getAllChannels,
        updateChannelData: channelModule.updateChannelData,
      },
      dispatch,
    );
  }

  componentDidMount() {
    this.props.getAllChannels();
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
            <TableCell />
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
  updateChannelData: typeof channelModule.updateChannelData;
}

class MyTableRow extends React.Component<MyTableRowProps> {
  handleClick = () => {
    const defaultUrl = config.lambdaEndpoint;
    const url = `${defaultUrl}?id=${this.props.channel.channelId}`;
    axios
      .get(url, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        const clonedChannel = this.props.channel.clone();
        clonedChannel.channelName = res.data.body.channelTitle;
        clonedChannel.channelImage = res.data.body.image;
        this.props.updateChannelData(clonedChannel);
      });
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
