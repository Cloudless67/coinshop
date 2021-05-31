<template>
    <div
        class="btn btn-sm btn-outline-dark btn-edit"
        :class="{ 'bg-dark': edit, 'text-light': edit }"
        @click="edit = !edit"
        role="switch"
        :aria-checked="edit"
    >
        수정
    </div>
    <div class="row my-2">
        <div class="col-xl-4" style="margin-top: 28px">
            <InputTable />
            <CharacterTable :edit="edit" />
        </div>
        <div class="col-xl-8">
            <ItemCartTable :edit="edit" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputTable from './Table/InputTable.vue';
import CharacterTable from './Table/CharacterTable.vue';
import ItemCartTable from './Table/ItemCartTable.vue';

export default defineComponent({
    name: 'Main',
    components: { InputTable, CharacterTable, ItemCartTable },
    data() {
        return { edit: false };
    },
});
</script>

<style lang="scss" scoped>
.btn-edit {
    position: absolute;
    right: 1rem;
    z-index: 20;
}
</style>
