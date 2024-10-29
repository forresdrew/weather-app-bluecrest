class DateUtils {
  public static formatDate = (date: Date): string => {
    if (isNaN(date?.getTime())) {
      return 'Invalid Date';
    }

    return date.toLocaleDateString('en-UK', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
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

  public static getWeekDay = (dateString: string): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const date = new Date(dateString);
    return days[date.getDay()];
  };
}

export default DateUtils;
