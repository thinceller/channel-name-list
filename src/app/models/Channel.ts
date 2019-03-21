export default class Channel {
  constructor(
    public channelId: string,
    public channelName: string,
  ) {}

  static createEmpty(): Channel {
    return new Channel(
      '',
      '',
    );
  }
}
