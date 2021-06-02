import Coin from '@/Coin';
import Item from '@/Item';
import { EventDuration } from '@/types';
import { State } from 'vue';
import * as mutations from './mutationTypes';

export default {
    [mutations.setEventPeriod](state: State, { eventStart, eventEnd }: EventDuration) {
        state.eventStart = eventStart;
        state.eventEnd = eventEnd;
    },

    [mutations.setItemsData](state: State, data: Item[]) {
        state.itemsList = data;
    },

    [mutations.setCoinsData](state: State, data: Coin[]) {
        state.coins = data;
    },

    [mutations.updatePunchKingScore](state: State, score: number) {
        state.punchKingScore = score;
    },

    [mutations.updateNeoCoreGain](state: State, gain: number) {
        state.neoCoreQty = gain;
    },

    [mutations.updateCoinBonus](state: State, value: number) {
        state.coinBonus = value;
    },

    [mutations.setCharacterData](state: State, table: (string | number)[][]) {
        state.characterData.table = table;
    },

    [mutations.updateCharacterNickname](
        state: State,
        { row, nickname }: { row: number; nickname: string },
    ) {
        state.characterData.table[row][0] = nickname;
    },

    [mutations.addCharacterRow](state: State, row: number) {
        state.characterData.addRow(row, ['']);
    },

    [mutations.removeCharacterRow](state: State, row: number) {
        state.characterData.removeRow(row);
    },

    [mutations.setCartData](state: State, table: (string | number)[][]) {
        state.itemCartData.table = table;
    },

    [mutations.updateCartItem](state: State, { row, item }: { row: number; item: string }) {
        state.itemCartData.table[row][0] = item;
    },

    [mutations.updateCartCharacter](
        state: State,
        { row, nickname }: { row: number; nickname: string },
    ) {
        state.itemCartData.table[row][1] = nickname;
    },

    [mutations.updateBuyingQty](state: State, { row, qty }: { row: number; qty: number }) {
        state.itemCartData.table[row][2] = qty < Infinity ? qty : 0;
    },

    [mutations.addCartItem](state: State, row: number) {
        state.itemCartData.addRow(row, ['', '', 0]);
    },

    [mutations.removeCartItem](state: State, row: number) {
        state.itemCartData.removeRow(row);
    },
};
