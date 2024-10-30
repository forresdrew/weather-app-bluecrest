// Enum to store metrics for API call
enum Unit {
  Celcius = 'metric',
  Fahrenheit = 'us',
}

// Extendable switch case function for unit symbols in case we want to add more in future
export const getTemperatureUnitSymbol = (unit: Unit): string => {
  let symbol = '';

  switch (unit) {
    case Unit.Celcius:
      symbol = 'C';
      break;
    case Unit.Fahrenheit:
      symbol = 'F';
      break;
    default:
      symbol = '?';
  }

  return symbol;
};

export default Unit;
