import { computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import Item from '@/Item';

export default function useTableRowController() {
    const store = useStore(key);
    const rows = computed(() =>
        store.state.itemCartData.table.map(row => {
            const item = store.getters.getItemByName(row[0]);
            return {
                item: item || Item.createEmptyItem(row[0] as string),
                character: row[1] as string,
                buyingQty: row[2] as number,
                sum: item ? (row[2] as number) * item.price : 0,
            };
        }),
    );

    return rows;
}
