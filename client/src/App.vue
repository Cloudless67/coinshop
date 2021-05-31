<template>
    <div class="navbar justify-content-center">
        <h3><b>18주년 블루밍 포레스트 코인샵</b></h3>
    </div>
    <div class="back">
        <div class="container">
            <Main />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DateTime } from 'luxon';
import Main from '@/components/Main.vue';
import { setEventPeriod } from './store/mutationTypes';

export default defineComponent({
    name: 'App',
    components: { Main },
    data() {
        return {
            eventStart: DateTime.fromISO('2021-04-22'),
            eventEnd: DateTime.fromISO('2021-06-16'),
        };
    },
    created() {
        this.$store.commit(setEventPeriod, {
            eventStart: this.eventStart,
            eventEnd: this.eventEnd,
        });
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
