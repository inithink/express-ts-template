import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import arraySupport from 'dayjs/plugin/arraySupport';

dayjs.extend(arraySupport);
dayjs.extend(timezone);
dayjs.extend(utc);

const kst = (date?: dayjs.ConfigType, format?: dayjs.OptionType) =>
  dayjs(date, format).tz('Asia/Seoul');

export { kst, dayjs };
