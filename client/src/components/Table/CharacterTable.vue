<template>
    <table class="table table-sm table-striped">
        <TableHeader :headers="['캐릭터', '모을 코인', '사용할 코인', '잉여']" />
        <tbody ref="tbody">
            <tr v-for="(row, i) in rows" :key="i">
                <td style="width: 12ch;">
                    <input
                        class="w-100"
                        type="text"
                        :value="row.nickname"
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
                <td :class="{ 'table-success': row.surplus >= 0, 'table-danger': row.surplus < 0 }">
                    {{ row.surplus }}
                </td>
                <td v-show="edit" class="btn" @click="removeRow(i)">X</td>
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
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
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
    props: {
        edit: {
            type: Boolean,
            required: true,
        },
    },
    setup() {
        const { tbody, addRow, removeRow } = useTableRowController();

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

        return {
            rows,
            tbody,
            addRow: (row: number, col = 0) => addRow(addCharacterRow, row, col),
            removeRow: (row: number) => removeRow(removeCharacterRow, row, 0),
        };
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
