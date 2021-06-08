import { useStore } from 'vuex';
import { key } from '@/store';
import { setCharacterData } from '@/store/mutationTypes';
import dayjs, { Dayjs } from 'dayjs';
import { dayDiff, sundaysInInterval } from '@/lib/utilities';

export default function useAutoupdateCoins() {
    const store = useStore(key);

    const isEventPeriod = () => {
        const today = dayjs().startOf('date');
        return store.state.eventEnd.diff(today) > 0 && store.state.eventStart.diff(today) < 0;
    };

    const isSameDay = (day1: Dayjs, day2: Dayjs) => day1.startOf('date') === day2.startOf('date');

    const coinsCollectedFor = (days: number, sundays: number, isMainCharacter: boolean) => {
        if (isMainCharacter) return (days + sundays) * (300 + store.state.coinBonus);
        else return (days + sundays) * 300;
    };

    const autoUpdate = () => {
        if (isEventPeriod() && localStorage.getItem('autoupdate') === 'true') {
            const today = dayjs();
            const lastVisit = dayjs(localStorage.getItem('last-visited')!);

            if (!isSameDay(today, lastVisit)) {
                console.log('hello');
                const daysPassed = dayDiff(lastVisit, today);
                const sundays = sundaysInInterval(lastVisit, today);

                store.commit(
                    setCharacterData,
                    store.state.characterData.table.map((row, i) => {
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
        }
    };

    return { autoUpdate };
}
