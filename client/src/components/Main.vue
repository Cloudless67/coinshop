<template>
    <div class="row my-2">
        <div class="col-lg-4" style="margin-top: 28px">
            <InputTable />
            <CharacterTable />
        </div>
        <div class="col-lg-8">
            <ItemCartTable />
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
});
</script>
