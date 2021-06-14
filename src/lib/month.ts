import dayjs from 'dayjs';
import { isInInterval } from './utilities';

export default function() {
    const today = dayjs('2021-06-22');
    if (isInInterval(today, dayjs('2021-06-17'), dayjs('2021-07-14'))) return 1;
    else if (isInInterval(today, dayjs('2021-07-15'), dayjs('2021-08-11'))) return 2;
    else if (isInInterval(today, dayjs('2021-08-12'), dayjs('2021-09-12'))) return 3;
    else return 0;
}
