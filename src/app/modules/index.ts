import { ChannelModuleState } from './ChannelModule';
import { ChannelListModuleState } from './ChannelListModule';
import { UserModuleState } from './UserModule';
import { UIModuleState } from './UIModule';

export { default as channelModule } from './ChannelModule';
export { default as channelListModule } from './ChannelListModule';
export { default as FluxAction } from './FluxAction';
export { default as uiModule } from './UIModule';
export { default as userModule } from './UserModule';
export type State = {
  channel: ChannelModuleState,
  channelList: ChannelListModuleState,
  user: UserModuleState,
  ui: UIModuleState,
};
