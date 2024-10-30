enum Unit {
  Celcius = 'metric',
  Fahrenheit = 'us',
}

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
