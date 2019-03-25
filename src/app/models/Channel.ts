export default class Channel {
  constructor(
    public channelId: string,
    public channelName: string,
    public channelImage: string,
  ) {}

  static createEmpty(): Channel {
    return new Channel(
      '',
      '',
      '',
    );
  }

  clone(): Channel {
    return new Channel(
      this.channelId,
      this.channelName,
      this.channelImage,
    );
  }
}
