<template>
    <div class="back">
        <div class="container-fluid bg-primary py-2">
            <ul class="list-group list-group-horizontal justify-content-center">
                <span class="list-group-item pe-4"
                    >이벤트 시작일: {{ eventStart.toLocaleString() }}
                </span>
                <span class="list-group-item pe-4"
                    >이벤트 종료일: {{ eventEnd.toLocaleString() }}
                </span>
                <span class="list-group-item pe-4">이벤트 기간: 주 </span>
            </ul>
        </div>
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
    width: 100%;
}

.back {
    height: 100vh;
}
</style>
