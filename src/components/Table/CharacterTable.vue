<template>
    <table class="table table-sm table-striped">
        <TableHeader :headers="headers" />
        <tbody ref="tbody">
            <tr
                v-for="(row, i) in rows"
                :key="i"
                @keydown.ctrl.enter="addRow(i)"
                @keydown.ctrl.delete.prevent="removeRow(i)"
            >
                <td class="character">
                    <input
                        class="w-100"
                        type="text"
                        :value="row.nickname"
                        @input="updateNickname(i, $event.target.value)"
                    />
                </td>
                <td class="coins">
                    <NumberInput
                        :model-value="row.currentCoins"
                        @update:model-value="updateCurrentCoins(i, $event)"
                    />
                </td>
                <td class="coins">
                    <NumberInput
                        :model-value="row.toCollect"
                        @update:model-value="updateCoinsToCollect(i, $event)"
                    />
                </td>
                <td class="coins">
                    {{ commaSeperatedNumber(row.toUse) }}
                </td>
                <td class="coins" :class="{ 'table-danger': surplus(row) < 0 }">
                    {{ commaSeperatedNumber(surplus(row)) }}
                </td>
                <td v-show="edit" class="btn table-danger" @click="removeRow(i)">X</td>
            </tr>
            <tr v-show="edit">
                <td
                    colspan="5"
                    class="text-center"
                    style="cursor: pointer;"
                    @click="addRow(rows.length - 1, -1)"
                >
                    <span class="w-100 btn btn-sm btn-outline-dark">추가</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import NumberInput from '@/components/NumberInput.vue';
import {
    addCharacterRow,
    removeCharacterRow,
    updateCharacterCoinsToCollect,
    updateCharacterCurrentCoins,
    updateCharacterNickname,
} from '@/store/mutationTypes';
import useTableController from '@/composables/useTableController';
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
    components: { TableHeader, NumberInput },
    props: {
        edit: {
            type: Boolean,
            required: true,
        },
    },
    setup() {
        const { tbody, addRow, removeRow, updateCellValue } = useTableController();

        const rows = useCharacterRows();

        const { commaSeperatedNumber } = useUtilities();

        return {
            headers: characterTableHeader,
            rows,
            tbody,
            addRow: (row: number, col = 0) => addRow(addCharacterRow, row, col),
            removeRow: (row: number) => removeRow(removeCharacterRow, row, 0),
            surplus: (rowData: RowData) =>
                Number(rowData.currentCoins) + Number(rowData.toCollect) - Number(rowData.toUse),
            commaSeperatedNumber,

            updateNickname: (row: number, value: string) =>
                updateCellValue(updateCharacterNickname, row, value),
            updateCurrentCoins: (row: number, value: string) =>
                updateCellValue(updateCharacterCurrentCoins, row, value),
            updateCoinsToCollect: (row: number, value: string) =>
                updateCellValue(updateCharacterCoinsToCollect, row, value),
        };
    },
});
</script>
