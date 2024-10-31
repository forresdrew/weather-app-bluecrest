// Enum to store metrics for API call
enum TemperatureUnit {
  Celcius = 'metric',
  Fahrenheit = 'us',
}

// Extendable switch case function for unit symbols in case we want to add more in future
export const getTemperatureUnitSymbol = (unit: TemperatureUnit | undefined | null): string => {
  let symbol = '';

  switch (unit) {
    case TemperatureUnit.Celcius:
      symbol = 'C';
      break;
    case TemperatureUnit.Fahrenheit:
      symbol = 'F';
      break;
    default:
      symbol = '?';
  }

  return symbol;
};

export default TemperatureUnit;
