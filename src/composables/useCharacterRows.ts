import { computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import Item from '@/lib/Item';
import calculateCoinsToCollect from '@/lib/coinsToCollect';
import { updateCharacterCoinsToCollect } from '@/store/mutationTypes';

export default function useCharacterRows() {
    const store = useStore(key);
    const state = store.state;

    const calculateCoins = (isMainCharacter: boolean) =>
        calculateCoinsToCollect(
            state.today,
            state.eventStart,
            state.eventEnd,
            state.coinBonus,
            isMainCharacter,
        );

    const rows = computed(() => {
        return state.characterData.table.map((row, i) => {
            const maxToCollect = calculateCoins(i === 0);
            return {
                nickname: row[0] as string,
                currentCoins: row[1] as number,
                toCollect: Boolean(row[3]) ? (row[2] as number) : maxToCollect,
                toUse: calculateCoinsToUse(row),
            };
        });
    });

    function calculateCoinsToUse(row: (string | number)[]) {
        return state.itemCartData.table
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
