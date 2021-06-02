import { computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import Item from '@/Item';
import { DateTime, Interval } from 'luxon';

export default function useCharacterRows() {
    const store = useStore(key);

    function calculateCoinsToCollect(isMainCharacter: boolean) {
        if (store.state.eventEnd.toMillis() === 0) return 0;

        const today = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        const daysLeft = Math.min(
            Interval.fromDateTimes(today, store.state.eventEnd).count('day'),
            store.getters.eventDuration,
        );
        const sundays = Math.floor((daysLeft + 3) / 7);
        const base = daysLeft * 300 + sundays * 300;
        if (isMainCharacter) return base + store.state.coinBonus * daysLeft;
        else return base;
    }

    const rows = computed(() => {
        return store.state.characterData.table.map((row, i) => {
            const currentCoins = 0;
            const coinToCollect = calculateCoinsToCollect(i === 0);

            const using = store.state.itemCartData.table
                .filter(cartRow => cartRow[1] === row[0])
                .map(cartRow => {
                    const item: Item = store.getters.getItemByName(cartRow[0]);
                    if (item && item.coin === 0) return (cartRow[2] as number) * item.price;
                    else return 0;
                })
                .reduce((a, r) => a + r, 0);

            return {
                nickname: row[0],
                currentCoins,
                coinToCollect,
                using,
                surplus: coinToCollect - using,
            };
        });
    });

    return rows;
}
