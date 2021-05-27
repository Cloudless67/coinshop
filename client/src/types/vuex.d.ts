import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { DateTime } from 'luxon';
import Table from '@/table/Table';

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        eventName: string;
        eventStart: DateTime;
        eventEnd: DateTime;
        coinNames: string[];
        punchKingName: string;

        itemsList: Item[];

        punchKingScore: number;
        union: number;
        characterData: Table;
        itemCartData: Table;
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
