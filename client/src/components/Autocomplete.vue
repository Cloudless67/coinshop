<template>
    <div>
        <input
            type="text"
            :value="value"
            :style="{ width }"
            :disabled="disabled"
            @keydown.down="handleDown"
            @keydown.up="handleUp"
            @keydown.enter.exact="handleEnter"
            @input="updateInput($event.target.value)"
            @focus="updateInput($event.target.value)"
            @blur="active = false"
            @keydown.esc="active = false"
        />
        <ul v-show="active" class="list-group shadow" ref="list">
            <li
                class="list-group-item"
                v-for="(cand, i) in candidates"
                :key="i"
                :class="{ active: i === focus }"
                @mousedown.prevent="select(cand)"
                @mouseover="focus = i"
                @mouseleave="focus = -1"
            >
                {{ cand }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'Autocomplete Input',
    emits: ['update'],
    props: {
        value: {
            type: String,
            required: true,
        },
        itemsList: {
            type: Array as PropType<string[]>,
            required: true,
        },
        disabled: { type: Boolean, default: false },
        width: String,
    },
    data() {
        return { active: false, focus: -1 };
    },
    computed: {
        candidates(): string[] {
            return this.itemsList.filter(x => x.includes(this.value));
        },
    },
    methods: {
        updateInput(value: string) {
            this.active = true;
            this.$emit('update', value);
        },
        select(cand: string) {
            this.active = false;
            this.$emit('update', cand);
        },
        handleDown() {
            this.active = true;
            this.focus = Math.min(this.focus + 1, this.candidates.length - 1);
            this.scrollView(false);
        },
        handleUp() {
            this.focus = Math.max(this.focus - 1, -1);
            this.active = this.focus !== -1;
            this.scrollView(true);
        },
        handleEnter() {
            if (this.active && this.focus >= 0) this.select(this.candidates[this.focus]);
        },
        scrollView(up: boolean) {
            if (this.focus >= 0) {
                const list = this.$refs.list as HTMLUListElement;
                list.children[this.focus].scrollIntoView(up);
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.list-group {
    list-style: none;
    position: absolute;
    width: fit-content;
    max-height: 30vh;
    overflow: auto;
    white-space: nowrap;
    z-index: 1;
}

.list-group-item {
    padding-top: 0;
    padding-bottom: 0;

    &:hover {
        cursor: pointer;
    }
}
</style>
