import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { DateTime } from 'luxon';
import Table from '@/table/Table';
import Coin from '@/Coin';

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        eventName: string;
        eventStart: DateTime;
        eventEnd: DateTime;
        coins: Coin[];
        punchKingName: string;
        neoCoreName: string;
        coinBonusName: string;

        itemsList: Item[];

        punchKingScore: number;
        neoCoreQty: number;
        coinBonus: number;

        characterData: Table;
        itemCartData: Table;
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
