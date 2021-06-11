import { Dayjs } from 'dayjs';
import { dayDiff } from './utilities';

export default function calculateCoinsToCollect(
    today: Dayjs,
    eventStart: Dayjs,
    eventEnd: Dayjs,
    coinBonus: number,
    isMainCharacter: boolean,
) {
    const daysLeft = Math.min(dayDiff(today, eventEnd) - 1, dayDiff(eventStart, eventEnd));
    const sundays = Math.floor((daysLeft + 3) / 7);
    const base = daysLeft * 300 + sundays * 300;
    if (isMainCharacter) return base + coinBonus * daysLeft;
    else return base;
}
