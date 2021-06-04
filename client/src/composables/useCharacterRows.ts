import { computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import Item from '@/Item';
import calculateCoinsToCollect from '@/coinsToCollect';

export default function useCharacterRows() {
    const store = useStore(key);

    const rows = computed(() => {
        return store.state.characterData.table.map((row, i) => {
            return {
                nickname: row[0] as string,
                currentCoins: row[1] as number,
                toCollect: coinsToCollect(row, i),
                toUse: calculateCoinsToUse(row),
            };
        });
    });

    function coinsToCollect(row: (string | number)[], i: number) {
        return Boolean(row[3])
            ? (row[2] as number)
            : calculateCoinsToCollect(
                  store.state.eventStart,
                  store.state.eventEnd,
                  store.state.coinBonus,
                  i === 0,
              );
    }

    function calculateCoinsToUse(row: (string | number)[]) {
        return store.state.itemCartData.table
            .filter(cartRow => cartRow[1] === row[0] && !cartRow[3])
            .map(cartRow => {
                const item: Item = store.getters.getItemByName(cartRow[0]);
                if (item && item.coin === 0) return (cartRow[2] as number) * item.price;
                else return 0;
            })
            .reduce((a, r) => a + r, 0);
    }

    return rows;
}
