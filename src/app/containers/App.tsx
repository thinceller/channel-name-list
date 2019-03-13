import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Head from 'next/head';

import Header from '../components/Header';
import { fetchUser } from '../store/auth/actions';

interface IAppProps {
  user: firebase.UserInfo;
  children?: React.ReactNode;
  fetchUser: () => (dispatch: any) => Promise<{}>;
}

class App extends React.Component<IAppProps> {
  componentDidMount() {
    if (this.props.user) { return; }
    this.props.fetchUser();
  }

  render() {
    const { user, children } = this.props;

    return (
      <main>
        <Head>
          <title>channel name list</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <Header user={user} />
        {children}
      </main>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    { fetchUser },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
