import TemperatureUnit from '../enums/TemperatureUnit';
import { IHttpResponseMessage } from '../models/HttpResponseMessage';
import BaseClient from './BaseClient';

// Weather client which will handle calls to the weather API
// Extends BaseClient for access to default field values.
// Ideally multiple classes would look as below - extending the BaseClient with one class per "endpoint"
class TimelineClient extends BaseClient {
  // Receive a location, temperature unit and number of days to display which can be plugged into API call. Await response.
  getWeatherByLocation = async (
    location: string,
    unit: TemperatureUnit,
    numDays: number
  ): Promise<IHttpResponseMessage> => {
    return await this.query({
      method: 'GET',
      url: `${this.baseUrl}/timeline/${location}/next${numDays}days`,
      params: { ...this.queryParameters, unitGroup: unit },
    });
  };
}

export default TimelineClient;
