<template>
    <div class="row">
        <div class="col-lg-4 m-4">
            <InputTable />
            <CharacterTable />
        </div>
        <div class="col-lg-8"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputTable from './Table/InputTable.vue';
import CharacterTable from './Table/CharacterTable.vue';

export default defineComponent({
    name: 'Main',
    components: { InputTable, CharacterTable },
});
</script>
