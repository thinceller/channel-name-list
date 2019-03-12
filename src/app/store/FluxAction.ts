export default class FluxAction {
  constructor(
    public type: string,
    public payload: any,
    public meta: any,
    public error: any,
  ) { }

  get plane(): any {
    return {
      type: this.type,
      payload: this.payload,
      meta: this.meta,
      error: this.error,
    };
  }

  static createPlaneSuccess(type: string, payload: any) {
    return new FluxAction(type, payload, {}, false).plane;
  }

  static createPlaneError(type: string, error: any) {
    return new FluxAction(type, {}, {}, error);
  }
}
