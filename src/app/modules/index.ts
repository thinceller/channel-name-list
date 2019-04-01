import { ChannelModuleState } from './ChannelModule';
import { UserModuleState } from './UserModule';
import { UiModuleState } from './UiModule';

export { default as channelModule } from './ChannelModule';
export { default as FluxAction } from './FluxAction';
export { default as uiModule } from './UiModule';
export { default as userModule } from './UserModule';
export type State = {
  channel: ChannelModuleState,
  user: UserModuleState,
  ui: UiModuleState,
};
