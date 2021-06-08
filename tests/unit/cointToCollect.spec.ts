import calculateCoinsToCollect from '@/lib/coinsToCollect';
import dayjs, { Dayjs } from 'dayjs';

describe('Coins To Collect from today', () => {
    const start = dayjs('2021-04-22');
    const end = dayjs('2021-06-16');
    const bonus = 100;

    const calculate = (today: Dayjs, bonus: number, isMainChar: boolean) =>
        calculateCoinsToCollect(today, start, end, bonus, isMainChar);

    test('should collect 300 coins per day', () => {
        const today = dayjs('2021-06-15');
        expect(calculate(today, bonus, false)).toBe(600);
    });

    test('should collect 300 more for sunday', () => {
        const today = dayjs('2021-06-13');
        expect(calculate(today, bonus, false)).toBe(1500);
    });

    test("should collect max value when event hasn't started", () => {
        const today = dayjs('2021-04-18');
        expect(calculate(today, bonus, false)).toBe(19200);
    });

    test("should collect max value when event hasn't started", () => {
        const today = dayjs('2021-06-15');
        expect(calculate(today, bonus, true)).toBe(800);
    });
});
