import { DateTime, Interval } from 'luxon';

const today = () => DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
const dayDiff = (start: DateTime, end: DateTime) => Interval.fromDateTimes(start, end).count('day');

export default function calculateCoinsToCollect(
    eventStart: DateTime,
    eventEnd: DateTime,
    coinBonus: number,
    isMainCharacter: boolean,
) {
    const daysLeft = Math.min(dayDiff(today(), eventEnd), dayDiff(eventStart, eventEnd));
    const sundays = Math.floor((daysLeft + 3) / 7);
    const base = daysLeft * 300 + sundays * 300;

    if (isMainCharacter) return base + coinBonus * daysLeft;
    else return base;
}
