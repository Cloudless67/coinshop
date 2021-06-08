import dayjs from 'dayjs';
import { State } from 'vue';
import { dayDiff } from './utilities';

export default function calculateCoinsToCollect(state: State, isMainCharacter: boolean) {
    const daysLeft = Math.min(
        dayDiff(dayjs(), state.eventEnd),
        dayDiff(state.eventStart, state.eventEnd),
    );
    const sundays = Math.floor((daysLeft + 3) / 7);
    const base = daysLeft * 300 + sundays * 300;

    if (isMainCharacter) return base + state.coinBonus * daysLeft;
    else return base;
}
