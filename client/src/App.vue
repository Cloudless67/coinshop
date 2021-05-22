<template>
    <div>
        <div class="container-fluid bg-primary py-2">
            <ul class="list-group list-group-horizontal justify-content-center">
                <span class="list-group-item pe-4"
                    >이벤트 시작일: {{ eventStart.toLocaleString() }}
                </span>
                <span class="list-group-item pe-4"
                    >이벤트 종료일: {{ eventEnd.toLocaleString() }}
                </span>
                <span class="list-group-item pe-4"
                    >이벤트 기간: {{ eventPeriod }} 주
                </span>
            </ul>
        </div>
        <div>
            <Main />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DateTime, Interval } from 'luxon';
import Main from '@/components/Main.vue';

export default defineComponent({
    name: 'App',
    components: { Main },
    data() {
        return {
            eventStart: DateTime.fromISO('2021-04-22'),
            eventEnd: DateTime.fromISO('2021-06-16'),
        };
    },
    computed: {
        eventPeriod(): number {
            return (
                Interval.fromDateTimes(this.eventStart, this.eventEnd).count(
                    'day'
                ) / 7
            );
        },
    },
});
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap.scss';

body {
    width: 100%;
}
</style>
