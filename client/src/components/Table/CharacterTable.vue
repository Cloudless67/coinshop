<template>
    <table class="table table-sm table-striped">
        <TableHeader :headers="['캐릭터', '모을 코인', '사용할 코인', '잉여']" />
        <tbody ref="tbody">
            <tr v-for="(row, i) in rows" :key="i">
                <td>
                    <input
                        type="text"
                        :value="row.nickname"
                        style="width: 12ch;"
                        @keydown.ctrl.enter="addRow(i)"
                        @keydown.ctrl.delete.prevent="removeRow(i)"
                        @input="updateNickname($event, i)"
                    />
                </td>
                <td>
                    {{ row.expectedTotal }}
                </td>
                <td>
                    {{ row.using }}
                </td>
                <td>
                    {{ row.surplus }}
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
import Item from '@/Item';

export default defineComponent({
    name: 'Character Table',
    components: { TableHeader },
    setup() {
        const { tbody, addRow, removeRow } = useTableRowController();

        return {
            tbody,
            addRow: (row: number) => addRow(addCharacterRow, row, 0),
            removeRow: (row: number) => removeRow(removeCharacterRow, row, 0),
        };
    },
    computed: {
        rows() {
            const days = this.$store.getters.eventDuration;
            return this.$store.state.characterData.table.map((row, i) => {
                let expectedTotal = (days / 7) * 300 * 8;
                if (i === 0) expectedTotal += this.$store.getters.gardeningCoin * days;

                const using = this.$store.state.itemCartData.table
                    .filter(cartRow => cartRow[1] === row[0])
                    .map(cartRow => {
                        const item: Item = this.$store.getters.getItemByName(cartRow[0]);
                        if (item.coin === 0) return (cartRow[2] as number) * item.price;
                        else return 0;
                    })
                    .reduce((a, r) => a + r, 0);

                return { nickname: row[0], expectedTotal, using, surplus: expectedTotal - using };
            });
        },
    },
    methods: {
        updateNickname(e: Event, row: number) {
            const target = e.currentTarget as HTMLInputElement;
            this.$store.commit(updateCharacterNickname, {
                row,
                nickname: target.value,
            });
        },
    },
});
</script>
