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
        <div class="d-xxl-none front"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import Main from '@/components/Main.vue';
import useFetchEventData from '@/composables/useFetchEventData';
import useLocalStorage from '@/composables/useLocalStorage';
import useAutoupdateCoins from '@/composables/useAutoupdateCoins';

export default defineComponent({
    name: 'App',
    components: { Main },
    setup() {
        const eventName = ref('');

        onBeforeMount(useFetchEventData(eventName));

        const { save, load } = useLocalStorage();
        load();

        const { autoUpdate } = useAutoupdateCoins();

        return { eventName, autoUpdate, save };
    },
    watch: {
        eventName() {
            if (!this.eventName) return;
            this.autoUpdate();
            if (localStorage.getItem('autoupdate') === 'true') this.save();
        },
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
    position: absolute;
    background-image: url('/front.png');
    width: 100%;
    height: 50vh;
    bottom: 0;
    z-index: -10;
}
</style>
