import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Head from 'next/head';

import Header from './Header';
import { userModule } from '../modules';

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
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    { fetchUser: userModule.fetchUser },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
