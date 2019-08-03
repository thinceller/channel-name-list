import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import Head from 'next/head';

import Header from './Header';
import { userModule, State } from '../modules';
import { Loading } from '../components';

interface IAppProps {
  auth: firebase.User | null;
  isLoading: boolean;
  children?: React.ReactNode;
  fetchAuth: () => any;
}

class App extends React.Component<IAppProps> {
  componentDidMount() {
    if (this.props.auth) { return; }
    this.props.fetchAuth();
  }

  render() {
    const { children, isLoading } = this.props;

    return (
      <main>
        <Head>
          <title>channel name list</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="../static/react-notifications.css"
          />
          <link href="../static/theme.css" rel="stylesheet" />
        </Head>
        <Loading isLoading={isLoading} />
        <Header />
        {children}
        <NotificationContainer />
      </main>
    );
  }
}

const mapStateToProps = (state: State) => ({
  auth: state.user.auth,
  isLoading: state.ui.isLoading,
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
