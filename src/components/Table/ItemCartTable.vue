<template>
    <section class="wrapper">
        <table class="table table-sm table-striped">
            <TableHeader :headers="headers" />
            <tbody ref="tbody">
                <tr
                    class="item-cart-row"
                    v-for="(row, i) in rows"
                    :key="i"
                    :class="{ 'text-danger': row.bought }"
                    @keydown.ctrl.enter="addRow(i)"
                    @keydown.ctrl.delete.prevent="removeRow(i)"
                    @dblclick.prevent="toggleBuy(i)"
                >
                    <td class="coin-name">
                        {{ $store.getters.getCoinByID(row.item.coin)?.name }}
                    </td>
                    <td class="item-name">
                        <Autocomplete
                            :value="row.item.name"
                            :itemsList="$store.getters.itemsNameList"
                            :width="'100%'"
                            @update="updateItem(i, $event)"
                            :disabled="row.bought"
                        />
                    </td>
                    <td class="coins">
                        {{ commaSeperatedNumber(row.item.price) }}
                    </td>
                    <td class="exchangable">
                        {{ row.item.storageUsage }}
                    </td>
                    <td class="per-character">
                        {{ row.item.worldShare ? 'X' : 'O' }}
                    </td>
                    <td class="qty">
                        {{ displayQty(row.item) }}
                    </td>
                    <td class="character">
                        <Autocomplete
                            v-if="showCharacterInput(row.item)"
                            :value="row.character"
                            :itemsList="$store.state.characterData.columns[0].map(x => [x])"
                            :disabled="row.bought"
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
                            :disabled="row.bought"
                            type="number"
                            min="0"
                            max="999"
                        />
                    </td>
                    <td class="coins">
                        {{ commaSeperatedNumber(row.sum) }}
                    </td>
                    <td
                        v-show="edit && !row.bought"
                        class="btn table-danger"
                        @click="removeRow(i, -1)"
                    >
                        X
                    </td>
                </tr>
                <tr v-if="edit">
                    <td
                        colspan="9"
                        class="text-center"
                        style="cursor: pointer;"
                        @click="addRow(rows.length - 1, -1)"
                    >
                        <span class="w-100 btn btn-sm btn-outline-dark">추가</span>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="text-center bg-light" v-for="(coin, i) in $store.state.coins" :key="i">
                    <td colspan="8">{{ coin.name }}</td>
                    <td>
                        {{ commaSeperatedNumber(totalSum(i)) }}
                    </td>
                </tr>
            </tfoot>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import Autocomplete from '@/components/Autocomplete.vue';
import {
    addCartItem,
    removeCartItem,
    toggleBuyState,
    updateBuyingQty,
    updateCartCharacter,
    updateCartItem,
    updateCharacterCurrentCoins,
} from '@/store/mutationTypes';
import useTableController from '@/composables/useTableController';
import useItemCartRows from '@/composables/useItemCartRows';
import useUtilities from '@/composables/useUtilities';
import Item from '@/lib/Item';
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
        const { tbody, addRow, removeRow, updateCellValue } = useTableController();

        const rows = useItemCartRows();

        const { commaSeperatedNumber } = useUtilities();

        return {
            headers: itemCartTableHeader,
            rows,
            tbody,
            addRow: (row: number, col = 1) => addRow(addCartItem, row, col),
            removeRow: (row: number, col: number = 1) => removeRow(removeCartItem, row, col),
            commaSeperatedNumber,

            updateCharacter: (row: number, value: string) =>
                updateCellValue(updateCartCharacter, row, value),
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
        updateBuyingQty(row: number, value: number) {
            value = Math.min(this.itemsLeft(this.rows[row].item, row), value);
            this.$store.commit(updateBuyingQty, { row, value });
            this.$forceUpdate();
        },
        displayQty(item: Item) {
            return item.qtyDesc ? item.qtyDesc : item.qty >= 0 ? item.qty : '\u221e';
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
        totalSum(coin: number) {
            return this.rows.filter(r => r.item.coin === coin).reduce((a, r) => a + r.sum, 0);
        },
        toggleBuy(row: number) {
            const buy = !this.rows[row].bought;
            this.$store.commit(toggleBuyState, row);

            if (this.rows[row].character) {
                const characterRow = this.$store.state.characterData.table.findIndex(
                    ([nickname, _]) => nickname === this.rows[row].character,
                );
                this.$store.commit(updateCharacterCurrentCoins, {
                    row: characterRow,
                    value:
                        Number(this.$store.state.characterData.table[characterRow][1]) +
                        this.rows[row].sum * (buy ? -1 : 1),
                });
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    overflow: auto;
    min-height: 80vh;
    max-height: 80vh;
}

.item-cart-row {
    user-select: none;

    &:hover {
        cursor: pointer;
    }
}

.coin-name {
    min-width: 8ch;
    width: fit-content;
}

.item-name {
    min-width: 16ch;
}

.exchangable,
.per-character {
    min-width: 4ch;
    text-align: center;
}
</style>
