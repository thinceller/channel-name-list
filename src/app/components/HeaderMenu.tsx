import * as React from 'react';
// import Link from 'next/link';
import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
} from '@material-ui/core';

interface HeaderMenuProps {
  logoutUser: () => (dispatch: any) => Promise<{}>;
}

class HeaderMenu extends React.Component<HeaderMenuProps> {
  state = {
    isMenuOpen: false,
    isModalOpen: false,
  };

  toggleMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

  render() {
    const { isMenuOpen, isModalOpen } = this.state;

    return (
      <>
        <Button onClick={this.toggleMenu}>メニュー</Button>
        <Menu id="account_menu" open={isMenuOpen} onClose={this.toggleMenu}>
          <MenuItem onClick={this.toggleMenu}>マイページ</MenuItem>
          <MenuItem onClick={this.toggleMenu}>設定</MenuItem>
          <MenuItem onClick={this.toggleModal}>ログアウト</MenuItem>
        </Menu>
        <Dialog open={isModalOpen} onClose={this.toggleModal}>
          <DialogTitle>ログアウトしますか？</DialogTitle>
          <Button onClick={this.toggleModal}>キャンセル</Button>
          <Button onClick={this.props.logoutUser}>はい</Button>
        </Dialog>
      </>
    );
  }
}

export default HeaderMenu;
