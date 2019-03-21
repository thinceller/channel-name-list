import { connect } from 'react-redux';

import App from '../containers/App';
import { channelModule } from '../modules';
import { bindActionCreators } from 'redux';

const About = ({ getAllChannels }) => {
  const handleButtonClick = () => getAllChannels();
  return (
    <App>
      <p>About Page</p>
      <button onClick={handleButtonClick}>データ取得</button>
    </App>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    { getAllChannels: channelModule.getAllChannels },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(About);
