<template>
    <table class="table table-sm table-striped">
        <thead>
            <tr>
                <th v-for="header in headers" :key="header">
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody ref="tbody">
            <tr v-for="(row, i) in rows" :key="i">
                <td>
                    <input
                        class="nickname"
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
                    {{ row.used }}
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
import {
    addCharacterRow,
    removeCharacterRow,
    updateCharacterNickname,
} from '@/store/mutationTypes';
import useTableRowController from '@/composables/useTableRowController';

export default defineComponent({
    name: 'Character Table',
    setup() {
        const { tbody, addRow, removeRow } = useTableRowController();

        return {
            tbody,
            addRow: (row: number) => addRow(addCharacterRow, row, 0),
            removeRow: (row: number) => removeRow(removeCharacterRow, row, 0),
        };
    },
    data() {
        return {
            headers: ['캐릭터', '모을 코인', '사용할 코인', '잉여'],
        };
    },
    computed: {
        rows() {
            const days = this.$store.getters.eventDuration;
            return this.$store.state.characterData.table.map((nickname, i) => {
                let expectedTotal = (days / 7) * 300 * 8;
                if (i === 0) expectedTotal += this.$store.getters.gardeningCoin * days;

                const used = 0;
                const surplus = expectedTotal - used;
                return { nickname, expectedTotal, used, surplus };
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

<style lang="scss" scoped>
.nickname {
    width: 12ch;
}
</style>
