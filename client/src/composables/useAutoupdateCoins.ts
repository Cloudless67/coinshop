import { useStore } from 'vuex';
import { key } from '@/store';
import { DateTime, Interval } from 'luxon';
import { setCharacterData } from '@/store/mutationTypes';

export default function useAutoupdateCoins() {
    const store = useStore(key);

    const isEventPeriod = () => {
        return Interval.fromDateTimes(store.state.eventStart, store.state.eventEnd).contains(
            DateTime.now(),
        );
    };

    const sundaysInInterval = (interval: Interval) =>
        Math.floor((interval.start.weekday + interval.count('day') - 1) / 7);

    const isSameDay = (day1: DateTime, day2: DateTime) =>
        day1.day === day2.day && day1.month === day2.month;

    const coinsCollectedFor = (days: number, sundays: number, isMainCharacter: boolean) => {
        if (isMainCharacter) return (days + sundays) * (300 + store.state.coinBonus);
        else return (days + sundays) * 300;
    };

    const autoUpdate = () => {
        if (isEventPeriod() && localStorage.getItem('autoupdate') === 'true') {
            const today = DateTime.now();
            const lastVisit = DateTime.fromISO(localStorage.getItem('last-visited')!);

            if (!isSameDay(today, lastVisit)) {
                console.log('hello');
                const interval = Interval.fromDateTimes(lastVisit.plus({ day: 1 }), today);
                const daysPassed = interval.count('day');
                const sundays = sundaysInInterval(interval);

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
