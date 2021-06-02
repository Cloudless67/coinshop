<template>
    <table class="table table-sm table-striped">
        <TableHeader :headers="headers" />
        <tbody ref="tbody">
            <tr v-for="(row, i) in rows" :key="i">
                <td style="width: 12ch;">
                    <input
                        class="w-100"
                        type="text"
                        :value="row.nickname"
                        @keydown.ctrl.enter="addRow(i)"
                        @keydown.ctrl.delete.prevent="removeRow(i)"
                        @input="updateNickname(i, $event.target.value)"
                    />
                </td>
                <td>
                    <input
                        style="width: 6ch;"
                        :value="commaSeperatedNumber(row.currentCoins)"
                        @input="updateCurrentCoins(i, $event.target.value)"
                    />
                </td>
                <td>
                    {{ commaSeperatedNumber(row.toCollect) }}
                </td>
                <td>
                    {{ commaSeperatedNumber(row.toUse) }}
                </td>
                <td :class="{ 'table-danger': surplus(row) < 0 }">
                    {{ commaSeperatedNumber(surplus(row)) }}
                </td>
                <td v-show="edit" class="btn table-danger" @click="removeRow(i)">X</td>
            </tr>
            <tr v-show="edit">
                <td
                    colspan="4"
                    class="text-center"
                    style="cursor: pointer;"
                    @click="addRow(rows.length - 1, -1)"
                >
                    <span class="w-100">추가</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import {
    addCharacterRow,
    removeCharacterRow,
    updateCharacterCurrentCoins,
    updateCharacterNickname,
} from '@/store/mutationTypes';
import useTableRowController from '@/composables/useTableRowController';
import useCharacterRows from '@/composables/useCharacterRows';
import useUtilities from '@/composables/useUtilities';
import { characterTableHeader } from '@/constants';

type RowData = {
    nickname: string;
    currentCoins: number;
    toCollect: number;
    toUse: number;
};

export default defineComponent({
    name: 'Character Table',
    components: { TableHeader },
    props: {
        edit: {
            type: Boolean,
            required: true,
        },
    },
    setup() {
        const { tbody, addRow, removeRow } = useTableRowController();

        const rows = useCharacterRows();

        const { commaSeperatedNumber } = useUtilities();

        return {
            headers: characterTableHeader,
            rows,
            tbody,
            addRow: (row: number, col = 0) => addRow(addCharacterRow, row, col),
            removeRow: (row: number) => removeRow(removeCharacterRow, row, 0),
            surplus: (rowData: RowData) => rowData.currentCoins + rowData.toCollect - rowData.toUse,
            commaSeperatedNumber,
        };
    },
    methods: {
        updateNickname(row: number, value: string) {
            this.$store.commit(updateCharacterNickname, { row, value });
        },
        updateCurrentCoins(row: number, value: string) {
            const num = Math.max(0, Number.parseInt(value.replaceAll(',', '')));
            this.$store.commit(updateCharacterCurrentCoins, { row, value: num || 0 });
            this.$forceUpdate();
        },
    },
});
</script>
