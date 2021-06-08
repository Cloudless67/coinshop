import { dayDiff, sundaysInInterval } from '@/lib/utilities';
import dayjs from 'dayjs';

describe('Utilities', () => {
    test('should include start and end day', () => {
        expect(dayDiff(dayjs('2020-01-01T00:00:00.000Z'), dayjs('2020-01-10T00:00:00.000Z'))).toBe(
            10,
        );
        expect(dayDiff(dayjs('2020-01-01T12:00:00.000Z'), dayjs('2020-01-10T00:00:00.000Z'))).toBe(
            10,
        );
        expect(dayDiff(dayjs('2020-01-01T12:00:00.000Z'), dayjs('2020-01-01T12:00:00.000Z'))).toBe(
            1,
        );
    });

    test.only('should calculate sundays between days', () => {
        expect(sundaysInInterval(dayjs('2021-06-06'), dayjs('2021-06-06'))).toBe(1);
        expect(sundaysInInterval(dayjs('2021-06-06'), dayjs('2021-06-07'))).toBe(1);
        expect(sundaysInInterval(dayjs('2021-06-06'), dayjs('2021-06-12'))).toBe(1);
        expect(sundaysInInterval(dayjs('2021-06-06'), dayjs('2021-06-13'))).toBe(2);

        expect(sundaysInInterval(dayjs('2021-06-07'), dayjs('2021-06-07'))).toBe(0);
        expect(sundaysInInterval(dayjs('2021-06-07'), dayjs('2021-06-12'))).toBe(0);
        expect(sundaysInInterval(dayjs('2021-06-07'), dayjs('2021-06-13'))).toBe(1);

        expect(sundaysInInterval(dayjs('2021-06-03'), dayjs('2021-06-13'))).toBe(2);
    });
});
