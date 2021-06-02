import { Interval } from 'luxon';
import { State } from 'vue';

export default {
    eventDuration(state: State) {
        return Interval.fromDateTimes(state.eventStart, state.eventEnd).count('day');
    },

    itemsNameList(state: State) {
        return state.itemsList.map(item => item.name);
    },

    getItemByName(state: State) {
        return (name: string) => {
            return state.itemsList.find(item => item.name === name);
        };
    },

    getCoinByID(state: State) {
        return (id: number) => {
            return state.coins.find(coin => coin.id === id);
        };
    },
};
