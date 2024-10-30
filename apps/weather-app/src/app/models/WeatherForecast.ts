import Conditions from './Conditions';

// Interface which matches API object
interface WeatherForecast {
  currentConditions: Conditions;
  days: Conditions[];
  resolvedAddress: string;
}

export default WeatherForecast;
