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
                    4주마다 최대 +3500개
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <div class="row">
                        <div v-for="i in 3" :key="i" class="col">
                            <label class="d-inline-block" :for="`coin-bonus-${i}`"
                                >{{ i }} 차</label
                            >
                            <div class="d-inline-block w-75 ps-2">
                                <NumberInput
                                    :id="`coin-bonus-${i}`"
                                    :modelValue="$store.state.coinBonus[i - 1]"
                                    @update:modelValue="setCoinBonus(i - 1, $event)"
                                    :min="0"
                                    :max="3500"
                                    :disabled="month < i"
                                />
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NumberInput from '@/components/NumberInput.vue';
import {
    updateNeoCoreGain,
    updatePunchKingScore,
    updateCoinBonus,
    updateCharacterCurrentCoins,
    setCharacterData,
} from '@/store/mutationTypes';
import useUtilities from '@/composables/useUtilities';
import month from '@/lib/month';
import useTableController from '@/composables/useTableController';

export default defineComponent({
    name: 'Input Table',
    components: { NumberInput },
    setup() {
        const { commaSeperatedNumber } = useUtilities();
        const { updateCellValue } = useTableController();

        return {
            commaSeperatedNumber,
            updateMainCharacterCoin: (value: string) =>
                updateCellValue(updateCharacterCurrentCoins, 0, value),
        };
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
        month,
    },
    methods: {
        setCoinBonus(index: number, value: number) {
            const delta = value - this.$store.state.coinBonus[index];
            this.$store.commit(updateCoinBonus, { index, value });
            this.updateMainCharacterCoin(
                (Number(this.$store.state.characterData.table[0][1]) + delta).toString(),
            );
        },
    },
});
</script>
