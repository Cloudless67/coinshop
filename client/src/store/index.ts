import { InjectionKey, State } from 'vue';
import { createStore, Store } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: state,
    mutations: mutations,
    getters: getters,
});
