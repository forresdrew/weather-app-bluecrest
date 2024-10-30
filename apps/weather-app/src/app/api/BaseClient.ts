import axios from 'axios';
import Secrets from '../config/Secrets';

// Base class for API calls which should be extended by sub-classes for access to base url and default query parameters.
// Allows for easy simple modification to API calls and default params if ever there should be multiple endpoints being accessed by subclasses.
class BaseClient {
  // Not open to modification so privatised. Have included getter functions for easy access.
  private _baseUrl;
  private _queryParameters;

  constructor() {
    // Ideally I would have liked all of these values to live inside environment variables or secrets at deployment
    this._baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services';

    this._queryParameters = {
      key: Secrets.apiKey,
      contentType: 'json',
    };
  }

  // Receive a config object which can be spread into an axios request. Return response or error response
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
