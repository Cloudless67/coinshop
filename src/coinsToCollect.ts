import { State } from '@vue/runtime-core';
import { DateTime, Interval } from 'luxon';

const today = () => DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
const dayDiff = (start: DateTime, end: DateTime) => Interval.fromDateTimes(start, end).count('day');

export default function calculateCoinsToCollect(state: State, isMainCharacter: boolean) {
    const daysLeft = Math.min(
        dayDiff(today(), state.eventEnd),
        dayDiff(state.eventStart, state.eventEnd),
    );
    const sundays = Math.floor((daysLeft + 3) / 7);
    const base = daysLeft * 300 + sundays * 300;

    if (isMainCharacter) return base + state.coinBonus * daysLeft;
    else return base;
}
