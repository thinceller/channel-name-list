export default class Channel {
  constructor(
    public number: number,
    public id: string,
    public name: string,
    public image: string,
    public liverName: string,
    public liverPhonetic: string,
  ) {}

  static createEmpty(): Channel {
    return new Channel(
      0,
      '',
      '',
      '',
      '',
      '',
    );
  }

  clone(): Channel {
    return new Channel(
      this.number,
      this.id,
      this.name,
      this.image,
      this.liverName,
      this.liverPhonetic,
    );
  }
}
