<template>
    <div>
        <div class="text-center my-2">
            <h3>
                <b>{{ $store.state.eventName }} 코인샵</b>
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
import { defineComponent, onMounted, ref } from 'vue';
import Main from '@/components/Main.vue';
import useLoadEventData from '@/composables/useLoadEventData';
import useLocalStorage from '@/composables/useLocalStorage';
import useAutoupdateCoins from '@/composables/useAutoupdateCoins';
import dayjs from 'dayjs';

export default defineComponent({
    name: 'App',
    components: { Main },
    setup() {
        const { save, load } = useLocalStorage();
        const { autoUpdate } = useAutoupdateCoins();

        useLoadEventData()();
        load();

        onMounted(() => {
            if (localStorage.getItem('autoupdate') === 'true') {
                autoUpdate();
                const tomorrow = dayjs()
                    .startOf('date')
                    .add(1, 'day');

                setTimeout(() => {
                    console.log('day changed!');
                    autoUpdate();
                    save();
                }, tomorrow.diff(dayjs()));

                save();
            }
        });
    },
});
</script>

<style lang="scss">
@import './scss/style.scss';
body {
    position: relative;
    width: 100%;
    background-image: url('assets/back.webp');
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
</style>
