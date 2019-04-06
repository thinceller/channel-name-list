import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';

import { HeaderMenu } from '../components';
import { userModule } from '../modules';
import { User } from '../models';

interface IHeaderProps {
  auth: firebase.UserInfo;
  user: User;
  pathname?: any;
  logoutUser: () => (dispatch: any) => Promise<{}>;
}

class Header extends React.Component<IHeaderProps> {
  static mapStateToProps = (state: any) => ({
    auth: state.user.auth,
    user: state.user.user,
  })

  static mapDispatchToProps(dispatch: any) {
    return bindActionCreators(
      { logoutUser: userModule.logoutUser },
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

  render() {
    const { auth, user, pathname } = this.props;

    return (
      <header>
        <Link href="/">
          <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
        </Link>
        {(user && user.authority === 'admin') && (
          <Link href="/admin">
            <a className={pathname === '/admin' ? 'is-active' : ''}>管理画面</a>
          </Link>
        )}
        {user && (
          <Link href="/list">
            <a className={pathname === '/list' ? 'is-active' : ''}>チャンネルリスト</a>
          </Link>
        )}
        {auth ? <HeaderMenu logoutUser={this.props.logoutUser} /> : this.loginLink}
      </header>
    );
  }
}

export default connect(
  Header.mapStateToProps,
  Header.mapDispatchToProps,
)(Header);
