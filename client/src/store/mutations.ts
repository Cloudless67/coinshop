import { EventDuration } from '@/types';
import { State } from 'vue';
import * as mutations from './mutationTypes';

export default {
    [mutations.setEventPeriod](state: State, { eventStart, eventEnd }: EventDuration) {
        state.eventStart = eventStart;
        state.eventEnd = eventEnd;
    },

    [mutations.updatePunchKingScore](state: State, score: number) {
        state.punchKingScore = score;
    },

    [mutations.updateUnion](state: State, value: number) {
        state.union = value;
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
        state.itemCartData.table[row][2] = qty;
    },

    [mutations.addCartItem](state: State, row: number) {
        state.itemCartData.addRow(row, ['', '', 0]);
    },

    [mutations.removeCartItem](state: State, row: number) {
        state.itemCartData.removeRow(row);
    },
};
