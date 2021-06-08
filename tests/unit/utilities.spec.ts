import { dayDiff, startOfDay } from '@/lib/utilities';
import dayjs from 'dayjs';

describe('Utilities', () => {
    test('should set time to 00:00:00.000Z', () => {
        expect(startOfDay(dayjs('2020-01-01T12:00:00.000Z')).format('HH:mm:ss')).toEqual(
            '00:00:00',
        );
    });

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
});
