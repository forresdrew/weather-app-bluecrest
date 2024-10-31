// Interface for raw API results
export interface IHttpResponseMessage {
  status: number;
  data?: any;
}

export class HttpResponseMessage implements IHttpResponseMessage {
  status!: number;
  data?: unknown;

  // Can construct with API response to access throwIfNotSuccessful function
  constructor(rawData: IHttpResponseMessage) {
    Object.assign(this, rawData);
  }

  private static isSuccessStatusCode = (status: number): boolean => {
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
