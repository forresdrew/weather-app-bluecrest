import axios from 'axios';
import Secrets from '../config/Secrets';

class BaseClient {
  private _baseUrl;
  private _queryParameters;

  constructor() {
    this._baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

    this._queryParameters = {
      key: Secrets.apiKey,
      contentType: 'json',
    };
  }

  public query = async ({ ...requestConfig }: any): Promise<any> => {
    let responseData;

    try {
      responseData = await axios.request({ ...requestConfig });
    } catch (error) {
      return error;
    }

    return responseData;
  };

  public get baseUrl() {
    return this._baseUrl;
  }

  public get queryParameters() {
    return this._queryParameters;
  }
}

export default BaseClient;
