import * as React from 'react';
// import Link from 'next/link';
import {
  Button,
  Menu,
  MenuItem,
  Modal,
} from '@material-ui/core';

import MyModal from './Modal';

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
        <Modal open={isModalOpen} onClose={this.toggleModal}>
          <MyModal>
            <h3>ログアウトしますか？</h3>
            <Button onClick={this.toggleModal}>キャンセル</Button>
            <Button onClick={this.props.logoutUser}>はい</Button>
          </MyModal>
        </Modal>
      </>
    );
  }
}

export default HeaderMenu;
