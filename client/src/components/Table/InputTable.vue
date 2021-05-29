<template>
    <h6 class="fw-bold">요약</h6>
    <table class="table table-sm table-bordered table-striped">
        <tbody>
            <tr>
                <td>
                    이벤트 기간
                </td>
                <td>
                    {{ $store.state.eventStart.toLocaleString() }}
                </td>
                <td>
                    {{ $store.state.eventEnd.toLocaleString() }}
                </td>
            </tr>
            <tr>
                <td>
                    펀치킹 점수
                </td>
                <td>
                    <input type="number" v-model="punchKingScore" min="0" max="1500" />
                </td>
                <td>총 {{ $store.state.punchKingScore * 8 }}점</td>
            </tr>
            <tr>
                <td>
                    유니온
                </td>
                <td>
                    <input class="border-end" type="number" v-model="union" min="0" max="10000" />
                </td>
                <td>{{ $store.getters.gardeningCoin }} 코인 / 일</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { updatePunchKingScore, updateUnion } from '@/store/mutationTypes';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Input Table',
    computed: {
        punchKingScore: {
            get() {
                return this.$store.state.punchKingScore;
            },
            set(value: number) {
                if (value >= 0) this.$store.commit(updatePunchKingScore, value);
            },
        },
        union: {
            get() {
                return this.$store.state.union;
            },
            set(value: number) {
                this.$store.commit(updateUnion, value);
            },
        },
    },
});
</script>

<style lang="scss" scoped>
input {
    width: 100%;
}
</style>
