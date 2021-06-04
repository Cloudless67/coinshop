import { useStore } from 'vuex';
import { key } from '@/store';
import { Ref } from 'vue';
import { setCoinsData, setEventPeriod, setItemsData } from '@/store/mutationTypes';
import { DateTime } from 'luxon';
import Coin from '@/Coin';
import Item from '@/Item';

export default function useFetchEventData(eventName: Ref<string>) {
    return async () => {
        const store = useStore(key);

        const eventInfo = await fetch('/api').then(res => res.json());
        eventName.value = eventInfo.name;
        store.commit(setEventPeriod, {
            eventStart: DateTime.fromISO(eventInfo.startDate),
            eventEnd: DateTime.fromISO(eventInfo.endDate),
        });

        const coins: Coin[] = await fetch('/api/coins').then(res => res.json());
        store.commit(setCoinsData, coins);

        const items: Item[] = await fetch('/api/items').then(res => res.json());
        store.commit(setItemsData, items);
    };
}
