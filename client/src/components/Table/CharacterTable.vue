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
                        @input="updateNickname($event.target.value, i)"
                    />
                </td>
                <td>
                    {{ row.currentCoins }}
                </td>
                <td>
                    {{ row.coinToCollect }}
                </td>
                <td>
                    {{ row.using }}
                </td>
                <td :class="{ 'table-danger': row.surplus < 0 }">
                    {{ row.surplus }}
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
    updateCharacterNickname,
} from '@/store/mutationTypes';
import useTableRowController from '@/composables/useTableRowController';
import useCharacterRows from '@/composables/useCharacterRows';
import { characterTableHeader } from '@/constants';

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

        return {
            headers: characterTableHeader,
            rows,
            tbody,
            addRow: (row: number, col = 0) => addRow(addCharacterRow, row, col),
            removeRow: (row: number) => removeRow(removeCharacterRow, row, 0),
        };
    },
    methods: {
        updateNickname(nickname: string, row: number) {
            this.$store.commit(updateCharacterNickname, { row, nickname });
        },
    },
});
</script>
