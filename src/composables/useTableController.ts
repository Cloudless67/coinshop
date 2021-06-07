import { nextTick, ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default function useTableRowController() {
    const store = useStore(key);
    const tbody = ref<HTMLElement>();

    const setFocus = (row: number, col: number) => {
        if (col >= 0)
            tbody.value!.children[row].children[col].getElementsByTagName('input')[0].focus();
    };

    const addRow = async (commit: string, row: number, col: number) => {
        store.commit(commit, row);
        await nextTick();
        setFocus(row + 1, col);
    };

    const removeRow = (commit: string, row: number, col: number) => {
        if (row !== 0) {
            store.commit(commit, row);
            setFocus(row - 1, col);
        }
    };

    const updateCellValue = (commit: string, row: number, value: string) =>
        store.commit(commit, { row, value });

    return { tbody, addRow, removeRow, updateCellValue };
}
