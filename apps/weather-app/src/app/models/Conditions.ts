interface Conditions {
  cloudcover: number;
  conditions: string;
  datetime: string;
  humidity: number;
  icon: string;
  sunrise: string;
  sunset: string;
  temp: number;
  tempmax?: number;
  tempmin?: number;
}

export default Conditions;
