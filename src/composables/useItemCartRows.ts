import { computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import Item from '@/lib/Item';

export default function useTableRowController() {
    const store = useStore(key);
    const rows = computed(() =>
        (store.state.itemCartData.table as [string, number, number, number][]).map(
            ([itemName, character, qty, bought]) => {
                const item = store.getters.getItemByName(itemName);
                return {
                    item: item || Item.createEmptyItem(itemName),
                    character,
                    buyingQty: qty,
                    sum: item ? qty * item.price : 0,
                    bought: bought === 1,
                };
            },
        ),
    );

    return rows;
}
