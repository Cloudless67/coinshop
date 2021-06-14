import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { Dayjs } from 'dayjs';
import Table from '@/lib/Table';
import Coin from '@/lib/Coin';

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        eventName: string;
        eventStart: Dayjs;
        eventEnd: Dayjs;
        coins: Coin[];
        punchKingName: string;
        neoCoreName: string;
        coinBonusName: string;

        itemsList: Item[];

        punchKingScore: number;
        neoCoreQty: number;
        coinBonus: number[];

        autoUpdateCoins: boolean;

        characterData: Table;
        itemCartData: Table;
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
