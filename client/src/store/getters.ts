import { Interval } from 'luxon';
import { State } from 'vue';

export default {
    eventDuration(state: State) {
        return Interval.fromDateTimes(state.eventStart, state.eventEnd).count(
            'day'
        );
    },

    gardeningCoin(state: State) {
        let character = Math.min(Math.floor((state.union - 500) / 1500) + 1, 6);
        character = Math.max(1, character);
        return character * 24;
    },

    itemsNameList(state: State) {
        return state.itemsList.map((item) => item.name);
    },
};
