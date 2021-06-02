<template>
    <div class="wrapper">
        <table class="table table-sm table-striped">
            <TableHeader :headers="headers" />
            <tbody ref="tbody">
                <tr
                    v-for="(row, i) in rows"
                    :key="i"
                    @keydown.ctrl.enter="addRow(i)"
                    @keydown.ctrl.delete.prevent="removeRow(i)"
                >
                    <td class="coin-name">
                        {{ coinName(row.item.coin) }}
                    </td>
                    <td class="item-name">
                        <Autocomplete
                            :value="row.item.name"
                            :itemsList="$store.getters.itemsNameList"
                            :width="'16ch'"
                            @update="updateItem(i, $event)"
                        />
                    </td>
                    <td class="price">
                        {{ commaSeperatedNumber(row.item.price) }}
                    </td>
                    <td class="exchangable">
                        {{ row.item.storageUsage }}
                    </td>
                    <td class="per-character">
                        {{ row.item.worldShare ? 'O' : 'X' }}
                    </td>
                    <td class="qty">
                        {{ row.item.qty >= 0 ? row.item.qty : '\u221e' }}
                    </td>
                    <td class="character">
                        <Autocomplete
                            v-if="showCharacterInput(row.item)"
                            :value="row.character"
                            :itemsList="$store.state.characterData.columns[0]"
                            :width="'100%'"
                            @update="updateCharacter(i, $event)"
                        />
                        <div v-else class="w-100 text-center">-</div>
                    </td>
                    <td class="buying-qty">
                        <input
                            class="w-100"
                            :value="row.buyingQty"
                            @input="updateBuyingQty(i, $event.target.value)"
                            type="number"
                            min="0"
                            max="999"
                        />
                    </td>
                    <td class="sum">
                        {{ commaSeperatedNumber(row.sum) }}
                    </td>
                    <td v-show="edit" class="btn table-danger" @click="removeRow(i, -1)">X</td>
                </tr>
                <tr v-if="edit">
                    <td
                        colspan="9"
                        class="text-center"
                        style="cursor: pointer;"
                        @click="addRow(rows.length - 1, -1)"
                    >
                        <span class="w-100">추가</span>
                    </td>
                </tr>
                <tr class="text-center" v-for="(coin, i) in $store.state.coins" :key="i">
                    <td colspan="8">{{ coin.name }}</td>
                    <td>
                        {{ commaSeperatedNumber(totalSum(i)) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import Autocomplete from '@/components/Autocomplete.vue';
import {
    addCartItem,
    removeCartItem,
    updateBuyingQty,
    updateCartCharacter,
    updateCartItem,
} from '@/store/mutationTypes';
import useTableRowController from '@/composables/useTableRowController';
import useItemCartRows from '@/composables/useItemCartRows';
import useUtilities from '@/composables/useUtilities';
import Item from '@/Item';
import { itemCartTableHeader } from '@/constants';

export default defineComponent({
    name: 'Items Cart Table',
    components: { TableHeader, Autocomplete },
    props: {
        edit: {
            type: Boolean,
            required: true,
        },
    },
    setup() {
        const { tbody, addRow, removeRow } = useTableRowController();

        const rows = useItemCartRows();

        const { commaSeperatedNumber } = useUtilities();

        return {
            headers: itemCartTableHeader,
            rows,
            tbody,
            addRow: (row: number, col = 1) => addRow(addCartItem, row, col),
            removeRow: (row: number, col: number = 1) => removeRow(removeCartItem, row, col),
            commaSeperatedNumber,
        };
    },
    methods: {
        updateItem(row: number, value: string) {
            this.$store.commit(updateCartItem, { row, value });
            this.$nextTick(() => {
                this.$store.commit(updateBuyingQty, {
                    row,
                    value: this.itemsLeft(this.rows[row].item, row),
                });
            });
        },
        updateCharacter(row: number, value: string) {
            this.$store.commit(updateCartCharacter, { row, value });
        },
        updateBuyingQty(row: number, value: number) {
            value = Math.min(this.itemsLeft(this.rows[row].item, row), value);
            this.$store.commit(updateBuyingQty, { row, value });
            this.$forceUpdate();
        },
        itemsLeft(item: Item, exclusiveRow: number) {
            if (item.qty < 0) return Infinity;
            else if (item.worldShare) return item.qty;
            else {
                const sum = this.rows
                    .filter((r, i) => r.item.name === item.name && exclusiveRow !== i)
                    .reduce((a, r) => a + r.buyingQty, 0);
                return item.qty - sum;
            }
        },
        showCharacterInput(item: Item) {
            return item.coin >= 0 && !this.$store.getters.getCoinByID(item.coin).worldScope;
        },
        coinName(coinID: number) {
            if (coinID >= 0) return this.$store.getters.getCoinByID(coinID).name;
            else return '';
        },
        totalSum(coin: number) {
            return this.rows.filter(r => r.item.coin === coin).reduce((a, r) => a + r.sum, 0);
        },
    },
});
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    overflow: auto;
    height: 80vh;
}

.coin-name {
    min-width: 8ch;
    width: fit-content;
}

.item-name {
    min-width: 16ch;
}

.exchangable,
.qty,
.price,
.buying-qty {
    min-width: 6ch;
    text-align: center;
}

.per-character,
.sum {
    min-width: 7ch;
    text-align: center;
}

.character {
    min-width: 12ch;
    width: 12ch;
}
</style>
