import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Head from 'next/head';

import Header from './Header';
import { userModule } from '../modules';

interface IAppProps {
  auth: firebase.User;
  children?: React.ReactNode;
  fetchAuth: () => (dispatch: any) => Promise<{}>;
}

class App extends React.Component<IAppProps> {
  componentDidMount() {
    if (this.props.auth) { return; }
    this.props.fetchAuth();
  }

  render() {
    const { children } = this.props;

    return (
      <main>
        <Head>
          <title>channel name list</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <Header />
        {children}
      </main>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.user.auth,
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    { fetchAuth: userModule.fetchAuth },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
