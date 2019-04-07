import * as React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';

import { State } from '../../modules';
import MyListTableRow from './MyListTableRow';

type MyListTableProps = {
  channels: State['channel']['channels'],
  channelList: State['channelList']['channelList'],
};

const MyListTable: React.FC<MyListTableProps> = ({ channels, channelList }) => {
  return (
    <Table style={{ border: '1px solid #aaa' }}>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>チャンネル名</TableCell>
          <TableCell>ライバー名</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {channelList && channelList.map(channelId => {
          const channel = channels.find(channel => channel.id === channelId);
          return channel && (
            <MyListTableRow key={channel.id} channel={channel} />
          );
        })}
      </TableBody>
    </Table>
  );
};

const mapStateToProps = (state: State) => ({
  channels: state.channel.channels,
  channelList: state.channelList.channelList,
});

export default connect(
  mapStateToProps,
)(MyListTable);
