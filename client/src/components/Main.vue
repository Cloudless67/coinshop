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
    methods: {
        save() {
            localStorage.setItem('punchking', this.$store.state.punchKingScore.toString());
            localStorage.setItem('neocore', this.$store.state.neoCoreQty.toString());
            localStorage.setItem('coin-bonus', this.$store.state.coinBonus.toString());
            localStorage.setItem(
                'characters',
                JSON.stringify(this.$store.state.characterData.table),
            );
            localStorage.setItem('items', JSON.stringify(this.$store.state.itemCartData.table));
        },
    },
});
</script>

<style lang="scss" scoped>
.btn-edit {
    position: absolute;
    left: 1rem;
    z-index: 20;
}
</style>
