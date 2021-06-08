import { Dayjs } from 'dayjs';

export const startOfDay = (day: Dayjs) =>
    day
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0);

export const dayDiff = (start: Dayjs, end: Dayjs) =>
    startOfDay(end).diff(startOfDay(start), 'day') + 1;
