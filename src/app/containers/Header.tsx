import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';

import { HeaderMenu } from '../components';
import { userModule } from '../modules';

interface IHeaderProps {
  user: firebase.UserInfo;
  pathname?: any;
  logoutUser: () => (dispatch: any) => Promise<{}>;
}

class Header extends React.Component<IHeaderProps> {
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
    const { user, pathname } = this.props;

    return (
      <header>
        <Link href="/">
          <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
        </Link>
        <Link href="/admin">
          <a className={pathname === '/admin' ? 'is-active' : ''}>管理画面</a>
        </Link>
        {user ? <HeaderMenu logoutUser={this.props.logoutUser} /> : this.loginLink}
      </header>
    );
  }
}

export default connect(
  null,
  Header.mapDispatchToProps,
)(Header);
