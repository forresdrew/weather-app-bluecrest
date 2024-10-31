// Extendable class of static methods for formatting and processing strings
class StringUtils {
  public static splitLocationString = (location: string | undefined | null): [string, string] => {
    if (!location) {
      return ['Unknown Primary', 'Unknown Secondary'];
    }
    const [primary, ...secondaries] = location.split(',');
    const secondPart = secondaries.join(',').trim();

    return [primary.trim(), secondPart];
  };
}

export default StringUtils;
