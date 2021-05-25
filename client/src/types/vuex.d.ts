import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { DateTime } from 'luxon';
import CharacterTable from '@/table/CharacterTable';

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        eventStart: DateTime;
        eventEnd: DateTime;
        punchKingScore: number;
        union: number;
        characterData: CharacterTable;
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
