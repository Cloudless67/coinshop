import { State } from 'vue';

export default {
    itemsNameList(state: State) {
        return state.itemsList.map(item => [item.name, item.alias]);
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
