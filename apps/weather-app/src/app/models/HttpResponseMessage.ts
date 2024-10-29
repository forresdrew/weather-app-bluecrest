export interface IHttpResponseMessage {
  status: number;
  data?: any;
}

export class HttpResponseMessage implements IHttpResponseMessage {
  status!: number;
  data?: any;

  constructor(rawData: any) {
    Object.assign(this, rawData);
  }

  public static isSuccessStatusCode = (status: number): boolean => {
    return status >= 200 && status <= 299;
  };

  public throwIfNotSuccessful = (): void => {
    if (!HttpResponseMessage.isSuccessStatusCode(this.status)) {
      throw {
        status: this.status,
      };
    }
  };
}
