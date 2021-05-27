<template>
    <div class="wrapper">
        <table class="table table-sm table-striped">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody ref="rows">
                <tr
                    v-for="i in rows.length"
                    :key="i"
                    @keydown.ctrl.enter="addRow($event, i - 1)"
                    @keydown.ctrl.delete.prevent="removeRow($event, i - 1)"
                >
                    <td class="coin-name">
                        {{ coinName(rows[i - 1].item.coin) }}
                    </td>
                    <td class="item-name">
                        <Autocomplete
                            :value="rows[i - 1].item.name"
                            :itemsList="$store.getters.itemsNameList"
                            :width="'100%'"
                            @update="updateItem($event, i - 1)"
                        />
                    </td>
                    <td class="price">
                        {{ commaSeperatedNumber(rows[i - 1].item.price) }}
                    </td>
                    <td class="exchangable">
                        {{ rows[i - 1].item.exchange }}
                    </td>
                    <td class="per-character">
                        {{ rows[i - 1].item.perCharacter ? 'O' : 'X' }}
                    </td>
                    <td class="qty">
                        {{ rows[i - 1].item.qty }}
                    </td>
                    <td class="character">
                        <Autocomplete
                            :value="rows[i - 1].character"
                            :itemsList="$store.state.characterData.columns[0]"
                            :width="'12ch'"
                            @update="updateCharacter($event, i - 1)"
                        />
                    </td>
                    <td class="buying-qty">
                        <input
                            :value="rows[i - 1].buyingQty"
                            @input="updateBuyingQty($event.target.value, i - 1)"
                            type="number"
                            min="0"
                            max="999"
                        />
                    </td>
                    <td class="sum">
                        {{ commaSeperatedNumber(rows[i - 1].item.price * rows[i - 1].buyingQty) }}
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
import Autocomplete from '@/components/Autocomplete.vue';
import {
    addCartItem,
    removeCartItem,
    updateBuyingQty,
    updateCartCharacter,
    updateCartItem,
} from '@/store/mutationTypes';
import Item from '@/Item';

export default defineComponent({
    name: 'Items Cart Table',
    components: { Autocomplete },
    data() {
        return {
            headers: [
                '코인',
                '아이템',
                '가격',
                '창고\n이동',
                '캐릭별\n구매',
                '수량',
                '구매 캐릭터',
                '구매\n수량',
                '계',
            ],
        };
    },
    computed: {
        rows() {
            return this.$store.state.itemCartData.table.map(elem => {
                const item: Item = this.$store.state.itemsList.find(item => item.name === elem[0]);
                return {
                    item: item || Item.createEmptyItem(),
                    character: elem[1] as string,
                    buyingQty: elem[2] as number,
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
        addRow(e: Event, row: number) {
            this.$store.commit(addCartItem, row);
            this.$nextTick(() => this.setFocus(row + 1));
        },
        removeRow(e: Event, row: number) {
            if (row !== 0) {
                this.$store.commit(removeCartItem, row);
                this.setFocus(row - 1);
            }
        },
        setFocus(row: number) {
            const rows = (this.$refs.rows as Element).children;
            const newRow = rows[row].children[1].firstElementChild
                ?.firstElementChild as HTMLElement;
            newRow.focus();
        },
        coinName(coinID: number) {
            if (coinID >= 0) return this.$store.state.coinNames[coinID];
            else return '';
        },
        commaSeperatedNumber(num: number) {
            return num.toString().replaceAll(/\B(?=(\d{3})+$)/g, ',');
        },
        totalSum(coin: number) {
            return this.rows
                .filter(r => r.item.coin === coin)
                .reduce((a, r) => a + r.item.price * r.buyingQty, 0);
        },
    },
});
</script>

<style lang="scss" scoped>
.wrapper {
    overflow-x: auto;
    overflow-y: visible;
}

th {
    text-align: center;
    white-space: pre-wrap;
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
