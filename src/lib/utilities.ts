import { Dayjs } from 'dayjs';

export const dayDiff = (start: Dayjs, end: Dayjs) =>
    end.startOf('date').diff(start.startOf('date'), 'day') + 1;

export const isInInterval = (day: Dayjs, start: Dayjs, end: Dayjs) => {
    return end.diff(day) >= 0 && start.diff(day) <= 0;
};

export const sundaysInInterval = (start: Dayjs, end: Dayjs) => {
    const mondayIsStartOfWeek = ((start.day() + 6) % 7) + 1;
    return Math.floor((dayDiff(start, end) + mondayIsStartOfWeek - 1) / 7);
};
