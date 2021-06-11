<template>
    <h6 class="fw-bold">요약</h6>
    <table class="table table-sm table-bordered table-striped">
        <tbody>
            <tr>
                <td>
                    이벤트 기간
                </td>
                <td colspan="2">
                    {{ $store.state.eventStart.format('YYYY년 MM월 DD일') }} -
                    {{ $store.state.eventEnd.format('YYYY년 MM월 DD일') }}
                </td>
            </tr>
            <!-- <tr>
                <td>{{ $store.state.punchKingName }}</td>
                <td class="coins">
                    <NumberInput v-model="punchKingScore" :min="0" :max="1500" />
                </td>
                <td>총 {{ commaSeperatedNumber($store.state.punchKingScore * 8) }}점</td>
            </tr> -->
            <tr>
                <td>{{ $store.state.neoCoreName }}</td>
                <td class="coins">
                    <NumberInput v-model="neoCoreQty" :min="0" :max="400" />
                </td>
                <td>총 {{ commaSeperatedNumber($store.state.neoCoreQty * 11) }}개</td>
            </tr>
            <tr>
                <td>월간 미션 보상</td>
                <td colspan="2">
                    4주마다 +3500개
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NumberInput from '@/components/NumberInput.vue';
import { updateNeoCoreGain, updatePunchKingScore, updateCoinBonus } from '@/store/mutationTypes';
import useUtilities from '@/composables/useUtilities';

export default defineComponent({
    name: 'Input Table',
    components: { NumberInput },
    setup() {
        return useUtilities();
    },
    computed: {
        punchKingScore: {
            get() {
                return this.$store.state.punchKingScore;
            },
            set(value: number) {
                this.$store.commit(updatePunchKingScore, value);
            },
        },
        neoCoreQty: {
            get() {
                return this.$store.state.neoCoreQty;
            },
            set(value: number) {
                this.$store.commit(updateNeoCoreGain, value);
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
