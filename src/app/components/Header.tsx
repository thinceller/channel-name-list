import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import {
  Button,
  Menu,
  MenuItem,
  Modal,
} from '@material-ui/core';

import { logoutUser } from '../store/auth/actions';

interface IHeaderProps {
  user: firebase.UserInfo;
  pathname?: any;
  logoutUser: () => (dispatch: any) => Promise<{}>;
}

class Header extends React.Component<IHeaderProps> {
  static mapDispatchToProps(dispatch: any) {
    return bindActionCreators(
      { logoutUser },
      dispatch,
    );
  }

  state = {
    isMenuOpen: false,
    isModalOpen: false,
  };

  toggleMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

  handleLogoutClick = () => {
    this.props.logoutUser();
    this.toggleModal();
  }

  get loginLink() {
    const { pathname } = this.props;
    return (
      <>
        <Link href="/login">
          <a className={pathname === '/login' ? 'is-active' : ''}>ログイン</a>
        </Link>
        <Link href="/signup">
          <a className={pathname === '/signup' ? 'is-active' : ''}>新規登録</a>
        </Link>
      </>
    );
  }

  get mypageLink() {
    return (
      <>
        <Button
          onClick={this.toggleMenu}
        >
          メニュー
        </Button>
        <Menu id="account_menu" open={this.state.isMenuOpen} onClose={this.toggleMenu}>
          <MenuItem onClick={this.toggleMenu}>マイページ</MenuItem>
          <MenuItem onClick={this.toggleMenu}>設定</MenuItem>
          <MenuItem onClick={this.toggleModal}>ログアウト</MenuItem>
        </Menu>
      </>
    );
  }

  render() {
    const { user, pathname } = this.props;
    const { isModalOpen } = this.state;

    return (
      <header>
        <Link href="/">
          <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
        </Link>
        <Link href="/about">
          <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
        </Link>
        {/* TODO: 管理画面へのリンク */}
        {user ? this.mypageLink : this.loginLink}
        <Modal open={isModalOpen} onClose={this.toggleModal}>
          <div>
            <h3>ログアウトしますか？</h3>
            <Button onClick={this.toggleModal}>キャンセル</Button>
            <Button onClick={this.handleLogoutClick}>はい</Button>
          </div>
        </Modal>
      </header>
    );
  }
}

export default connect(
  null,
  Header.mapDispatchToProps,
)(Header);
