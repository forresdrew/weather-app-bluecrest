class StringUtils {
  public static splitLocationString = (location: string): [string, string] => {
    const [primary, ...secondaries] = location.split(',');
    const secondPart = secondaries.join(', ').trim();

    return [primary.trim(), secondPart];
  };
}

export default StringUtils;
