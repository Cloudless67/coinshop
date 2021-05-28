<template>
    <div>
        <input
            type="text"
            :value="value"
            :style="{ width }"
            @keydown.down="down"
            @keydown.up="up"
            @keydown.enter="enter"
            @input="updateInput"
            @focus="updateInput"
            @blur="active = false"
        />
        <ul v-show="active" class="list-group shadow" ref="list">
            <li
                class="list-group-item"
                v-for="(cand, i) in candidates"
                :key="cand"
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
    name: 'Autocomplete',
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
        width: String,
    },
    data() {
        return {
            active: false,
            focus: -1,
            candidates: [] as string[],
        };
    },
    methods: {
        updateInput(e: Event) {
            this.active = true;
            const value = (e.target as HTMLInputElement).value;
            this.candidates = this.itemsList.filter(x => x.includes(value));
            this.$emit('update', value);
        },
        select(cand: string) {
            this.active = false;
            this.$emit('update', cand);
        },
        down() {
            if (this.active) {
                this.focus = Math.min(this.focus + 1, this.candidates.length - 1);
                const list = this.$refs.list as HTMLUListElement;
                list.children[this.focus].scrollIntoView(false);
            }
        },
        up() {
            if (this.active) {
                this.focus = Math.max(this.focus - 1, -1);
                if (this.focus >= 0) {
                    const list = this.$refs.list as HTMLUListElement;
                    list.children[this.focus].scrollIntoView();
                }
            }
        },
        enter(e: KeyboardEvent) {
            if (this.active && this.focus >= 0 && !e.ctrlKey) {
                this.select(this.candidates[this.focus]);
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.list-group {
    list-style: none;
    position: absolute;
    width: 30ch;
    max-height: 40vh;
    overflow: hidden scroll;
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
