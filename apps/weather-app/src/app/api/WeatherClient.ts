import Unit from '../enums/Unit';
import { IHttpResponseMessage } from '../models/HttpResponseMessage';
import BaseClient from './BaseClient';

class WeatherClient extends BaseClient {
  getWeatherByLocation = async (location: string, unit: Unit): Promise<IHttpResponseMessage> => {
    return await this.query({
      method: 'GET',
      url: `${this.baseUrl}/${location}`,
      params: { ...this.queryParameters, unitGroup: unit },
    });
  };
}

export default WeatherClient;
