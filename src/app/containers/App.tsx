import { connect } from 'react-redux';

import Header from '../components/Header';

interface IAppProps {
  user: firebase.UserInfo;
  children?: React.ReactNode;
}

const App: React.FC<IAppProps> = ({ user, children }) => (
  <main>
    <Header user={user} />
    {children}
  </main>
);

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
)(App);
