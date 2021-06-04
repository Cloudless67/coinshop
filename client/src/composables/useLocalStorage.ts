import { useStore } from 'vuex';
import { key } from '@/store';
import { DateTime } from 'luxon';
import {
    setCartData,
    setCharacterData,
    updateCoinBonus,
    updateNeoCoreGain,
    updatePunchKingScore,
} from '@/store/mutationTypes';

export default function useLocalStorage() {
    const store = useStore(key);

    const save = () => {
        localStorage.setItem('last-visited', DateTime.now().toISODate());
        localStorage.setItem('punchking', store.state.punchKingScore.toString());
        localStorage.setItem('neocore', store.state.neoCoreQty.toString());
        localStorage.setItem('coin-bonus', store.state.coinBonus.toString());
        localStorage.setItem('characters', JSON.stringify(store.state.characterData.table));
        localStorage.setItem('items', JSON.stringify(store.state.itemCartData.table));
    };

    const load = () => {
        if (localStorage.getItem('punchking'))
            store.commit(updatePunchKingScore, Number(localStorage.getItem('punchking')));
        if (localStorage.getItem('neocore'))
            store.commit(updateNeoCoreGain, Number(localStorage.getItem('neocore')));
        if (localStorage.getItem('coin-bonus'))
            store.commit(updateCoinBonus, Number(localStorage.getItem('coin-bonus')));
        if (localStorage.getItem('characters'))
            store.commit(setCharacterData, JSON.parse(localStorage.getItem('characters')!));
        if (localStorage.getItem('items'))
            store.commit(setCartData, JSON.parse(localStorage.getItem('items')!));
    };

    return { save, load };
}
