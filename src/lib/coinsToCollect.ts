import { Dayjs } from 'dayjs';
import { dayDiff } from './utilities';
import month from './month';

export default function calculateCoinsToCollect(
    today: Dayjs,
    eventStart: Dayjs,
    eventEnd: Dayjs,
    coinBonus: number[],
    isMainCharacter: boolean,
) {
    const daysLeft = Math.min(dayDiff(today, eventEnd) - 1, dayDiff(eventStart, eventEnd));
    const sundays = Math.floor((daysLeft + 3) / 7);
    const base = daysLeft * 300 + sundays * 300;
    const curMonth = month(today);

    if (isMainCharacter) {
        let bonus = (3 - curMonth) * 3500;
        if (curMonth > 0) bonus += 3500 - coinBonus[curMonth - 1];
        return base + bonus;
    } else return base;
}
