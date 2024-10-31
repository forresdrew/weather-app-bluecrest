import TemperatureUnit, { getTemperatureUnitSymbol } from '../TemperatureUnit';

describe('TemperatureUnit', () => {
  describe('getTemperatureUnitSymbol', () => {
    it('will return default when unit is undefined', () => {
      const output = getTemperatureUnitSymbol(undefined);

      expect(output).toEqual('?');
    });
    it('will return default when unit is null', () => {
      const output = getTemperatureUnitSymbol(null);

      expect(output).toEqual('?');
    });
    it('will return correct symbol for Celcius', () => {
      const output = getTemperatureUnitSymbol(TemperatureUnit.Celcius);

      expect(output).toEqual('C');
    });
    it('will return correct symbol for Fahrenheit', () => {
      const output = getTemperatureUnitSymbol(TemperatureUnit.Fahrenheit);

      expect(output).toEqual('F');
    });
  });
});
