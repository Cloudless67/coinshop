<template>
    <div>
        <div class="navbar justify-content-center">
            <h3>
                <b>{{ eventName }} 코인샵</b>
            </h3>
        </div>
        <div class="back">
            <div class="container position-relative">
                <Main />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DateTime } from 'luxon';
import Main from '@/components/Main.vue';
import { setCoinsData, setEventPeriod, setItemsData } from './store/mutationTypes';
import Item from './Item';
import Coin from './Coin';

export default defineComponent({
    name: 'App',
    components: { Main },
    data() {
        return { eventName: '' };
    },
    async created() {
        const eventInfo = await fetch('/api').then(res => res.json());
        this.eventName = eventInfo.name;
        this.$store.commit(setEventPeriod, {
            eventStart: DateTime.fromISO(eventInfo.startDate),
            eventEnd: DateTime.fromISO(eventInfo.endDate),
        });

        const coins: Coin[] = await fetch('/api/coins').then(res => res.json());
        this.$store.commit(setCoinsData, coins);

        const items: Item[] = await fetch('/api/items').then(res => res.json());
        this.$store.commit(setItemsData, items);
    },
});
</script>

<style lang="scss">
@import './scss/style.scss';
body {
    position: relative;
    width: 100%;
    background-image: url('/back.jpg');
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: -10;
}

.container {
    background: rgb(255, 255, 255, 0.95);
    border-radius: 1rem;
    padding: 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.3);
}

.front {
    position: fixed;
    background-image: url('/front.png');
    width: 100%;
    height: 50vh;
    bottom: 0;
    z-index: -10;
}
</style>
