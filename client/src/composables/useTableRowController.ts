import { nextTick, ref } from 'vue';
import { useStore } from 'vuex';

export default function useTableRowController() {
    const store = useStore();
    const tbody = ref<HTMLElement>();

    const setFocus = (row: number, col: number) => {
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

    return { tbody, addRow, removeRow };
}
