<template>
    <div class="btn-edit">
        <div
            class="btn btn-sm btn-outline-dark"
            :class="{ 'bg-dark': edit, 'text-light': edit }"
            @click="edit = !edit"
            role="switch"
            :aria-checked="edit"
        >
            수정
        </div>
        <div class="btn btn-sm btn-outline-dark ms-2" @click="save">
            저장
        </div>
        <div class="btn btn-sm btn-outline-dark ms-2" @click="showDailyMission = true">
            일일 미션
        </div>
        <Info :info="basicHelp" />
    </div>
    <div class="row my-2">
        <div class="col-xxl-4 overflow-auto" style="margin-top: 28px">
            <InputTable />
            <CharacterTable :edit="edit" />
            <div class="form-check">
                <input
                    class="form-check-input"
                    id="flexCheckChecked"
                    type="checkbox"
                    v-model="autoUpdate"
                />
                <label class="form-check-label" for="flexCheckChecked">
                    자동 업데이트
                </label>
                <Info :info="autoUpdateInfo" />
            </div>
        </div>
        <div class="col-xxl-8">
            <ItemCartTable :edit="edit" />
        </div>
        <DailyMissions :show="showDailyMission" @close="showDailyMission = false" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import InputTable from './Table/InputTable.vue';
import CharacterTable from './Table/CharacterTable.vue';
import ItemCartTable from './Table/ItemCartTable.vue';
import Info from './Info.vue';
import DailyMissions from './DailyMissions.vue';
import useLocalStorage from '@/composables/useLocalStorage';
import { basicHelp, autoUpdateInfo } from '@/constants';

export default defineComponent({
    name: 'Main',
    components: { InputTable, CharacterTable, ItemCartTable, Info, DailyMissions },
    setup() {
        const { save } = useLocalStorage();

        const autoUpdate = computed({
            get: () => localStorage.getItem('autoupdate') === 'true',
            set: value => {
                localStorage.setItem('autoupdate', value.toString());
                if (value) save();
            },
        });

        return {
            autoUpdate,
            save,
            edit: ref(false),
            basicHelp,
            autoUpdateInfo,
            showDailyMission: ref(false),
        };
    },
});
</script>

<style lang="scss" scoped>
.btn-edit {
    position: absolute;
    left: 1rem;
    z-index: 1;
}
</style>
