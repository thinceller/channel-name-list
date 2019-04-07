import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';

import { State, channelListModule } from '../../modules';
import ChannelSuggest from './ChannelSuggest';
import MyListTable from './MyListTable';

interface MyListProps {
  user: State['user']['user'];
  channelList: State['channelList'];
  createChannelList: () => Promise<void>;
  addChannelToList: () => Promise<void>;
}

class MyList extends React.Component<MyListProps> {
  static mapStateToProps = (state: State) => ({
    user: state.user.user,
    channelList: state.channelList,
  })

  static mapDispatchToProps = (dispatch: any) => ({
    createChannelList: () => dispatch(channelListModule.createChannelList()),
    addChannelToList: () => dispatch(channelListModule.addChannelToList()),
  })

  handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.addChannelToList();
  }

  get loginHelp() {
    return (
      <>
        <p>マイチャンネルリストを作成するにはログインしてください</p>
        <p>ログインは<Link href="/login"><a>こちら</a></Link></p>
      </>
    );
  }

  get listCreateButton() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={this.props.createChannelList}
      >
        リスト作成
      </Button>
    );
  }

  render() {
    const { user, channelList } = this.props;
    return (
      <>
        {
          !user
            ? this.loginHelp
            : (channelList && channelList.channelList)
              ? <>
                  <CopyButton
                    variant="contained"
                    color="primary"
                  >
                    リストをコピー
                  </CopyButton>
                  <form onSubmit={this.handleSuggestSubmit}>
                    <ChannelSuggest />
                    <AddButton
                      type="submit"
                      variant="outlined"
                      color="primary"
                    >
                      リストに追加
                    </AddButton>
                  </form>
                  <MyListTable />
                </>
              : this.listCreateButton
        }
      </>
    );
  }
}

const CopyButton = styled(Button)({
  marginBottom: 30,
});

const AddButton = styled(Button)({
  display: 'inline-block',
  height: 40,
});

export default connect(
  MyList.mapStateToProps,
  MyList.mapDispatchToProps,
)(MyList);
