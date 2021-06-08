import { dayDiff, isInInterval, sundaysInInterval } from '@/lib/utilities';
import dayjs from 'dayjs';

describe('Utilities', () => {
    test('should return true for start and end day', () => {
        const start = dayjs('2021-04-22');
        const end = dayjs('2021-06-16');

        expect(isInInterval(start, start, end)).toBe(true);
        expect(isInInterval(end, start, end)).toBe(true);
    });

    test('should include start and end day', () => {
        const Jan_1 = dayjs('2020-01-01T00:00:00.000Z');
        const Jan_10 = dayjs('2020-01-01T00:00:00.000Z');
        const Jan_1_12 = dayjs('2020-01-01T12:00:00.000Z');

        expect(dayDiff(Jan_1, Jan_10)).toBe(10);
        expect(dayDiff(Jan_1_12, Jan_10)).toBe(10);
        expect(dayDiff(Jan_1_12, Jan_1_12)).toBe(1);
    });

    test('should calculate sundays between days', () => {
        const Jun_3 = dayjs('2021-06-03');
        const Jun_6 = dayjs('2021-06-06');
        const Jun_7 = dayjs('2021-06-07');
        const Jun_12 = dayjs('2021-06-07');
        const Jun_13 = dayjs('2021-06-07');

        expect(sundaysInInterval(Jun_6, Jun_6)).toBe(1);
        expect(sundaysInInterval(Jun_6, Jun_7)).toBe(1);
        expect(sundaysInInterval(Jun_6, Jun_12)).toBe(1);
        expect(sundaysInInterval(Jun_6, Jun_13)).toBe(2);

        expect(sundaysInInterval(Jun_7, Jun_7)).toBe(0);
        expect(sundaysInInterval(Jun_7, Jun_12)).toBe(0);
        expect(sundaysInInterval(Jun_7, Jun_13)).toBe(1);

        expect(sundaysInInterval(Jun_3, Jun_13)).toBe(2);
    });
});
