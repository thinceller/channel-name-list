import {
  App,
  ChannelsIndex,
  NewChannelButton,
} from '../containers';

const About = () => (
    <App>
      <h2>管理画面</h2>
      <NewChannelButton />
      <ChannelsIndex />
    </App>
);

export default About;
