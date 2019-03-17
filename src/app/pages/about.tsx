import { connect } from 'react-redux';

import App from '../containers/App';
import { getAllChannels } from '../store';
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
    { getAllChannels },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(About);
