<template>
    <table class="table table-sm table-striped">
        <thead>
            <tr>
                <th v-for="header in headers" :key="header">
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody ref="rows">
            <tr v-for="i in rows.length" :key="i">
                <td>
                    <input
                        class="nickname"
                        type="text"
                        :value="rows[i - 1][0]"
                        @keydown.ctrl.enter="addRow(i - 1)"
                        @keydown.ctrl.delete.prevent="removeRow(i - 1)"
                        @input="updateNickname($event, i - 1)"
                    />
                </td>
                <td>
                    {{ rows[i - 1][1] }}
                </td>
                <td>
                    {{ rows[i - 1][2] }}
                </td>
                <td>
                    {{ rows[i - 1][3] }}
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

export default defineComponent({
    name: 'Character Table',
    data() {
        return {
            headers: ['캐릭터', '모을 코인', '사용할 코인', '잉여'],
        };
    },
    computed: {
        rows() {
            const days = this.$store.getters.eventDuration;
            const weeks = days / 7;
            const gardening = this.$store.getters.gardeningCoin;
            return this.$store.state.characterData.table.map((nickname, i) => {
                let expectedTotal = weeks * 300 * 8;
                if (i === 0) expectedTotal += gardening * days;

                const used = 0;
                const surplus = expectedTotal - used;
                return [nickname[0], expectedTotal, used, surplus];
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
        addRow(row: number) {
            this.$store.commit(addCharacterRow, row);
            this.$nextTick(() => this.setFocus(row + 1));
        },
        removeRow(row: number) {
            if (row !== 0) {
                this.$store.commit(removeCharacterRow, row);
                this.setFocus(row - 1);
            }
        },
        setFocus(row: number) {
            const rows = (this.$refs.rows as Element).children;
            const newRow = rows[row].firstElementChild
                ?.firstElementChild as HTMLElement;
            newRow.focus();
        },
    },
});
</script>

<style lang="scss" scoped>
.nickname {
    width: 12ch;
}
</style>
