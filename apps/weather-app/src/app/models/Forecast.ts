import Conditions from './Conditions';

interface WeatherForecast {
  currentConditions: Conditions;
  days: Conditions[];
  resolvedAddress: string;
}

export default WeatherForecast;
