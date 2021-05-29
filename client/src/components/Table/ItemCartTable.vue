<template>
    <div class="wrapper">
        <table class="table table-sm table-striped">
            <TableHeader
                :headers="[
                    '코인',
                    '아이템',
                    '가격',
                    '창고\n이동',
                    '캐릭별\n구매',
                    '수량',
                    '구매 캐릭터',
                    '구매\n수량',
                    '계',
                ]"
            />
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
                            :width="'100%'"
                            @update="updateItem($event, i)"
                        />
                    </td>
                    <td class="price">
                        {{ commaSeperatedNumber(row.item.price) }}
                    </td>
                    <td class="exchangable">
                        {{ row.item.exchange }}
                    </td>
                    <td class="per-character">
                        {{ row.item.perCharacter ? 'O' : 'X' }}
                    </td>
                    <td class="qty">
                        {{ row.item.qty }}
                    </td>
                    <td class="character">
                        <Autocomplete
                            :value="row.character"
                            :itemsList="$store.state.characterData.columns[0]"
                            :width="'12ch'"
                            @update="updateCharacter($event, i)"
                        />
                    </td>
                    <td class="buying-qty">
                        <input
                            :value="row.buyingQty"
                            @input="updateBuyingQty($event.target.value, i)"
                            type="number"
                            min="0"
                            max="999"
                        />
                    </td>
                    <td class="sum">
                        {{ commaSeperatedNumber(row.sum) }}
                    </td>
                </tr>
                <tr class="text-center" v-for="(coinName, i) in $store.state.coinNames" :key="i">
                    <td colspan="8">{{ coinName }}</td>
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
import Item from '@/Item';

export default defineComponent({
    name: 'Items Cart Table',
    components: { TableHeader, Autocomplete },
    setup() {
        const { tbody, addRow, removeRow } = useTableRowController();

        return {
            tbody,
            addRow: (row: number) => addRow(addCartItem, row, 1),
            removeRow: (row: number) => removeRow(removeCartItem, row, 1),
        };
    },
    computed: {
        rows() {
            return this.$store.state.itemCartData.table.map(row => {
                const item = this.$store.getters.getItemByName(row[0]);
                return {
                    item: item || Item.createEmptyItem(row[0] as string),
                    character: row[1] as string,
                    buyingQty: row[2] as number,
                    sum: item ? (row[2] as number) * item.price : 0,
                };
            });
        },
    },
    methods: {
        updateItem(item: string, row: number) {
            this.$store.commit(updateCartItem, { row, item });
            this.$nextTick(() => {
                this.$store.commit(updateBuyingQty, {
                    row,
                    qty: this.itemsLeft(this.rows[row].item, row),
                });
            });
        },
        updateCharacter(nickname: string, row: number) {
            this.$store.commit(updateCartCharacter, { row, nickname });
        },
        updateBuyingQty(qty: number, row: number) {
            qty = Math.min(this.itemsLeft(this.rows[row].item, row), qty);
            this.$store.commit(updateBuyingQty, { row, qty });
            this.$forceUpdate();
        },
        itemsLeft(item: Item, exclusiveRow: number) {
            if (item.perCharacter) return item.qty;
            else {
                const sum = this.rows
                    .filter((r, i) => r.item.name === item.name && exclusiveRow !== i)
                    .reduce((a, r) => a + r.buyingQty, 0);
                return item.qty - sum;
            }
        },
        coinName(coinID: number) {
            if (coinID >= 0) return this.$store.state.coinNames[coinID];
            else return '';
        },
        commaSeperatedNumber(num: number) {
            return num.toString().replaceAll(/\B(?=(\d{3})+$)/g, ',');
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
    min-width: 10ch;
}

.item-name {
    min-width: 16ch;
}

.exchangable,
.qty,
.price {
    min-width: 6ch;
    text-align: center;
}

.per-character {
    min-width: 7ch;
    text-align: center;
}

.buying-qty {
    min-width: 6ch;

    & input {
        width: 100%;
    }
}

.sum {
    min-width: 8ch;
    text-align: center;
}
</style>
