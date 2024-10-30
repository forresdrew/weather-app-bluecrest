class DateUtils {
  public static formatDate = (dateToFormat: Date): string => {
    if (isNaN(dateToFormat?.getTime())) {
      return 'Invalid Date';
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[dateToFormat.getDay()];
    const date = dateToFormat.getDate();
    const month = months[dateToFormat.getMonth()];

    return day + ', ' + date + ' ' + month;
  };

  public static isDateTomorrow = (dateString: string): boolean => {
    const today = new Date();
    const date = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return date.getTime() === tomorrow.getTime();
  };

  public static getYYYYMMDDDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
}

export default DateUtils;
