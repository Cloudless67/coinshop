<template>
    <h6 class="fw-bold">요약</h6>
    <table class="table table-sm table-bordered table-striped">
        <tbody>
            <tr>
                <td>
                    이벤트 기간
                </td>
                <td colspan="2">
                    {{ $store.state.eventStart.toLocaleString() }} ~
                    {{ $store.state.eventEnd.toLocaleString() }}
                </td>
            </tr>
            <tr>
                <td>{{ $store.state.punchKingName }}</td>
                <td>
                    <input class="w-75" type="number" v-model="punchKingScore" min="0" max="1500" />
                    점
                </td>
                <td>총 {{ commaSeperatedNumber($store.state.punchKingScore * 8) }}점</td>
            </tr>
            <tr>
                <td>{{ $store.state.neoCoreName }}</td>
                <td>
                    <input class="w-75" type="number" v-model="neoCoreQty" min="0" max="400" /> 개
                </td>
                <td>총 {{ commaSeperatedNumber($store.state.neoCoreQty * 7) }}개</td>
            </tr>
            <tr>
                <td>{{ $store.state.coinBonusName }}</td>
                <td colspan="2">
                    <input class="w-75" type="number" v-model="coinBonus" min="0" max="10000" /> 개
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import useUtilities from '@/composables/useUtilities';
import { updateNeoCoreGain, updatePunchKingScore, updateCoinBonus } from '@/store/mutationTypes';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Input Table',
    setup() {
        return useUtilities();
    },
    computed: {
        punchKingScore: {
            get() {
                return this.$store.state.punchKingScore;
            },
            set(value: number) {
                value = Math.max(Math.min(1500, value), 0);
                this.$store.commit(updatePunchKingScore, value);
                this.$forceUpdate();
            },
        },
        neoCoreQty: {
            get() {
                return this.$store.state.neoCoreQty;
            },
            set(value: number) {
                value = Math.max(Math.min(400, value), 0);
                this.$store.commit(updateNeoCoreGain, value);
                this.$forceUpdate();
            },
        },
        coinBonus: {
            get() {
                return this.$store.state.coinBonus;
            },
            set(value: number) {
                this.$store.commit(updateCoinBonus, value);
            },
        },
    },
});
</script>
