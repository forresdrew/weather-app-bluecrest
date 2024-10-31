import DateUtils from '../DateUtils';

beforeAll(() => {
  jest.useFakeTimers('modern' as FakeTimersConfig);
  jest.setSystemTime(new Date('1998-05-24T18:30:00'));
});

describe('DateUtils', () => {
  describe('formatDateDDDddMMM', () => {
    it('will return Invalid Date string when dateToFormat is undefined', () => {
      const output = DateUtils.formatDateDDDddMMM(undefined);

      expect(output).toEqual('Invalid Date');
    });
    it('will return Invalid Date string when dateToFormat is null', () => {
      const output = DateUtils.formatDateDDDddMMM(null);

      expect(output).toEqual('Invalid Date');
    });
    it('will format date correctly', () => {
      const output = DateUtils.formatDateDDDddMMM(new Date());

      expect(output).toEqual('Sun, 24 May');
    });
  });
});
