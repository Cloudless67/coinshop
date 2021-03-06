import { Store, useStore } from 'vuex';
import { key } from '@/store';
import { State } from 'vue';
import { setCoinsData, setEventName, setEventPeriod, setItemsData } from '@/store/mutationTypes';
import Coin from '@/lib/Coin';
import Item from '@/lib/Item';
import EventData from 'raw-loader!@/assets/EventData.csv';
import ItemsData from 'raw-loader!@/assets/ItemsData.csv';
import CoinsData from 'raw-loader!@/assets/CoinsData.csv';
import dayjs from 'dayjs';

export default function useLoadEventData() {
    const parseCSV = (csv: string) =>
        csv
            .substr(15)
            .replaceAll(/[";]/g, '')
            .split('\\r\\n');

    return () => {
        const store = useStore(key);

        loadEventData(store);

        loadCoinsData(store);

        loadItemsData(store);
    };

    function loadItemsData(store: Store<State>) {
        const items: Item[] = parseCSV(ItemsData).map(line => {
            const [name, alias, coin, price, qty, qtyDesc, worldShare, storageUsage] = line.split(
                ',',
            );
            return new Item(
                name,
                Number(coin),
                Number(price),
                Number(qty),
                worldShare === 'TRUE',
                storageUsage,
                qtyDesc,
                alias,
            );
        });
        store.commit(setItemsData, items);
    }

    function loadCoinsData(store: Store<State>) {
        const coins: Coin[] = parseCSV(CoinsData).map(line => {
            const [id, name, worldScope] = line.split(',');
            return new Coin(Number(id), name, worldScope === 'TRUE');
        });
        store.commit(setCoinsData, coins);
    }

    function loadEventData(store: Store<State>) {
        const [name, dateTimes] = parseCSV(EventData);
        const [startDate, endDate] = dateTimes.split(',');
        store.commit(setEventName, name);
        store.commit(setEventPeriod, {
            eventStart: dayjs(startDate).startOf('date'),
            eventEnd: dayjs(endDate).startOf('date'),
        });
    }
}
