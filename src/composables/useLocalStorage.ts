import { useStore } from 'vuex';
import { key } from '@/store';
import {
    setCartData,
    setCharacterData,
    updateCoinBonus,
    updateNeoCoreGain,
    updatePunchKingScore,
} from '@/store/mutationTypes';
import dayjs from 'dayjs';

export default function useLocalStorage() {
    const store = useStore(key);
    let fading: number;

    function showMessage() {
        const saved = document.getElementById('saved')!;
        saved.style.display = 'block';

        clearTimeout(fading);
        fading = setTimeout(() => {
            saved.classList.add('fade-out-to');
            setTimeout(() => {
                saved.classList.remove('fade-out-to');
                saved.style.display = 'none';
            }, 1000);
        }, 500);
    }

    const save = () => {
        localStorage.setItem('event', store.state.eventName);
        localStorage.setItem(
            'last-visited',
            dayjs()
                .startOf('date')
                .format('YYYY-MM-DD'),
        );
        localStorage.setItem('punchking', store.state.punchKingScore.toString());
        localStorage.setItem('neocore', store.state.neoCoreQty.toString());
        localStorage.setItem('coin-bonus', JSON.stringify(store.state.coinBonus));
        localStorage.setItem('characters', JSON.stringify(store.state.characterData.table));
        localStorage.setItem('items', JSON.stringify(store.state.itemCartData.table));

        showMessage();
    };

    const load = () => {
        if (localStorage.getItem('event')) {
            if (localStorage.getItem('event') !== store.state.eventName) {
                localStorage.clear();
                return;
            }
        }
        if (localStorage.getItem('punchking'))
            store.commit(updatePunchKingScore, Number(localStorage.getItem('punchking')));
        if (localStorage.getItem('neocore'))
            store.commit(updateNeoCoreGain, Number(localStorage.getItem('neocore')));
        if (localStorage.getItem('coin-bonus'))
            (JSON.parse(localStorage.getItem('coin-bonus')!) as number[]).forEach((value, index) =>
                store.commit(updateCoinBonus, { index, value }),
            );
        if (localStorage.getItem('characters'))
            store.commit(setCharacterData, JSON.parse(localStorage.getItem('characters')!));
        if (localStorage.getItem('items'))
            store.commit(setCartData, JSON.parse(localStorage.getItem('items')!));
    };

    return { save, load };
}
