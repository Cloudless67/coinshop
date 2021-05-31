import { computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import Item from '@/Item';

export default function useCharacterRows() {
    const store = useStore(key);
    const rows = computed(() => {
        const days = store.getters.eventDuration;
        return store.state.characterData.table.map((row, i) => {
            let expectedTotal = (days / 7) * 300 * 8;
            if (i === 0) expectedTotal += store.getters.gardeningCoin * days;

            const using = store.state.itemCartData.table
                .filter(cartRow => cartRow[1] === row[0])
                .map(cartRow => {
                    const item: Item = store.getters.getItemByName(cartRow[0]);
                    if (item && item.coin === 0) return (cartRow[2] as number) * item.price;
                    else return 0;
                })
                .reduce((a, r) => a + r, 0);

            return { nickname: row[0], expectedTotal, using, surplus: expectedTotal - using };
        });
    });

    return rows;
}
