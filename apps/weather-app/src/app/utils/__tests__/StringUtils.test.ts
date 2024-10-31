import StringUtils from '../StringUtils';

describe('StringUtils', () => {
  describe('splitLocationString', () => {
    it('will return Unknown strings when location is undefined', () => {
      const output = StringUtils.splitLocationString(undefined);

      expect(output[0]).toEqual('Unknown Primary');
      expect(output[1]).toEqual('Unknown Secondary');
    });
    it('will return Unknown strings when location is null', () => {
      const output = StringUtils.splitLocationString(null);

      expect(output[0]).toEqual('Unknown Primary');
      expect(output[1]).toEqual('Unknown Secondary');
    });
    it('will format complete date string', () => {
      const output = StringUtils.splitLocationString('Nelson, Tasman, New Zealand');

      expect(output[0]).toEqual('Nelson');
      expect(output[1]).toEqual('Tasman, New Zealand');
    });
    it('will format date string with only primary location', () => {
      const output = StringUtils.splitLocationString('Nelson');

      expect(output[0]).toEqual('Nelson');
      expect(output[1]).toEqual('');
    });
  });
});
