import { useStore } from 'vuex';
import { key } from '@/store';
import { setCharacterData } from '@/store/mutationTypes';
import dayjs, { Dayjs } from 'dayjs';
import { dayDiff, isInInterval, sundaysInInterval } from '@/lib/utilities';

export default function useAutoupdateCoins() {
    const store = useStore(key);
    const state = store.state;

    const isEventPeriod = (today: Dayjs) => isInInterval(today, state.eventStart, state.eventEnd);

    const isSameDay = (day1: Dayjs, day2: Dayjs) => day1.diff(day2) === 0;

    const coinsCollectedFor = (days: number, sundays: number, isMainCharacter: boolean) => {
        if (isMainCharacter) return (days + sundays) * (300 + state.coinBonus);
        else return (days + sundays) * 300;
    };

    const autoUpdate = () => {
        const today = dayjs().startOf('date');
        const lastVisit = dayjs(localStorage.getItem('last-visited')!);
        if (isEventPeriod(today) && !isSameDay(today, lastVisit)) {
            const daysPassed = Math.min(
                dayDiff(lastVisit.add(1, 'day'), today),
                dayDiff(state.eventStart, today),
            );
            const sundays = sundaysInInterval(lastVisit.add(1, 'day'), today);

            store.commit(
                setCharacterData,
                state.characterData.table.map((row, i) => {
                    const tuple = row as [string, number, number];
                    const coinsCollected = Math.min(
                        coinsCollectedFor(daysPassed, sundays, i === 0),
                        tuple[2],
                    );
                    tuple[1] += coinsCollected;
                    tuple[2] -= coinsCollected;
                    return tuple;
                }),
            );
        }
    };

    return { autoUpdate };
}
