<template>
    <Modal v-if="show" :height="'750px'" @close="$emit('close')">
        <header>분홍콩: {{ sum }}</header>
        <ul class="list-unstyled">
            <li class="mb-1" v-for="([mission, reward, flipped], i) in missions" :key="i">
                <FlipCard :flipped="flipped" @click="missions[i][2] = !flipped">
                    <template v-slot:front>
                        <div class="row bg-primary rounded text-white flip-card-front">
                            <div class="col-9">{{ mission }}</div>
                            <div class="col-3">{{ reward }}</div>
                        </div>
                    </template>
                    <template v-slot:back>
                        <div class="row bg-success rounded text-white flip-card-back">
                            <div class="col-9">{{ mission }}</div>
                            <div class="col-3">{{ reward }}</div>
                        </div>
                    </template>
                </FlipCard>
            </li>
        </ul>
    </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Modal from './Modal.vue';
import FlipCard from './FlipCard.vue';

export default defineComponent({
    name: 'Daily Missions',
    components: { Modal, FlipCard },
    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['close'],
    setup() {
        const missions = ref<[string, number, boolean][]>([
            ['레벨 범위 본스터 1000마리 처치', 50, false],
            ['레벨 범위 본스터 2000마리 처치', 50, false],
            ['엘리트 몬스터/챔피언 3마리 처치', 50, false],
            ['룬 2회 방동', 50, false],
            ['폴로&프리토 1회 클리어', 50, false],
            ['엘리트 보스 1회 처치', 50, false],
            ['불꽃 늑대 클리어 1회', 50, false],
            ['돌발 미션 클리어 1회', 50, false],
            ['일일보스 3마리 처치', 50, false],
            ['소멸의 여로 일일 퀘스트 모두 완료', 20, false],
            ['에르다 스펙트럼 완료', 20, false],
            ['츄츄 아일랜드 일일 퀘스트 모두 완료', 20, false],
            ['배고픈 무토 완료', 20, false],
            ['레헬른 일일 퀘스트 모두 완료', 20, false],
            ['드림 브레이커 완료', 20, false],
            ['아르카나 일일 퀘스트 모두 완료', 20, false],
            ['스피릿 세이비어 완료', 20, false],
            ['모라스 일일 퀘스트 모두 완료', 20, false],
            ['에스페라 일일 퀘스트 모두 완료', 20, false],
            ['전르니움 일일 퀘스트 모두 완료', 20, false],
            ['후르니움 일일 퀘스트 모두 완료', 20, false],
            ['아르크스 일일 퀘스트 모두 완료', 20, false],
            ['ON AIR <리액션 타임> 3회 참여', 50, false],
            ['메이플 E-Sports 300점 달성', 100, false],
            ['메이플 버라이어티 2회 클리어', 100, false],
        ]);
        return {
            missions,
            sum: computed(() =>
                missions.value.filter(mission => mission[2]).reduce((a, m) => a + m[1], 0),
            ),
        };
    },
});
</script>

<style lang="scss" scoped>
.list-unstyled {
    cursor: pointer;
}
</style>
