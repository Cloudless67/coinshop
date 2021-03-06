import Coin from '@/lib/Coin';
import Item from '@/lib/Item';
import calculateCoinsToCollect from '@/lib/coinsToCollect';
import dayjs, { Dayjs } from 'dayjs';
import { State } from 'vue';
import * as mutations from './mutationTypes';

export default {
    [mutations.setEventName](state: State, name: string) {
        state.eventName = name;
    },

    [mutations.setEventPeriod](
        state: State,
        { eventStart, eventEnd }: { eventStart: Dayjs; eventEnd: Dayjs },
    ) {
        state.eventStart = eventStart;
        state.eventEnd = eventEnd;
    },

    [mutations.setItemsData](state: State, data: Item[]) {
        state.itemsList = data;
    },

    [mutations.setCoinsData](state: State, data: Coin[]) {
        state.coins = data;
    },

    [mutations.updatePunchKingScore](state: State, value: number) {
        state.punchKingScore = value;
    },

    [mutations.updateNeoCoreGain](state: State, value: number) {
        state.neoCoreQty = value;
    },

    [mutations.updateCoinBonus](state: State, { index, value }: { index: number; value: number }) {
        state.coinBonus[index] = value;
    },

    [mutations.setCharacterData](state: State, table: (string | number)[][]) {
        state.characterData.table = table;
    },

    [mutations.updateCharacterNickname](
        state: State,
        { row, value }: { row: number; value: string },
    ) {
        state.characterData.table[row][0] = value;
    },

    [mutations.updateCharacterCurrentCoins](
        state: State,
        { row, value }: { row: number; value: number },
    ) {
        state.characterData.table[row][1] = Number(value);
    },

    [mutations.updateCharacterCoinsToCollect](
        state: State,
        { row, value }: { row: number; value: number },
    ) {
        state.characterData.table[row][2] = Number(value);
        state.characterData.table[row][3] = 'true';
    },

    [mutations.addCharacterRow](state: State, row: number) {
        state.characterData.addRow(row, [
            '',
            0,
            calculateCoinsToCollect(
                state.today,
                state.eventStart,
                state.eventEnd,
                state.coinBonus,
                row === 0,
            ),
        ]);
    },

    [mutations.removeCharacterRow](state: State, row: number) {
        state.characterData.removeRow(row);
    },

    [mutations.setCartData](state: State, table: (string | number)[][]) {
        state.itemCartData.table = table;
    },

    [mutations.updateCartItem](state: State, { row, value }: { row: number; value: string }) {
        state.itemCartData.table[row][0] = value;
    },

    [mutations.updateCartCharacter](state: State, { row, value }: { row: number; value: string }) {
        state.itemCartData.table[row][1] = value;
    },

    [mutations.updateBuyingQty](state: State, { row, value }: { row: number; value: number }) {
        state.itemCartData.table[row][2] = value < Infinity ? value : 0;
    },

    [mutations.toggleBuyState](state: State, row: number) {
        state.itemCartData.table[row][3] = (state.itemCartData.table[row][3] as number) ^ 1;
    },

    [mutations.addCartItem](state: State, row: number) {
        state.itemCartData.addRow(row, ['', '', 0]);
    },

    [mutations.removeCartItem](state: State, row: number) {
        state.itemCartData.removeRow(row);
    },
};
