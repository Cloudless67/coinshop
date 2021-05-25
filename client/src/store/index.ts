import { createStore } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export default createStore({
    state: state,
    mutations: mutations,
    getters: getters,
});
