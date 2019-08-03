import {
  App,
  ChannelsIndex,
  ChannelEditModal,
  NewChannelButton,
} from '../containers';

const About = () => (
    <App>
      <h2>管理画面</h2>
      <NewChannelButton />
      <ChannelsIndex />
      <ChannelEditModal />
    </App>
);

export default About;
