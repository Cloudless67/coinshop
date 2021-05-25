import { EventDuration, RowAndNickname } from '@/types';
import { State } from 'vue';
import * as mutations from './mutationTypes';

export default {
    [mutations.setEventPeriod](
        state: State,
        { eventStart, eventEnd }: EventDuration
    ) {
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
        { row, nickname }: RowAndNickname
    ) {
        state.characterData.table[row][0] = nickname;
    },

    [mutations.addCharacterRow](state: State, row: number) {
        state.characterData.addRow(row);
    },

    [mutations.removeCharacterRow](state: State, row: number) {
        state.characterData.removeRow(row);
    },
};
